import AdminJS from 'adminjs';
import express from 'express';
import session from 'express-session';
import AdminJSExpress from '@adminjs/express';
import { Adapter, Database, Resource } from '@adminjs/sql';
import Knex from 'knex';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'wassim@mercan.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '5ty6%TY^5ty6';
const PORT = parseInt(process.env.PORT || '3091', 10);
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres123@38.97.60.181:5433/postgres';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'super-secret-session-key-change-in-production-min32chars';

// Form fields available for webhook mapping
const FORM_FIELDS = [
  'full_name', 'email', 'programs', 'program', 'phone',
  'nationality', 'country_of_residence', 'investment_timeline',
  'questions', 'newsletter_consent', 'source',
];

AdminJS.registerAdapter({ Database, Resource });

// Auth middleware for JSON API routes
function requireAuthJSON(req: any, res: any, next: any) {
  if (!req.session?.adminUser) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// Auth middleware for HTML page routes
function requireAuthPage(req: any, res: any, next: any) {
  if (!req.session?.adminUser) return res.redirect('/admin/login');
  next();
}

async function start() {
  const db = await new Adapter('postgresql', {
    connectionString: DATABASE_URL,
    database: 'postgres',
  }).init();

  const knex = Knex({
    client: 'pg',
    connection: DATABASE_URL,
  });

  // Auto-migrate: ensure field_mappings column exists on tpg_webhooks
  try {
    const hasCol = await knex.schema.hasColumn('tpg_webhooks', 'field_mappings');
    if (!hasCol) {
      await knex.schema.alterTable('tpg_webhooks', (table) => {
        table.jsonb('field_mappings').defaultTo('{}');
      });
      console.log('Added field_mappings column to tpg_webhooks');
    }
  } catch (err) {
    console.warn('tpg_webhooks migration skipped (table may not exist):', (err as Error).message);
  }

  const admin = new AdminJS({
    resources: [
      {
        resource: db.table('tpg_leads'),
        options: {
          id: 'Leads',
          navigation: { name: 'Lead Management', icon: 'User' },
          listProperties: [
            'full_name',
            'email',
            'program',
            'phone',
            'nationality',
            'newsletter_consent',
            'created_at',
          ],
          filterProperties: [
            'program',
            'email',
            'full_name',
            'nationality',
            'country_of_residence',
            'newsletter_consent',
            'created_at',
          ],
          showProperties: [
            'id',
            'full_name',
            'email',
            'program',
            'phone',
            'nationality',
            'country_of_residence',
            'investment_timeline',
            'questions',
            'newsletter_consent',
            'source',
            'created_at',
          ],
          editProperties: [
            'full_name',
            'email',
            'program',
            'phone',
            'nationality',
            'country_of_residence',
            'investment_timeline',
            'questions',
            'newsletter_consent',
          ],
          sort: { sortBy: 'created_at', direction: 'desc' as const },
          properties: {
            id: {
              isTitle: false,
              label: 'ID',
              isVisible: { list: false, show: true, edit: false, filter: false },
            },
            full_name: {
              isTitle: true,
              label: 'Full Name',
            },
            email: {
              label: 'Email',
            },
            program: {
              label: 'Program',
              availableValues: [
                { value: 'portugal', label: 'Portugal 🇵🇹' },
                { value: 'greece', label: 'Greece 🇬🇷' },
                { value: 'panama', label: 'Panama 🇵🇦' },
              ],
            },
            phone: {
              label: 'Phone',
            },
            nationality: {
              label: 'Nationality',
            },
            country_of_residence: {
              label: 'Country of Residence',
            },
            investment_timeline: {
              label: 'Investment Timeline',
              availableValues: [
                { value: 'immediately', label: 'Immediately' },
                { value: '1-3 months', label: '1-3 Months' },
                { value: '3-6 months', label: '3-6 Months' },
                { value: '6-12 months', label: '6-12 Months' },
                { value: '12+ months', label: '12+ Months' },
              ],
            },
            questions: {
              label: 'Questions / Comments',
              type: 'textarea',
            },
            newsletter_consent: {
              label: 'Newsletter Opt-in',
            },
            source: {
              label: 'Source',
              isVisible: { list: false, show: true, edit: false, filter: true },
            },
            created_at: {
              label: 'Submitted At',
              isVisible: { list: true, show: true, edit: false, filter: true },
            },
          },
          actions: {
            new: { isAccessible: false },
            bulkDelete: { isAccessible: true },
            delete: { isAccessible: true },
            edit: {
              isAccessible: true,
              before: async (request: any) => {
                // Prevent editing created_at, source, id
                if (request.payload) {
                  delete request.payload.created_at;
                  delete request.payload.source;
                  delete request.payload.id;
                }
                return request;
              },
            },
            export: {
              actionType: 'resource',
              label: 'Export to CSV',
              icon: 'Download',
              isVisible: true,
              handler: async (request: any, response: any, context: any) => {
                const { resource, currentAdmin } = context;
                const records = await resource.find({}, { limit: 10000, sort: { sortBy: 'created_at', direction: 'desc' } });

                const headers = ['Full Name', 'Email', 'Program', 'Phone', 'Nationality', 'Country of Residence', 'Investment Timeline', 'Questions', 'Newsletter', 'Source', 'Submitted At'];
                const fields = ['full_name', 'email', 'program', 'phone', 'nationality', 'country_of_residence', 'investment_timeline', 'questions', 'newsletter_consent', 'source', 'created_at'];

                const csvRows = [headers.join(',')];
                for (const record of records) {
                  const params = record.params || record;
                  const row = fields.map((f: string) => {
                    const val = params[f];
                    if (val === null || val === undefined) return '';
                    const str = String(val);
                    return str.includes(',') || str.includes('"') || str.includes('\n')
                      ? `"${str.replace(/"/g, '""')}"` : str;
                  });
                  csvRows.push(row.join(','));
                }

                const csv = csvRows.join('\n');
                return {
                  record: {},
                  notice: {
                    message: `Exported ${records.length} leads`,
                    type: 'success',
                  },
                  redirectUrl: undefined,
                  records: [],
                  // Return CSV as downloadable file
                  file: {
                    data: csv,
                    filename: `tpg-leads-${new Date().toISOString().split('T')[0]}.csv`,
                    contentType: 'text/csv',
                  },
                };
              },
            },
          },
        },
      },
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'The Points Guy x Mercan',
      logo: false,
      favicon: '/admin/frontend/assets/favicon.ico',
    },
    dashboard: {
      handler: async () => {
        // Fetch lead stats from DB
        try {
          const totalResult = await knex('tpg_leads').count('* as count');
          const total = Number(totalResult[0]?.count || 0);

          const programCounts = await knex('tpg_leads')
            .select('program')
            .count('* as count')
            .groupBy('program');

          const newsletterResult = await knex('tpg_leads')
            .where('newsletter_consent', true)
            .count('* as count');
          const newsletterCount = Number(newsletterResult[0]?.count || 0);

          const todayResult = await knex('tpg_leads')
            .where('created_at', '>=', knex.raw("CURRENT_DATE"))
            .count('* as count');
          const todayCount = Number(todayResult[0]?.count || 0);

          const weekResult = await knex('tpg_leads')
            .where('created_at', '>=', knex.raw("CURRENT_DATE - INTERVAL '7 days'"))
            .count('* as count');
          const weekCount = Number(weekResult[0]?.count || 0);

          const recentLeads = await knex('tpg_leads')
            .select('full_name', 'email', 'program', 'created_at')
            .orderBy('created_at', 'desc')
            .limit(10);

          const programs: Record<string, number> = {};
          for (const row of programCounts) {
            programs[String(row.program)] = Number(row.count);
          }

          return {
            total,
            programs,
            newsletterCount,
            todayCount,
            weekCount,
            recentLeads,
          };
        } catch (err) {
          console.error('Dashboard stats error:', err);
          return { total: 0, programs: {}, newsletterCount: 0, todayCount: 0, weekCount: 0, recentLeads: [] };
        }
      },
    },
    locale: {
      language: 'en',
      translations: {
        en: {
          labels: {
            Leads: 'Leads',
            'Lead Management': 'Lead Management',
            navigation: 'Navigation',
          },
          messages: {
            welcomeOnBoard_title: 'Lead Dashboard',
            welcomeOnBoard_subtitle: 'The Points Guy x Mercan — Lead Management',
          },
        },
      },
    },
  });

  const app = express();

  // Shared session store so AdminJS login and custom routes share auth state
  const sessionStore = new session.MemoryStore();

  const sessionMiddleware = session({
    secret: COOKIE_SECRET,
    name: 'tpg-admin-session',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  });

  // ── CSV export endpoint ──
  app.get('/admin/api/export-csv', sessionMiddleware, async (req, res) => {
    if (!(req as any).session?.adminUser) {
      res.status(401).send('Unauthorized');
      return;
    }
    try {
      const leads = await knex('tpg_leads').orderBy('created_at', 'desc');

      const headers = ['Full Name', 'Email', 'Program', 'Phone', 'Nationality', 'Country of Residence', 'Investment Timeline', 'Questions', 'Newsletter', 'Source', 'Submitted At'];
      const fields = ['full_name', 'email', 'program', 'phone', 'nationality', 'country_of_residence', 'investment_timeline', 'questions', 'newsletter_consent', 'source', 'created_at'];

      const csvRows = [headers.join(',')];
      for (const lead of leads) {
        const row = fields.map((f: string) => {
          const val = (lead as any)[f];
          if (val === null || val === undefined) return '';
          const str = String(val);
          return str.includes(',') || str.includes('"') || str.includes('\n')
            ? `"${str.replace(/"/g, '""')}"` : str;
        });
        csvRows.push(row.join(','));
      }

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=tpg-leads-${new Date().toISOString().split('T')[0]}.csv`);
      res.send(csvRows.join('\n'));
    } catch (err) {
      console.error('CSV export error:', err);
      res.status(500).send('Export failed');
    }
  });

  // ── Webhook Config Page ──
  app.get('/admin/webhooks', sessionMiddleware, requireAuthPage, async (req, res) => {
    let webhooks: any[] = [];
    try {
      webhooks = await knex('tpg_webhooks')
        .select('id', 'name', 'url', 'secret', 'event_type', 'active', 'field_mappings')
        .orderBy('name');
    } catch (e) {
      // table may not exist yet
    }
    res.send(buildWebhookPageHTML(webhooks));
  });

  // ── Webhook Config API: Save ──
  app.post('/admin/api/webhook-config', sessionMiddleware, express.json(), requireAuthJSON, async (req, res) => {
    const { id, url, field_mappings, secret, active } = req.body;
    try {
      if (id) {
        const updates: Record<string, any> = {};
        if (url !== undefined) updates.url = url;
        if (field_mappings !== undefined) updates.field_mappings = JSON.stringify(field_mappings);
        if (secret !== undefined) updates.secret = secret;
        if (active !== undefined) updates.active = active;
        await knex('tpg_webhooks').where({ id }).update(updates);
        res.json({ success: true });
      } else {
        res.status(400).json({ error: 'Missing webhook id' });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── Webhook Config API: Test ──
  app.post('/admin/api/webhook-test', sessionMiddleware, express.json(), requireAuthJSON, async (req, res) => {
    const { url, field_mappings } = req.body;
    if (!url) return res.status(400).json({ error: 'No URL provided' });

    const testData: Record<string, any> = {
      id: 'test-' + Date.now(),
      full_name: 'Test Lead',
      email: 'test@example.com',
      programs: ['portugal'],
      program: 'portugal',
      phone: '+1234567890',
      nationality: 'US',
      country_of_residence: 'United States',
      investment_timeline: '3-6 months',
      questions: 'Webhook test from admin panel.',
      newsletter_consent: false,
      source: 'mercan',
    };

    // Apply field mappings
    const mappings = (typeof field_mappings === 'object' && field_mappings) ? field_mappings : {};
    const mapped: Record<string, any> = {};
    for (const [key, val] of Object.entries(testData)) {
      const outKey = (mappings as Record<string, string>)[key] || key;
      mapped[outKey] = val;
    }

    try {
      const start = Date.now();
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapped),
      });
      const elapsed = Date.now() - start;
      const contentType = resp.headers.get('content-type') || '';
      let body: any;
      if (contentType.includes('json')) body = await resp.json();
      else body = await resp.text();

      res.json({ success: resp.ok, status: resp.status, elapsed_ms: elapsed, response: body, payload_sent: mapped });
    } catch (err: any) {
      res.json({ success: false, error: err.message });
    }
  });

  // ── Webhook Config API: Create new webhook ──
  app.post('/admin/api/webhook-create', sessionMiddleware, express.json(), requireAuthJSON, async (req, res) => {
    const { name, url, event_type, secret } = req.body;
    if (!name || !url) return res.status(400).json({ error: 'Name and URL are required' });
    try {
      const [row] = await knex('tpg_webhooks')
        .insert({
          name,
          url,
          event_type: event_type || 'new_lead',
          secret: secret || null,
          active: true,
          field_mappings: '{}',
        })
        .returning('*');
      res.json({ success: true, webhook: row });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── Webhook Config API: Delete ──
  app.delete('/admin/api/webhook-config/:id', sessionMiddleware, requireAuthJSON, async (req, res) => {
    try {
      await knex('tpg_webhooks').where({ id: req.params.id }).delete();
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  const router = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email: string, password: string) => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return { email, title: 'Admin' };
      }
      return null;
    },
    cookiePassword: COOKIE_SECRET,
    cookieName: 'tpg-admin-session',
  }, null, {
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
  });

  app.use(admin.options.rootPath, router);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AdminJS running at http://localhost:${PORT}/admin`);
  });
}

function buildWebhookPageHTML(webhooks: any[]): string {
  const formFieldsJSON = JSON.stringify(FORM_FIELDS);
  const webhooksJSON = JSON.stringify(webhooks.map(w => ({
    ...w,
    field_mappings: w.field_mappings || {},
  })));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webhook Configuration</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f5f7; color: #1a1a2e; }
    .topbar { background: #1a1a2e; color: #fff; padding: 14px 24px; display: flex; align-items: center; gap: 16px; }
    .topbar a { color: #aab; text-decoration: none; font-size: 14px; }
    .topbar a:hover { color: #fff; }
    .topbar h1 { font-size: 18px; font-weight: 600; }
    .container { max-width: 960px; margin: 24px auto; padding: 0 16px; }
    .card { background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .card h2 { font-size: 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .badge { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 500; }
    .badge-active { background: #d4edda; color: #155724; }
    .badge-inactive { background: #f8d7da; color: #721c24; }
    label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 4px; color: #555; }
    input[type="text"], input[type="url"] { width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
    input:focus { outline: none; border-color: #4a6cf7; box-shadow: 0 0 0 2px rgba(74,108,247,0.15); }
    .row { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-end; }
    .row .field { flex: 1; }
    .btn { padding: 8px 16px; border: none; border-radius: 4px; font-size: 13px; font-weight: 500; cursor: pointer; }
    .btn-primary { background: #4a6cf7; color: #fff; }
    .btn-primary:hover { background: #3b5de7; }
    .btn-success { background: #28a745; color: #fff; }
    .btn-success:hover { background: #218838; }
    .btn-danger { background: #dc3545; color: #fff; }
    .btn-danger:hover { background: #c82333; }
    .btn-outline { background: #fff; color: #4a6cf7; border: 1px solid #4a6cf7; }
    .btn-outline:hover { background: #f0f4ff; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .actions { display: flex; gap: 8px; margin-top: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th { text-align: left; font-size: 12px; color: #888; padding: 6px 8px; border-bottom: 2px solid #eee; text-transform: uppercase; letter-spacing: 0.5px; }
    td { padding: 6px 8px; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    td input { width: 100%; padding: 6px 8px; border: 1px solid #e0e0e0; border-radius: 3px; font-size: 13px; }
    td code { background: #f4f5f7; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    .result-panel { margin-top: 16px; padding: 16px; border-radius: 6px; font-size: 13px; display: none; }
    .result-panel.show { display: block; }
    .result-success { background: #d4edda; border: 1px solid #c3e6cb; }
    .result-error { background: #f8d7da; border: 1px solid #f5c6cb; }
    .result-panel pre { margin-top: 8px; white-space: pre-wrap; word-break: break-all; font-size: 12px; background: rgba(0,0,0,0.04); padding: 10px; border-radius: 4px; max-height: 300px; overflow-y: auto; }
    .result-panel .meta { font-weight: 600; margin-bottom: 6px; }
    .empty { text-align: center; padding: 40px; color: #888; }
    .add-section { text-align: center; padding: 16px; }
    .toggle { position: relative; display: inline-block; width: 36px; height: 20px; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .toggle .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #ccc; border-radius: 20px; transition: .2s; }
    .toggle .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: .2s; }
    .toggle input:checked + .slider { background: #28a745; }
    .toggle input:checked + .slider:before { transform: translateX(16px); }
  </style>
</head>
<body>
  <div class="topbar">
    <a href="/admin">&larr; Back to Admin</a>
    <h1>Webhook Configuration</h1>
  </div>
  <div class="container" id="app"></div>

  <script>
    const FORM_FIELDS = ${formFieldsJSON};
    let webhooks = ${webhooksJSON};

    function render() {
      const app = document.getElementById('app');
      if (webhooks.length === 0) {
        app.innerHTML = '<div class="card empty"><p>No webhooks configured.</p></div>' + renderAddSection();
        return;
      }
      app.innerHTML = webhooks.map((wh, i) => renderWebhook(wh, i)).join('') + renderAddSection();
    }

    function renderAddSection() {
      return '<div class="add-section"><button class="btn btn-outline" onclick="showAddForm()">+ Add Webhook</button></div>' +
        '<div id="add-form" style="display:none" class="card">' +
        '<h2>New Webhook</h2>' +
        '<div class="row"><div class="field"><label>Name</label><input type="text" id="new-name" placeholder="e.g. n8n Lead Sync"></div>' +
        '<div class="field"><label>URL</label><input type="url" id="new-url" placeholder="https://..."></div></div>' +
        '<div class="row"><div class="field"><label>Secret (optional)</label><input type="text" id="new-secret" placeholder="optional header secret"></div>' +
        '<div class="field"><label>Event Type</label><input type="text" id="new-event" value="new_lead"></div></div>' +
        '<div class="actions"><button class="btn btn-primary" onclick="createWebhook()">Create</button>' +
        '<button class="btn btn-outline" onclick="hideAddForm()">Cancel</button></div></div>';
    }

    function showAddForm() { document.getElementById('add-form').style.display = 'block'; }
    function hideAddForm() { document.getElementById('add-form').style.display = 'none'; }

    function renderWebhook(wh, idx) {
      const mappings = wh.field_mappings || {};
      const active = wh.active !== false;
      return '<div class="card" id="wh-' + idx + '">' +
        '<h2>' + esc(wh.name) + ' <span class="badge ' + (active ? 'badge-active' : 'badge-inactive') + '">' + (active ? 'Active' : 'Inactive') + '</span>' +
        '<label class="toggle" style="margin-left:auto"><input type="checkbox" ' + (active ? 'checked' : '') + ' onchange="toggleActive(' + idx + ', this.checked)"><span class="slider"></span></label></h2>' +
        '<div class="row"><div class="field"><label>Webhook URL</label><input type="url" id="url-' + idx + '" value="' + esc(wh.url || '') + '"></div></div>' +
        '<div class="row"><div class="field"><label>Secret</label><input type="text" id="secret-' + idx + '" value="' + esc(wh.secret || '') + '" placeholder="X-Webhook-Secret header"></div>' +
        '<div class="field"><label>Event Type</label><input type="text" value="' + esc(wh.event_type || 'new_lead') + '" disabled></div></div>' +
        '<label style="margin-top:12px">Field Mappings</label>' +
        '<table><thead><tr><th>Form Field</th><th>Webhook Field Name</th></tr></thead><tbody>' +
        FORM_FIELDS.map(f =>
          '<tr><td><code>' + f + '</code></td><td><input id="map-' + idx + '-' + f + '" value="' + esc(mappings[f] || f) + '"></td></tr>'
        ).join('') +
        '</tbody></table>' +
        '<div class="actions">' +
        '<button class="btn btn-primary" onclick="saveWebhook(' + idx + ')">Save</button>' +
        '<button class="btn btn-success" onclick="testWebhook(' + idx + ')">Send Test</button>' +
        '<button class="btn btn-danger" onclick="deleteWebhook(' + idx + ')">Delete</button>' +
        '</div>' +
        '<div class="result-panel" id="result-' + idx + '"></div>' +
        '</div>';
    }

    function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML.replace(/"/g, '&quot;'); }

    function getMappings(idx) {
      const m = {};
      FORM_FIELDS.forEach(f => {
        const el = document.getElementById('map-' + idx + '-' + f);
        if (el) m[f] = el.value.trim() || f;
      });
      return m;
    }

    async function saveWebhook(idx) {
      const wh = webhooks[idx];
      const url = document.getElementById('url-' + idx).value.trim();
      const secret = document.getElementById('secret-' + idx).value.trim();
      const field_mappings = getMappings(idx);
      try {
        const resp = await fetch('/admin/api/webhook-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: wh.id, url, secret, field_mappings }),
        });
        const data = await resp.json();
        if (data.success) {
          wh.url = url;
          wh.secret = secret;
          wh.field_mappings = field_mappings;
          showResult(idx, true, 'Saved successfully.');
        } else {
          showResult(idx, false, data.error || 'Save failed');
        }
      } catch (e) { showResult(idx, false, e.message); }
    }

    async function testWebhook(idx) {
      const url = document.getElementById('url-' + idx).value.trim();
      const field_mappings = getMappings(idx);
      if (!url) { showResult(idx, false, 'No URL set.'); return; }
      showResult(idx, true, 'Sending test...');
      try {
        const resp = await fetch('/admin/api/webhook-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, field_mappings }),
        });
        const data = await resp.json();
        const panel = document.getElementById('result-' + idx);
        panel.className = 'result-panel show ' + (data.success ? 'result-success' : 'result-error');
        panel.innerHTML = '<div class="meta">' + (data.success ? 'OK' : 'FAILED') + ' (' + (data.status || 'N/A') + ') &mdash; ' + (data.elapsed_ms || 0) + 'ms</div>' +
          '<pre>' + esc(JSON.stringify(data, null, 2)) + '</pre>';
      } catch (e) { showResult(idx, false, e.message); }
    }

    async function toggleActive(idx, active) {
      const wh = webhooks[idx];
      try {
        await fetch('/admin/api/webhook-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: wh.id, active }),
        });
        wh.active = active;
        render();
      } catch (e) { alert(e.message); }
    }

    async function deleteWebhook(idx) {
      if (!confirm('Delete this webhook?')) return;
      const wh = webhooks[idx];
      try {
        await fetch('/admin/api/webhook-config/' + wh.id, { method: 'DELETE' });
        webhooks.splice(idx, 1);
        render();
      } catch (e) { alert(e.message); }
    }

    async function createWebhook() {
      const name = document.getElementById('new-name').value.trim();
      const url = document.getElementById('new-url').value.trim();
      const secret = document.getElementById('new-secret').value.trim();
      const event_type = document.getElementById('new-event').value.trim();
      if (!name || !url) { alert('Name and URL required'); return; }
      try {
        const resp = await fetch('/admin/api/webhook-create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, url, secret, event_type }),
        });
        const data = await resp.json();
        if (data.success) {
          webhooks.push(data.webhook);
          render();
        } else { alert(data.error || 'Failed'); }
      } catch (e) { alert(e.message); }
    }

    function showResult(idx, ok, msg) {
      const panel = document.getElementById('result-' + idx);
      panel.className = 'result-panel show ' + (ok ? 'result-success' : 'result-error');
      panel.innerHTML = '<div class="meta">' + esc(msg) + '</div>';
    }

    render();
  </script>
</body>
</html>`;
}

start().catch((err) => {
  console.error('Failed to start AdminJS:', err);
  process.exit(1);
});

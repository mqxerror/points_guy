import AdminJS from 'adminjs';
import express from 'express';
import AdminJSExpress from '@adminjs/express';
import { Adapter, Database, Resource } from '@adminjs/sql';
import Knex from 'knex';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'wassim@mercan.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '5ty6%TY^5ty6';
const PORT = parseInt(process.env.PORT || '3091', 10);
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres123@localhost:5433/postgres';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'super-secret-session-key-change-in-production-min32chars';

AdminJS.registerAdapter({ Database, Resource });

async function start() {
  const db = await new Adapter('postgresql', {
    connectionString: DATABASE_URL,
    database: 'postgres',
  }).init();

  const knex = Knex({
    client: 'pg',
    connection: DATABASE_URL,
  });

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
            bulkDelete: { isAccessible: false },
            delete: { isAccessible: false },
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

  // CSV export endpoint
  const app = express();

  app.get('/admin/api/export-csv', async (req, res) => {
    // Check session
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

  const router = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email: string, password: string) => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return { email, title: 'Admin' };
      }
      return null;
    },
    cookiePassword: COOKIE_SECRET,
    cookieName: 'tpg-admin-session',
  });

  app.use(admin.options.rootPath, router);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AdminJS running at http://localhost:${PORT}/admin`);
  });
}

start().catch((err) => {
  console.error('Failed to start AdminJS:', err);
  process.exit(1);
});

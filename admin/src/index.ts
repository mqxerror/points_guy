import AdminJS from 'adminjs';
import express from 'express';
import AdminJSExpress from '@adminjs/express';
import { Adapter, Database, Resource } from '@adminjs/sql';

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
          sort: { sortBy: 'created_at', direction: 'desc' as const },
          properties: {
            id: { isTitle: false },
            full_name: { isTitle: true },
            program: {
              availableValues: [
                { value: 'portugal', label: 'Portugal' },
                { value: 'greece', label: 'Greece' },
                { value: 'panama', label: 'Panama' },
              ],
            },
            questions: { type: 'textarea' },
            created_at: { isVisible: { list: true, show: true, edit: false, filter: true } },
            source: { isVisible: { list: false, show: true, edit: false, filter: true } },
          },
          actions: {
            new: { isAccessible: false },
            bulkDelete: { isAccessible: false },
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

  const app = express();
  app.use(admin.options.rootPath, router);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AdminJS running at http://localhost:${PORT}/admin`);
  });
}

start().catch((err) => {
  console.error('Failed to start AdminJS:', err);
  process.exit(1);
});

---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-01-28'
inputDocuments:
  - prd.md
  - product-brief-Points-Guy-Landing-Page-2026-01-28.md
workflowType: 'architecture'
project_name: 'Points Guy Landing Page'
user_name: 'Wassim'
date: '2026-01-28'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
27 FRs across 5 capability areas:
- Program Showcase (FR1-FR7): 4 public pages with program content, inter-page navigation, mobile-responsive layout
- Lead Capture (FR8-FR17): 2-step form with program auto-fill, validation, confirmation state
- Lead Data Pipeline (FR18-FR21): Supabase storage, n8n webhook, error resilience, source attribution
- Dashboard (FR22-FR25): Supabase auth, lead list, program counts, logout
- Analytics (FR26-FR27): Google Analytics page tracking and source attribution

**Non-Functional Requirements:**
19 NFRs driving architectural decisions:
- Performance: LCP < 2s mobile, page weight < 1MB, form submit < 3s, dashboard load < 2s
- Security: Supabase Auth, RLS policies, HTTPS, honeypot spam prevention, Zod validation
- Scalability: Static generation/caching for traffic spikes, concurrent form submissions
- Accessibility: WCAG 2.1 AA, keyboard navigation, screen reader support
- Integration: Async non-blocking webhook, data persistence independent of webhook, async analytics

**Scale & Complexity:**

- Primary domain: Full-stack web (Next.js + Supabase)
- Complexity level: Low
- Estimated architectural components: ~15 (4 pages, 1 dashboard, 1 form, 1 API route, 1 layout, header, footer, program cards, confirmation, auth wrapper, analytics)

### Technical Constraints & Dependencies

- Next.js 16 with App Router (standalone output for containerized deployment)
- Supabase instance at 38.97.60.181:8000 (shared with existing Mercan projects)
- n8n webhook endpoint (provided by Mercan infrastructure)
- Google Analytics (client-side tracking script)
- Tailwind CSS 4 with PostCSS
- React 19 + TypeScript
- Framer Motion for animations
- React Hook Form + Zod for form handling

### Cross-Cutting Concerns Identified

- **Responsive design**: Every component must be mobile-first (primary traffic from social media)
- **Form state management**: 2-step form with validation, program auto-fill, and multi-page reuse
- **Error handling**: Webhook failures must not affect user experience or data persistence
- **Authentication boundary**: Dashboard pages protected, public pages open
- **Design consistency**: Premium real estate aesthetic with lifestyle-first tone across all pages

## Starter Template & Project Foundation

### Primary Technology Domain

Full-stack web application (Next.js + Supabase) based on project requirements.

### Starter Options Considered

**Option 1: `create-next-app` (Official Next.js CLI)**
- Official, always up-to-date with latest Next.js
- Includes TypeScript, Tailwind CSS, App Router, ESLint out of the box
- Clean starting point, add dependencies as needed
- Matches existing Golden Visa Marketing project approach

**Option 2: Clone from Golden Visa Marketing project**
- Already has Supabase integration, form components, lead schema, admin layout
- Risk: carries over project-specific code and content that needs removal
- Not recommended: faster to start clean and copy specific patterns

**Option 3: T3 Stack / other full-stack starters**
- Overengineered for this project's scope (5 pages, 1 API route)
- Adds unnecessary abstractions (tRPC, Prisma) when Supabase client is sufficient

### Selected Starter: create-next-app

**Rationale:** Lightest starting point that includes all core tooling. Additional dependencies (Framer Motion, React Hook Form, Zod, Supabase client) are added manually to keep the project lean. Matches the approach used in existing Mercan projects.

**Initialization Command:**

```bash
npx create-next-app@latest points-guy-landing --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-npm
```

**Additional Dependencies to Install:**

```bash
npm install framer-motion react-hook-form zod @supabase/supabase-js clsx tailwind-merge lucide-react
```

### Architectural Decisions Provided by Starter

**Language & Runtime:** TypeScript 5, Node.js, React 19

**Styling:** Tailwind CSS 4 with PostCSS, `@/*` import alias

**Build Tooling:** Next.js compiler, Turbopack (dev), standalone output (production)

**Linting:** ESLint with Next.js Core Web Vitals config

**Code Organization:** App Router with `src/` directory, file-based routing

**Development Experience:** Turbopack HMR, TypeScript strict mode, path aliases

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Leads table schema and RLS policies (Supabase)
- API route structure for lead submission
- Authentication approach for dashboard
- Webhook integration pattern (fire-and-forget)

**Important Decisions (Shape Architecture):**
- Component structure and file organization
- Form state management approach
- Environment variable strategy

**Deferred Decisions (Post-MVP):**
- CI/CD pipeline (manual Docker deploy for MVP)
- Monitoring/logging beyond GA + Supabase dashboard
- UTM parameter tracking (Phase 2)
- CSV export from dashboard (Phase 2)

### Data Architecture

**Leads Table Schema:**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PK, default `gen_random_uuid()` |
| `full_name` | text | NOT NULL |
| `email` | text | NOT NULL |
| `program` | text | NOT NULL — `portugal`, `greece`, `panama` |
| `phone` | text | nullable |
| `nationality` | text | nullable |
| `country_of_residence` | text | nullable |
| `investment_timeline` | text | nullable |
| `questions` | text | nullable |
| `newsletter_consent` | boolean | default `false` |
| `source` | text | default `points-guy` |
| `created_at` | timestamptz | default `now()` |

**Spam Prevention:** Hidden honeypot `website` field in the form. If filled by bots, the API rejects silently. Not stored in database.

**Caching Strategy:** Static generation for all public pages (program content is static). Dashboard uses client-side data fetching with `useEffect`. No additional caching layer needed at MVP scale.

### Authentication & Security

**Dashboard Auth:** Supabase email/password authentication. Single user account for The Points Guy, created manually in Supabase dashboard. No signup flow exposed in the app.

**RLS Policies:**
- `leads` table `INSERT`: Open to `anon` role (public form submissions routed through server-side API route)
- `leads` table `SELECT`: Restricted to `authenticated` role (dashboard access only)
- No `UPDATE` or `DELETE` policies — leads are immutable from the application

**API Route Security:** `/api/leads` validates all input with Zod schemas server-side, checks honeypot field, then inserts via Supabase service role key (server-side only, never exposed to client browser).

### API & Communication Patterns

**Single API Route:** `POST /api/leads`
1. Receives form data from client
2. Validates with Zod schema (returns `400` on failure)
3. Checks honeypot field (returns `200` silently if filled — no error to avoid tipping off bots)
4. Inserts into Supabase via service role client (returns `500` on failure)
5. Fires webhook to n8n asynchronously (non-blocking)
6. Returns `201` with success message

**Webhook Pattern:** Fire-and-forget. The API route calls `fetch(n8nWebhookUrl, { method: 'POST', body: JSON.stringify(leadData) })` without awaiting the response. Lead data is already persisted in Supabase before the webhook fires. No retry logic in the app — n8n handles retries on its end.

**Error Handling Standards:**
- `201` — Successful lead creation (regardless of webhook status)
- `400` — Zod validation failure (returns field-level errors)
- `500` — Supabase insert failure
- Client displays user-friendly messages for each case

### Frontend Architecture

**Project Structure:**

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, analytics, metadata)
│   ├── page.tsx                # Main landing page
│   ├── portugal/page.tsx       # Portugal detail page
│   ├── greece/page.tsx         # Greece detail page
│   ├── panama/page.tsx         # Panama detail page
│   ├── dashboard/
│   │   ├── layout.tsx          # Auth wrapper layout
│   │   └── page.tsx            # Dashboard page
│   └── api/leads/route.ts      # Lead submission API
├── components/
│   ├── layout/                 # Header, Footer, Navigation
│   ├── sections/               # Hero, ProgramCards, ProgramDetail, etc.
│   ├── forms/                  # LeadCaptureForm (2-step), FormFields
│   ├── dashboard/              # LeadTable, ProgramCounts
│   └── ui/                     # Button, Card, Input (shared primitives)
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client (anon key)
│   │   └── server.ts           # Server client (service role key)
│   ├── validations.ts          # Zod schemas
│   └── constants.ts            # Program data, form options
└── types/
    └── index.ts                # Lead, Program type definitions
```

**State Management:** No global state library. React Hook Form manages all form state including multi-step progression. Dashboard uses React `useState` + `useEffect` for fetching leads from Supabase client. Props for component communication.

**Animation Strategy:** Framer Motion for page entrance animations, card hover effects, and form step transitions. Subtle and premium — consistent with high-end real estate aesthetic.

**Form Reuse:** Single `LeadCaptureForm` component used on main landing page and all 3 program detail pages. Accepts a `defaultProgram` prop for auto-fill from detail pages, shows program selector dropdown on main page.

### Infrastructure & Deployment

**Deployment:** Docker container using Next.js standalone output mode. Consistent with existing Mercan deployment infrastructure.

**Environment Variables:**

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase instance URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Public anon key for browser client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Service role key for API route inserts |
| `N8N_WEBHOOK_URL` | Server only | n8n webhook endpoint |
| `NEXT_PUBLIC_GA_ID` | Client | Google Analytics measurement ID |

**No CI/CD for MVP** — manual `docker build` and deploy, matching existing Mercan workflow. CI/CD pipeline deferred to Growth phase.

**Monitoring:** Google Analytics for traffic metrics, Supabase dashboard for database monitoring. No additional logging infrastructure at MVP scale.

### Decision Impact Analysis

**Implementation Sequence:**
1. Supabase setup — create `leads` table, configure RLS policies
2. Project scaffold — `create-next-app` + install dependencies
3. Shared infrastructure — Supabase clients, Zod schemas, types, constants
4. API route — `/api/leads` with validation, insert, and webhook
5. UI components — layout, primitives, form component
6. Public pages — landing page, Portugal, Greece, Panama
7. Dashboard — auth wrapper, lead table, program counts
8. Analytics — Google Analytics script integration
9. Deploy — Docker build, environment config, launch

**Cross-Component Dependencies:**
- Zod schemas shared between API route (server validation) and form (client validation)
- TypeScript types shared across API route, dashboard, and form components
- Program constants (`constants.ts`) used by form dropdown, program pages, and landing page cards
- `LeadCaptureForm` component reused across main page and all 3 program detail pages
- Supabase client config shared between dashboard data fetching and server-side API route

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database (Supabase/PostgreSQL):**
- Tables: `snake_case`, plural — `leads`
- Columns: `snake_case` — `full_name`, `created_at`, `country_of_residence`
- No foreign keys at MVP (single table)

**API:**
- Route paths: `kebab-case`, plural — `/api/leads`
- JSON response fields: `camelCase` — matches TypeScript conventions
- Transform at boundary: DB returns `snake_case` → API route maps to `camelCase` for client

**Code (TypeScript/React):**
- Components: `PascalCase` files and exports — `LeadCaptureForm.tsx`, `ProgramCards.tsx`
- Hooks: `camelCase` with `use` prefix — `useLeads.ts`
- Utilities/libs: `camelCase` files — `validations.ts`, `constants.ts`
- Types: `PascalCase` — `Lead`, `Program`, `LeadFormData`
- Variables/functions: `camelCase` — `getLeads()`, `leadData`
- Constants: `UPPER_SNAKE_CASE` for true constants — `PROGRAMS`, `FORM_STEPS`
- CSS: Tailwind utilities only (no custom class naming)

**Pages (Next.js App Router):**
- Directories: `kebab-case` — `portugal/`, `dashboard/`
- Page files: `page.tsx`, `layout.tsx` (Next.js convention)

### Structure Patterns

**Component Organization — By type:**
```
components/
├── layout/          # Header.tsx, Footer.tsx, Navigation.tsx
├── sections/        # Hero.tsx, ProgramCards.tsx, ProgramDetail.tsx
├── forms/           # LeadCaptureForm.tsx, FormStep1.tsx, FormStep2.tsx
├── dashboard/       # LeadTable.tsx, ProgramCounts.tsx, LoginForm.tsx
└── ui/              # Button.tsx, Card.tsx, Input.tsx, Select.tsx
```

**Import Rules:**
- No barrel exports — import directly: `import { Button } from '@/components/ui/Button'`
- Always use `@/*` import alias — never relative paths like `../../lib/`

**Test Placement:** Co-located — `ComponentName.test.tsx` next to the component file

### Format Patterns

**API Response Format:**
```typescript
// Success (201)
{ success: true, data: { id: "uuid", message: "Lead submitted successfully" } }

// Validation Error (400)
{ success: false, error: { message: "Validation failed", fields: { email: "Invalid email" } } }

// Server Error (500)
{ success: false, error: { message: "Something went wrong. Please try again." } }
```

**Date Handling:**
- Storage: PostgreSQL `timestamptz` (UTC)
- API transport: ISO 8601 strings — `"2026-01-28T14:30:00Z"`
- Display: `toLocaleDateString()` for dashboard — no date library needed

**Null Handling:**
- Optional form fields: submit as `null` (not empty string, not `undefined`)
- API response: include null fields as `null` (never as `""`)

### Process Patterns

**Loading States:**
- Form submission: `isSubmitting` boolean from React Hook Form
- Dashboard data: `isLoading` / `error` / `data` pattern with `useState`
- No skeleton screens at MVP — simple spinner or disabled state

**Error Handling:**
- API route: try/catch around Supabase insert, return structured error response
- Client form: error message below form on submission failure, field-level errors inline
- Dashboard: error message if data fetch fails, with retry button
- Never expose internal error details to client — log server-side, return generic message

**Form Validation Timing:**
- Client-side: `onBlur` validation for individual fields (React Hook Form mode: `onBlur`)
- Client-side: full validation on submit
- Server-side: full Zod validation on every API request (never trust client)

**Auth Flow:**
- Dashboard layout checks Supabase session on mount
- No session → render login form inline (no redirect to `/login` page)
- Session exists → render dashboard content
- Logout → clear session, re-render login form

### Enforcement Guidelines

**All AI agents MUST:**
1. Use the naming conventions defined above — no exceptions
2. Place components in the correct `components/` subdirectory by type
3. Use the API response format exactly as defined
4. Transform `snake_case` DB fields to `camelCase` at the API boundary
5. Validate with Zod on both client and server — share schemas from `lib/validations.ts`
6. Never import Supabase service role client in client-side code
7. Use `@/*` import alias exclusively — no relative paths

**Anti-Patterns to Avoid:**
- Creating a `/lib/api.ts` fetch wrapper — use `fetch` directly
- Adding a state management library — React Hook Form + useState is sufficient
- Creating HOCs or render-prop patterns — use simple component composition
- Adding a `/utils/helpers.ts` catch-all file — keep utilities in specific, named files
- Using `any` type — always define proper TypeScript types
- Creating barrel `index.ts` files — import directly from component files

## Project Structure & Boundaries

### Complete Project Directory Structure

```
points-guy-landing/
├── .env.local                          # Local environment variables (gitignored)
├── .env.example                        # Template for required env vars
├── .gitignore
├── Dockerfile                          # Multi-stage build for standalone output
├── next.config.ts                      # Next.js config (standalone output)
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── public/
│   ├── images/
│   │   ├── portugal/                   # Portugal program lifestyle images
│   │   ├── greece/                     # Greece program lifestyle images
│   │   ├── panama/                     # Panama program lifestyle images
│   │   └── hero/                       # Hero section images
│   ├── icons/                          # Favicon, app icons
│   └── fonts/                          # Self-hosted Inter font files (if needed)
└── src/
    ├── app/
    │   ├── globals.css                 # Tailwind directives, custom CSS variables
    │   ├── layout.tsx                  # Root layout: fonts, metadata, GA script, Header/Footer
    │   ├── page.tsx                    # Main landing: Hero, ProgramCards, LeadCaptureForm
    │   ├── portugal/
    │   │   └── page.tsx                # Portugal detail: ProgramDetail, LeadCaptureForm(defaultProgram="portugal")
    │   ├── greece/
    │   │   └── page.tsx                # Greece detail: ProgramDetail, LeadCaptureForm(defaultProgram="greece")
    │   ├── panama/
    │   │   └── page.tsx                # Panama detail: ProgramDetail, LeadCaptureForm(defaultProgram="panama")
    │   ├── dashboard/
    │   │   ├── layout.tsx              # Auth guard: checks Supabase session, renders LoginForm or children
    │   │   └── page.tsx                # Dashboard: ProgramCounts, LeadTable
    │   └── api/
    │       └── leads/
    │           └── route.ts            # POST handler: Zod validate → honeypot check → Supabase insert → n8n webhook
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx              # Navigation bar with logo, program links, mobile menu
    │   │   ├── Footer.tsx              # Footer with links, disclaimer, branding
    │   │   └── MobileMenu.tsx          # Slide-out mobile navigation
    │   ├── sections/
    │   │   ├── Hero.tsx                # Hero banner with headline, subtext, scroll CTA
    │   │   ├── ProgramCards.tsx         # 3 program overview cards with links to detail pages
    │   │   ├── ProgramDetail.tsx        # Reusable detail section: benefits, investment info, lifestyle
    │   │   └── ConfirmationMessage.tsx  # Post-submission success state
    │   ├── forms/
    │   │   ├── LeadCaptureForm.tsx      # 2-step form container (manages step state, submission)
    │   │   ├── FormStep1.tsx            # Step 1: full_name, email, program selector
    │   │   └── FormStep2.tsx            # Step 2: phone, nationality, residence, timeline, questions, newsletter
    │   ├── dashboard/
    │   │   ├── LoginForm.tsx            # Email/password login for dashboard
    │   │   ├── LeadTable.tsx            # Sortable lead list with columns
    │   │   └── ProgramCounts.tsx        # Summary cards: total leads + per-program counts
    │   └── ui/
    │       ├── Button.tsx               # Shared button with variants (primary, secondary, ghost)
    │       ├── Card.tsx                 # Content card wrapper
    │       ├── Input.tsx                # Form input with label, error state, accessibility
    │       ├── Select.tsx               # Dropdown select with label, error state
    │       └── Textarea.tsx             # Multi-line input with label, error state
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts               # createBrowserClient(anonKey) — for dashboard data fetching
    │   │   └── server.ts               # createClient(serviceRoleKey) — for API route inserts only
    │   ├── validations.ts              # Zod schemas: leadStep1Schema, leadStep2Schema, leadFullSchema
    │   └── constants.ts                # PROGRAMS array, NATIONALITIES, TIMELINES, form option lists
    └── types/
        └── index.ts                    # Lead, Program, ApiResponse, LeadFormData types
```

### Architectural Boundaries

**API Boundary:**
- Single entry point: `POST /api/leads` — the only server-side route
- Public pages are statically generated — no server runtime for page rendering
- Dashboard fetches data client-side using Supabase browser client (anon key + RLS)
- API route uses Supabase server client (service role key) — isolated from client code

**Authentication Boundary:**
- `/dashboard/*` — protected by `dashboard/layout.tsx` auth guard
- All other routes — public, no auth required
- No `middleware.ts` needed — auth handled at layout level, not edge

**Component Boundaries:**
- Page components (`page.tsx`) compose section and form components — no direct DB/API calls in pages
- `LeadCaptureForm` owns form state and submission logic — pages only pass `defaultProgram` prop
- Dashboard components receive data as props from `dashboard/page.tsx` — no independent fetching
- UI components are purely presentational — no business logic, no data fetching

**Data Boundaries:**
- `lib/supabase/server.ts` — only imported in `api/leads/route.ts` (server-side)
- `lib/supabase/client.ts` — only imported in `dashboard/page.tsx` (client-side, authenticated)
- `lib/validations.ts` — shared between client form validation and server API validation
- `lib/constants.ts` — shared between form dropdowns and program page content

### Requirements to Structure Mapping

| FR Category | Files |
|-------------|-------|
| Program Showcase (FR1-FR7) | `app/page.tsx`, `app/portugal/page.tsx`, `app/greece/page.tsx`, `app/panama/page.tsx`, `components/sections/*`, `components/layout/*` |
| Lead Capture (FR8-FR17) | `components/forms/*`, `components/sections/ConfirmationMessage.tsx`, `lib/validations.ts` |
| Lead Data Pipeline (FR18-FR21) | `app/api/leads/route.ts`, `lib/supabase/server.ts`, `lib/constants.ts` |
| Dashboard (FR22-FR25) | `app/dashboard/*`, `components/dashboard/*`, `lib/supabase/client.ts` |
| Analytics (FR26-FR27) | `app/layout.tsx` (GA script tag) |

### Data Flow

```
[User fills form] → LeadCaptureForm → fetch POST /api/leads
                                              ↓
                                     Zod validation + honeypot check
                                              ↓
                                     Supabase INSERT (service role)
                                              ↓
                              ┌───────────────┴───────────────┐
                              ↓                               ↓
                     Return 201 to client          Fire-and-forget fetch → n8n webhook → CRM
                              ↓
                     Show ConfirmationMessage
```

```
[Points Guy login] → dashboard/layout.tsx → Supabase Auth check
                                                    ↓
                                           Session? → dashboard/page.tsx
                                                    ↓
                                           Supabase SELECT (anon key + RLS)
                                                    ↓
                                           Render LeadTable + ProgramCounts
```

### External Integrations

| Service | Integration Point | Connection |
|---------|-------------------|------------|
| Supabase DB | `lib/supabase/server.ts` | Service role key, server-side only |
| Supabase Auth | `lib/supabase/client.ts` | Anon key, client-side dashboard |
| n8n Webhook | `api/leads/route.ts` | Fire-and-forget POST, server-side only |
| Google Analytics | `app/layout.tsx` | Client-side `<Script>` tag, async loading |

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:** All technology choices are compatible — Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4 + Framer Motion + React Hook Form + Zod + Supabase JS client. No version conflicts. Standalone output mode supports Docker deployment.

**Pattern Consistency:** Naming conventions (`snake_case` DB → `camelCase` API), component organization (by type), import rules (`@/*` alias), and API response format are all internally consistent with no contradictions.

**Structure Alignment:** Project directory tree maps directly to architectural decisions. Data boundaries (server vs client Supabase clients) are enforced by file location. Auth boundary is handled at dashboard layout level.

### Requirements Coverage Validation

**Functional Requirements — All 27 FRs covered:**

| FR Group | Coverage |
|----------|----------|
| FR1-FR7 (Program Showcase) | 4 page routes + layout + section components |
| FR8-FR17 (Lead Capture) | LeadCaptureForm + FormStep1/2 + validations + ConfirmationMessage |
| FR18-FR21 (Lead Data Pipeline) | API route + Supabase server client + fire-and-forget webhook |
| FR22-FR25 (Dashboard) | Dashboard layout (auth) + LeadTable + ProgramCounts + LoginForm |
| FR26-FR27 (Analytics) | GA script in root layout |

**Non-Functional Requirements — All 19 NFRs addressed:**

| NFR Group | Architectural Support |
|-----------|----------------------|
| NFR1-NFR5 (Performance) | Static generation, standalone output, minimal deps, client-side dashboard |
| NFR6-NFR10 (Security) | Supabase Auth, RLS policies, honeypot, Zod validation, service role isolation |
| NFR11-NFR12 (Scalability) | Static pages for traffic spikes, Supabase concurrent inserts |
| NFR13-NFR16 (Accessibility) | UI components with labels/errors, keyboard nav, contrast noted |
| NFR17-NFR19 (Integration) | Fire-and-forget webhook, data persists before webhook, async GA |

### Implementation Readiness

**Decision Completeness:** All critical decisions documented — database schema, auth approach, API route design, webhook pattern, component structure, deployment strategy.

**Structure Completeness:** ~30 source files defined with purpose annotations. All directories mapped to FR categories.

**Pattern Completeness:** Naming, structure, format, process, and enforcement patterns defined with examples and anti-patterns.

### Gap Analysis

**No critical or important gaps found.**

**Minor (non-blocking, resolved at implementation):**
- Image optimization: handled by Next.js `<Image>` component (default behavior)
- Font loading: Inter from Google Fonts or self-hosted — implementation detail
- WCAG AA specifics: ARIA patterns handled at component level
- `.env.example` content: derived from environment variables table

### Architecture Completeness Checklist

- [x] Project context analyzed (27 FRs, 19 NFRs, constraints, cross-cutting concerns)
- [x] Starter template selected with rationale and init command
- [x] Critical decisions documented (data, auth, API, frontend, infrastructure)
- [x] Implementation patterns defined (naming, structure, format, process)
- [x] Enforcement guidelines and anti-patterns specified
- [x] Complete project directory structure with file annotations
- [x] Architectural boundaries defined (API, auth, component, data)
- [x] Requirements-to-structure mapping complete
- [x] Data flow diagrams documented
- [x] External integration points mapped

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — low complexity project, single database table, single API route, proven patterns from existing Mercan projects, well-defined boundaries.

**Key Strengths:**
- Clean separation between public (static) and protected (client-side) pages
- Single API route keeps server-side logic simple and contained
- Fire-and-forget webhook ensures form UX is never blocked by CRM integration
- Shared Zod schemas prevent client/server validation drift
- Component reuse (LeadCaptureForm across 4 pages) reduces duplication

**Deferred to Growth Phase:**
- CI/CD pipeline
- UTM parameter tracking
- Dashboard charts and date filtering
- CSV export
- Monitoring beyond GA + Supabase dashboard

### Implementation Handoff

**AI agents implementing this project must:**
1. Follow all architectural decisions exactly as documented
2. Use implementation patterns consistently across all components
3. Respect project structure and boundaries
4. Refer to this document for all architectural questions

**First Implementation Step:**
```bash
npx create-next-app@latest points-guy-landing --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-npm
```

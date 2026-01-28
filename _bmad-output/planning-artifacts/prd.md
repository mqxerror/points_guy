---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish]
inputDocuments:
  - product-brief-Points-Guy-Landing-Page-2026-01-28.md
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - Points Guy Landing Page

**Author:** Wassim
**Date:** 2026-01-28

## Executive Summary

The Points Guy Landing Page is a content-driven showcase site converting organic social media traffic from a high-profile influencer partner ("The Points Guy") into qualified leads for Mercan's investment immigration programs across Portugal, Greece, and Panama.

**Product Differentiator:** Unlike Mercan's existing conversion-optimized funnels (mercan-panama, Golden Visa Marketing) built for paid advertising with aggressive CTAs, exit-intent popups, and urgency messaging, this site uses an informational, lifestyle-first tone that preserves audience trust. The Points Guy's millions of followers already trust him - the page catches that warm traffic and presents Mercan's programs without sales pressure.

**Target Users:**
- **Primary:** Affluent global travelers (30-55), high-net-worth, following The Points Guy on social media for travel and investment tips
- **Secondary:** The Points Guy himself, who monitors lead activity via a simple dashboard
- **Downstream:** Mercan sales team, receiving leads via n8n webhook into their CRM

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Supabase (database + auth), React Hook Form + Zod, Google Analytics.

**Project Context:** Greenfield. Low complexity. Proven patterns reused from existing Mercan projects.

## Success Criteria

### User Success
- Visitor understands all three Mercan programs within the first scroll
- Page feels premium, trustworthy, and consistent with a high-end real estate experience
- Form completion feels natural - 2-step flow reduces friction while capturing quality data
- Mobile experience loads fast and feels native (majority of traffic from Instagram/TikTok link-in-bio)
- Visitor never feels "sold to" - tone is informational and lifestyle-first

### Business Success
- Leads from The Points Guy's organic traffic are captured and routed to CRM via n8n
- Lead data is complete and actionable (name, email, phone, nationality, residence, program interest)
- The Points Guy can independently check lead activity via simple dashboard
- Google Analytics provides traffic and source attribution data

### Measurable Outcomes
- Form submissions tracked and reportable by program
- Google Analytics captures traffic sources, sessions, bounce rate
- Supabase stores all leads with timestamps and program attribution
- n8n webhook fires reliably on every submission

## User Journeys

### Journey 1: Omar Discovers Portugal Golden Visa (Primary User - Success Path)

Omar is a 42-year-old tech executive in Dubai. He follows The Points Guy on Instagram for travel and investment tips. One evening, scrolling through stories, he sees a post about European residency through Portugal's Golden Visa.

Curious, he taps the link in bio. The page loads instantly on his phone - clean, premium, no popups. He sees three programs at a glance: Portugal, Greece, Panama. He taps Portugal.

The detail page shows him what Mercan is building - luxury hospitality properties, a regulated fund, buyback guarantee after 6 years. It feels like reading a magazine feature, not being pitched. At the bottom, a simple prompt: "Want to learn more? Let's talk."

He fills in his name and email (Step 1), then adds his phone, selects "UAE" for residence, "Indian" for nationality, picks "3-6 months" for timeline (Step 2). He hits "Get My Free Consultation." A confirmation appears. Two days later, a Mercan advisor calls him.

**Capabilities revealed:** Program detail pages, mobile-optimized layout, 2-step form with program auto-selection, Supabase storage, n8n webhook trigger

### Journey 2: Sarah Browses But Isn't Ready (Primary User - Edge Case)

Sarah, a 38-year-old entrepreneur in Miami, lands on the page from a TikTok link. She browses all three programs but isn't sure which country suits her. She reads through Portugal and Greece but doesn't fill out the form yet.

She bookmarks the page and comes back on her laptop two days later. The page loads just as fast. This time she's on the main landing page and decides to fill the form from there, selecting "Greece" as her program of interest. She leaves the timeline field blank and writes "Can my husband and kids be included?" in the questions field.

**Capabilities revealed:** Main page form with program selector dropdown, optional fields handling, desktop responsive layout, bookmark-friendly URLs, questions textarea for open-ended input

### Journey 3: The Points Guy Checks His Leads (Secondary User - Dashboard)

The Points Guy posted a series of Instagram stories about Panama's Qualified Investor program yesterday. This morning, he logs into the dashboard to see the response. He opens the protected dashboard page, authenticates via Supabase, and sees a clean table of recent submissions.

12 new leads since yesterday - 7 for Panama, 3 for Portugal, 2 for Greece. He can see names, emails, programs, and timestamps. He notes the Panama spike correlates with his stories. He screenshots the stats for his weekly call with Mercan.

**Capabilities revealed:** Protected dashboard with Supabase auth, lead list with timestamps, program filter/counts, simple read-only interface

### Journey 4: Lead Flows to CRM (Backend - Integration Path)

When Omar submits his form, the data hits Supabase and a row is created in the leads table with all his info plus a timestamp. Simultaneously, a webhook fires to n8n with the lead payload. n8n receives it, routes it to Mercan's CRM, tags it with "points-guy" as source and "portugal" as program. The sales team sees a new lead appear in their pipeline, ready for outreach.

If the webhook fails, the lead is still safely stored in Supabase. n8n can retry or the team can manually export from the database.

**Capabilities revealed:** Supabase insert, webhook to n8n, error resilience (data persists even if webhook fails), source attribution tagging

### Journey Requirements Summary

| Capability | Revealed By |
|------------|------------|
| Program detail pages (Portugal, Greece, Panama) | Journey 1, 2 |
| Mobile-first responsive design | Journey 1, 2 |
| 2-step lead capture form | Journey 1, 2 |
| Program auto-fill from detail page | Journey 1 |
| Program selector on main page form | Journey 2 |
| Optional fields (timeline, questions) | Journey 2 |
| Supabase lead storage | Journey 1, 3, 4 |
| n8n webhook integration | Journey 4 |
| Webhook error resilience | Journey 4 |
| Protected dashboard (Supabase auth) | Journey 3 |
| Lead list with counts by program | Journey 3 |
| Google Analytics tracking | Journey 1, 2 |
| Confirmation state after form submit | Journey 1 |

## Technical Architecture

### Rendering & Platform
- Multi-Page Application via Next.js 16 App Router
- Static generation for program detail pages (content rarely changes)
- Client-side interactivity limited to form interactions and dashboard
- Standalone output for containerized deployment

### Browser Support
- Modern browsers only: Chrome, Safari, Firefox, Edge (latest 2 versions)
- Primary target: Mobile Safari (iOS) and Chrome (Android) - social media traffic

### Responsive Design
- Mobile-first approach (primary traffic from Instagram/TikTok)
- Breakpoints: mobile (default), tablet (768px), desktop (1024px+)
- Touch-optimized interactions

### Key Technical Decisions
- Next.js 16 with App Router and standalone output
- Tailwind CSS 4 for styling
- Framer Motion for animations
- Supabase for database and dashboard auth
- React Hook Form + Zod for form validation
- n8n webhook for CRM integration
- Google Analytics for traffic tracking

## Project Scoping & Phased Development

### MVP Strategy

**Approach:** Problem-Solving MVP - deliver the minimum showcase + lead capture that replaces "no destination" with a premium, trust-preserving experience.

**Resource Requirements:** Solo developer with Next.js + Supabase experience. Reuses proven patterns from existing Mercan projects.

### Phase 1: MVP

**Pages:**
1. Main landing page - Hero, 3 program overview cards, lifestyle content, soft CTAs
2. Portugal detail page (`/portugal`) - Program benefits, investment details, lead form
3. Greece detail page (`/greece`) - Program benefits, property details, lead form
4. Panama detail page (`/panama`) - Program benefits, investment options, lead form
5. Protected dashboard - Read-only lead list, counts by program

**Features:**
- 2-step lead capture form (Step 1: name, email, program | Step 2: phone, nationality, residence, timeline, questions, newsletter consent)
- Supabase leads table with all form fields + timestamps
- n8n webhook on each form submission for CRM routing
- Mobile-first responsive design with premium aesthetic
- Google Analytics for traffic and source tracking

### Phase 2: Growth
- UTM parameter tracking for campaign attribution
- Enhanced dashboard with charts and date filtering
- CSV export from dashboard
- Form A/B testing (headline, CTA variants)

### Phase 3: Expansion
- Multi-agent platform (other partners get their own branded pages)
- Automated lead scoring based on nationality/investment timeline
- Additional program pages as Mercan expands offerings
- Performance analytics dashboard with conversion trends

### Risk Mitigation

**Technical:** Low risk - all patterns proven in existing Mercan projects. Same tech stack, same Supabase instance, same deployment infrastructure.

**Market:** Low risk - The Points Guy already has the audience. Use proven 2-step form pattern and test with initial traffic before iterating.

**Resource:** Low risk - small site (5 pages), single developer. If constrained, launch with main page + 1 program page first, add remaining programs incrementally.

## Functional Requirements

### Program Showcase

- FR1: Visitor can view a main landing page with an overview of all three investment programs (Portugal, Greece, Panama)
- FR2: Visitor can navigate from the main landing page to a dedicated detail page for each program
- FR3: Visitor can view Portugal Golden Visa program details including investment benefits, fund information, and lifestyle content
- FR4: Visitor can view Greece Golden Visa program details including property investment benefits and lifestyle content
- FR5: Visitor can view Panama residency program details including investment options and lifestyle content
- FR6: Visitor can navigate between program pages without returning to the main landing page
- FR7: Visitor can view the site on mobile devices with a fully responsive layout optimized for touch interactions

### Lead Capture

- FR8: Visitor can submit a lead capture form from any program detail page
- FR9: Visitor can submit a lead capture form from the main landing page with a program selector
- FR10: Visitor can complete the form in two steps (Step 1: name, email, program; Step 2: phone, nationality, residence, timeline, questions, newsletter consent)
- FR11: Visitor can see the program field auto-filled when accessing the form from a program detail page
- FR12: Visitor can select a program of interest when accessing the form from the main landing page
- FR13: Visitor can optionally provide an investment timeline
- FR14: Visitor can optionally provide specific questions or comments via a textarea
- FR15: Visitor can opt in or out of newsletter communications
- FR16: Visitor can see real-time validation feedback on required form fields
- FR17: Visitor can see a confirmation state after successful form submission

### Lead Data Pipeline

- FR18: System stores all form submissions in a Supabase database with timestamps
- FR19: System fires a webhook to n8n on each successful form submission with the complete lead payload
- FR20: System persists lead data in Supabase even if the n8n webhook fails
- FR21: System includes program attribution and source tagging in each lead record

### Dashboard

- FR22: The Points Guy can authenticate to access a protected dashboard page
- FR23: The Points Guy can view a list of all lead submissions with name, email, program, and timestamp
- FR24: The Points Guy can see summary counts of total leads and leads broken down by program
- FR25: The Points Guy can log out of the dashboard

### Analytics & Tracking

- FR26: System tracks page views, sessions, and traffic sources via Google Analytics
- FR27: System tracks which program pages visitors view before submitting a form

## Non-Functional Requirements

### Performance

- NFR1: All public pages achieve LCP < 2 seconds on mobile 4G networks
- NFR2: All Core Web Vitals metrics score in the "Good" range
- NFR3: Total page weight does not exceed 1MB per page (including assets)
- NFR4: Form submission completes (Supabase insert + webhook fire) within 3 seconds
- NFR5: Dashboard page loads lead data within 2 seconds

### Security

- NFR6: Dashboard access requires authentication via Supabase Auth
- NFR7: Lead data is transmitted over HTTPS only
- NFR8: Supabase Row Level Security policies restrict lead data access to authenticated dashboard users
- NFR9: Form includes honeypot field for bot/spam prevention
- NFR10: API routes validate input with Zod schemas to prevent malformed data

### Scalability

- NFR11: Public pages use static generation or caching to handle traffic spikes from viral social media posts without degradation
- NFR12: Supabase database handles concurrent form submissions without data loss

### Accessibility

- NFR13: Site meets WCAG 2.1 AA compliance
- NFR14: All interactive elements are keyboard navigable
- NFR15: Form fields have associated labels and error messages for screen readers
- NFR16: Color contrast ratios meet AA minimum (4.5:1 for text)

### Integration

- NFR17: n8n webhook fires asynchronously (non-blocking) so form submission succeeds even if webhook is slow
- NFR18: Lead data persists in Supabase regardless of webhook success or failure
- NFR19: Google Analytics loads asynchronously without impacting page performance

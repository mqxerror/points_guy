---
stepsCompleted: [1, 2, 3, 4, 5, 6]
status: complete
inputDocuments:
  - mercan-panama/docs/prd.md
  - mercan-panama/docs/architecture.md
  - mercan-panama/docs/epics.md
  - mercan-panama/docs/ux-design-specification.md
  - mercan-panama/src/config/site.ts
  - mercan-panama/src/pages/HomePage.tsx
  - mercan-panama/src/pages/ContactPage.tsx
  - mercan-panama/src/pages/InvestmentProgramsPage.tsx
  - goldenvisasMercan/docs/prd.md
  - goldenvisasMercan/docs/architecture.md
  - goldenvisasMercan/docs/epics.md
  - goldenvisasMercan/src/app/page.tsx
  - goldenvisasMercan/src/app/portugal/page.tsx
  - goldenvisasMercan/src/app/greece/page.tsx
  - goldenvisasMercan/src/components/sections/LeadCaptureSection.tsx
  - goldenvisasMercan/src/components/sections/SimplifiedLeadForm.tsx
  - goldenvisasMercan/src/app/globals.css
  - mercan.com/portugal-golden-visa-program (web reference)
date: 2026-01-28
author: Wassim
---

# Product Brief: Points Guy Landing Page

## Executive Summary

The Points Guy Landing Page is a content-driven showcase site designed to convert organic social media traffic from a high-profile influencer partner ("The Points Guy") into qualified leads for Mercan's investment immigration programs across Portugal, Greece, and Panama. Unlike Mercan's existing marketing funnels built for paid advertising, this site prioritizes an informational, lifestyle-first tone that complements The Points Guy's organic content strategy and preserves audience trust. The site serves as a dedicated Mercan portfolio page where The Points Guy's millions of followers can explore program benefits, understand what Mercan is building, and express interest through a soft lead capture experience. A Supabase database captures leads and pushes them via webhook to n8n for CRM processing, while a simple dashboard gives The Points Guy visibility into lead activity.

---

## Core Vision

### Problem Statement

Mercan partners with The Points Guy, a social media influencer with millions of followers who organically promotes investment immigration and residency-by-investment programs. Currently, there is no dedicated landing destination tailored for this influencer-driven organic traffic. Existing Mercan sites (mercan-panama, Golden Visa Marketing) are conversion-optimized funnels designed for paid advertising with aggressive CTAs, exit-intent popups, and urgency messaging - a tone that clashes with organic audience expectations and risks eroding the trust The Points Guy has built with his followers.

### Problem Impact

- Warm organic traffic from millions of followers has no optimized destination
- Existing hard-sell pages create friction for trust-based referral traffic
- The Points Guy cannot effectively track his lead generation and conversion performance
- Mercan misses qualified leads because the visitor experience doesn't match the content tone that brought them there
- No unified view across all three Mercan programs (Portugal, Greece, Panama) for a single agent's audience
- No dedicated lead management backend to track, action, and report on influencer-sourced leads separately from other channels

### Why Existing Solutions Fall Short

Mercan's current web properties are purpose-built for different traffic sources:

- **Mercan Panama site**: Full marketing site with interactive building visualizer, program comparison wizards, and aggressive consultation CTAs - built for search and paid traffic
- **Golden Visa Marketing site**: High-conversion funnel with exit-intent popups, mobile sticky CTAs, 2-step lead forms, and urgency messaging ("limited fund capacity") - built for paid ad campaigns
- **mercan.com**: Corporate site with comprehensive program details and lead capture - built for direct/search traffic

None of these are designed for influencer-driven organic social media traffic where the audience already has trust and context from the content creator's posts. Sending warm followers to a hard-sell funnel creates a jarring experience mismatch. Additionally, none provide agent-specific lead management with actions and reporting tailored to an individual partner's pipeline.

### Proposed Solution

A lightweight, fast, showcase-style site exclusively featuring Mercan's three investment immigration programs (Portugal Golden Visa, Greece Golden Visa, Panama Residency). The site will:

- Present programs in an informational, lifestyle-first tone - "here's what we're building, here's the lifestyle, here are the benefits"
- Feature soft CTAs ("Want to learn more? Talk to me") rather than aggressive conversion tactics
- Include a simple lead capture form where visitors select the program they're interested in
- Store leads in a Supabase database and push them via webhook to n8n for CRM processing
- Provide The Points Guy with a simple dashboard to view lead activity and basic metrics
- Serve as the link-in-bio destination for The Points Guy's social media channels
- Maintain a clean, fast, premium design reflecting Mercan's brand quality without the sales pressure

### Key Differentiators

1. **Trust-preserving design**: Built for warm organic traffic, not cold paid traffic - respects the existing relationship between influencer and audience
2. **Unified multi-program showcase**: Single destination covering Portugal, Greece, and Panama - no other Mercan property offers this consolidated view
3. **Agent attribution & lead pipeline**: Supabase database with n8n webhook integration for CRM automation, plus a simple dashboard for The Points Guy to monitor lead activity
4. **Content-first, conversion-second**: Informational tone that complements social media content rather than contradicting it
5. **Lightweight and fast**: Small, focused site optimized for mobile social media traffic (Instagram, TikTok link-in-bio clicks)

---

## Target Users

### Primary Users

**Persona: "Omar" - The Affluent Global Traveler**

- **Profile**: 30-55 years old, high-net-worth individual, frequent international traveler
- **Location**: Primarily US, Middle East, Latin America
- **Income**: High disposable income, actively seeking investment opportunities
- **Context**: Follows The Points Guy on social media for travel tips and investment insights. Already trusts The Points Guy's recommendations. Interested in residency-by-investment as both a lifestyle upgrade and financial diversification strategy
- **Awareness Level**: Varies - some know what a Golden Visa is, others are discovering the concept for the first time through The Points Guy's content. The page needs to both educate newcomers and provide enough detail for informed prospects
- **Device**: Primarily mobile (Instagram/TikTok link-in-bio traffic), with some desktop users
- **Motivation**: Wants a Plan B passport, European/Latin American lifestyle access, tax optimization, or portfolio diversification through real estate and fund investments
- **Current Experience**: Sees The Points Guy's organic posts about residency programs, gets curious, clicks the link - currently lands nowhere purpose-built for this journey
- **Success Moment**: "I understand what Mercan offers, I see which program fits me, and I've submitted my interest without feeling pressured"

### Secondary Users

**Persona: "The Points Guy" - Influencer Partner**

- **Profile**: Social media influencer with millions of followers
- **Role**: Promotes Mercan's programs organically alongside other offerings
- **Needs**: A simple dashboard to view lead submissions and basic metrics (how many leads, which programs are popular)
- **Access Level**: Read-only dashboard with lead counts and basic stats
- **Success Moment**: "I can see how many people signed up through my page and which programs they're interested in"

**Persona: "The Mercan Team" - Internal Operations**

- **Profile**: Mercan's sales and operations team
- **Role**: Receives leads via n8n webhook into their CRM for follow-up
- **Needs**: Clean lead data exported automatically from the Supabase database to n8n, with program interest, contact info, and source attribution
- **Access Level**: No direct access to this site - they work from the CRM
- **Success Moment**: "Leads from The Points Guy arrive in our CRM automatically, tagged and ready for outreach"

### User Journey

**Follower Journey (Omar):**
1. **Discovery**: Sees The Points Guy's Instagram/TikTok post about European residency or Panama investment
2. **Click-through**: Taps link-in-bio, lands on the showcase page
3. **Browse**: Scrolls through programs (Portugal, Greece, Panama), reads benefits and lifestyle content - feels informational, not salesy
4. **Interest**: Finds a program that resonates, wants to learn more
5. **Soft Conversion**: Fills out a simple form selecting the program of interest - "Want to learn more? Talk to me"
6. **Follow-up**: Receives outreach from Mercan team via CRM (call, email, WhatsApp)

**Points Guy Journey:**
1. **Share**: Posts organic content with link to the landing page
2. **Monitor**: Checks simple dashboard for lead activity
3. **Report**: Reviews periodic performance data

**Backend Data Flow:**
1. Lead submits form on the site
2. Data stored in Supabase database
3. Webhook fires to n8n
4. n8n routes lead to Mercan CRM with program tag and attribution
5. Sales team follows up from CRM

---

## Success Metrics

### User Success
- Visitor understands Mercan's three programs within seconds of landing
- Page feels premium and trustworthy - matching the quality of a high-end real estate experience
- Form submission feels natural and low-friction - no pressure, no hard sell
- Mobile experience is fast and smooth (majority of traffic from social media links)

### Business Objectives
- Capture qualified leads from The Points Guy's organic social media traffic
- Leads automatically flow to CRM via Supabase -> n8n webhook pipeline
- The Points Guy can view a simple report of form submissions on a basic dashboard
- Site traffic and behavior tracked via Google Analytics

### Key Performance Indicators

| KPI | Measurement |
|-----|-------------|
| Form submissions | Total leads captured (tracked in Supabase + dashboard) |
| Program interest distribution | Breakdown of leads by Portugal, Greece, Panama |
| Site traffic | Page views, sessions, bounce rate (Google Analytics) |
| Traffic sources | Social media referral tracking (Google Analytics) |
| Page performance | Fast load times, Core Web Vitals (target: <2s LCP) |
| Lead data quality | Complete form submissions with valid contact info |

---

## MVP Scope

### Core Features

**1. Public Showcase Site (Next.js)**
- **Main landing page**: Hero section with The Points Guy branding, overview of all three programs (Portugal, Greece, Panama) with lifestyle imagery, smooth transitions, and soft CTAs leading to detail pages
- **3 program detail pages**: `/portugal`, `/greece`, `/panama` - each with program benefits, investment details, lifestyle content, and a lead capture form
- **Responsive design**: Mobile-first (primary traffic from social media link-in-bio), premium real estate aesthetic
- **Google Analytics**: Traffic, source, and behavior tracking

**2. Lead Capture Form (2-Step)**
Reusing the proven pattern from the Golden Visa project:

Step 1:
- Full Name (required)
- Email (required)
- Program interest (auto-filled based on which page they're on, or selectable on main page)

Step 2:
- Phone Number with country code (required)
- Nationality (required, dropdown)
- Country of Residence (required, dropdown)
- Investment Timeline (optional)
- Any specific questions? (optional, textarea)
- Newsletter consent checkbox

CTA: "Get My Free Consultation" (gold button)
Trust line: "We respond within 24 hours. Your data is secure."

**3. Backend Pipeline**
- Supabase database to store all lead submissions
- Webhook to n8n on each form submission for CRM routing
- Lead data includes: contact info, program interest, nationality, residence, timeline, source attribution

**4. Simple Dashboard**
- Protected page for The Points Guy
- Read-only view of lead submissions (table/list)
- Basic counts: total leads, leads by program
- No lead management actions (CRM handles that)

**5. Tech Stack**
- Next.js 16 (App Router, standalone output)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion (animations)
- Supabase (database + auth for dashboard)
- Google Analytics

### Out of Scope for MVP
- No exit-intent popups, mobile sticky CTAs, or aggressive conversion tactics
- No ActiveCampaign direct integration (n8n handles CRM routing)
- No multi-language support
- No blog or content section
- No investment calculator or comparison wizard
- No full admin dashboard with lead management (CRM handles that)
- No A/B testing infrastructure
- No video or media hosting
- No additional agent/partner pages

### MVP Success Criteria
- Site is live, fast (<2s LCP), and mobile-optimized
- All three program pages render with accurate content
- Form submissions are stored in Supabase and forwarded to n8n
- The Points Guy can log in and view lead submissions on the dashboard
- Google Analytics is tracking traffic and sources

### Future Vision
- Additional partner/agent pages if The Points Guy model proves successful
- Enhanced dashboard with conversion tracking and performance trends
- Additional program pages as Mercan expands offerings

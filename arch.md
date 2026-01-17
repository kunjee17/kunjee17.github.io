# Architecture Document

## Overview

This project consists of two interconnected applications built with Astro in a Turborepo monorepo:

1. **Personal Blog (kunjan.in)** - A static site repositioned as a personal consulting + authority site
2. **Admin Panel** - A dynamic content management system for managing blog content, social media, and AI-powered features

Both applications share Drizzle ORM as the data layer, with the blog reading from it at build time and the admin writing to it.

---

## Project Structure (Monorepo)

The monorepo replaces the default Next.js apps and packages with:

```
blognew/
├── apps/
│   ├── blog/          # Personal Blog (kunjan.in) - Astro static site
│   └── admin/         # Admin Panel - Astro dynamic site
├── packages/
│   ├── services/      # Shared business logic services
│   ├── dtos/          # Data Transfer Objects / Type definitions
│   └── typescript-config/ # TypeScript configurations
└── ...
```

---

## Project 1: Personal Blog (kunjan.in)

### Purpose
Transform from a developer blog/learning journal into a **personal consulting + authority site** that justifies premium consulting rates while preserving a human, sarcastic, playful writing voice.

### Technical Stack
- **Framework**: Astro 5.16.6
- **Styling**: TailwindCSS 4.1.18 + DaisyUI 5.5.14
- **Typography**: @tailwindcss/typography 0.5.19
- **Database**: Drizzle ORM with SQLite/Turso (read at build time)
- **Hosting**: Netlify (static site generation)
- **Analytics**: Google Analytics
- **Fonts**: 
  - @fontsource-variable/figtree
  - @fontsource-variable/fraunces
  - @fontsource/satisfy

### Site Structure

#### 1. Home Page
- **Hero Section**:
  - Strong positioning statement (architect/system builder/consultant)
  - Sub-statement with focus areas:
    - Architecture
    - AI integration (incl. RAG)
    - Full-stack systems
    - LegalTech/Healthcare/complex domains
  - CTAs: "Work with me", "Writing", "Book a session" (Topmate)
- **Sections**:
  - What I do (services, outcome-focused)
  - How I work (process, responsibility, ownership)
  - Selected writing (3-5 curated essays, not latest posts)
  - Short personal blurb (human, not resume)
  - Call to action

#### 2. Services / Work With Me
- Consulting & architecture
- Full-stack delivery
- AI & RAG integration
- System reviews
- Long-term partnerships
- How engagements work
- What problems I'm a good fit for
- What I'm NOT a good fit for
- Pricing philosophy (premium positioning, not exact rates)
- Link to Topmate for paid calls/sessions

#### 3. Writing (formerly "Blog")
- **Principles**:
  - Long-form, opinionated, experience-driven
  - Evergreen content
  - Architecture, trade-offs, decisions, mistakes, scars
  - Humor allowed but clarity first
- **Organization**: By themes, not chronology
  - Architecture
  - AI & RAG Systems
  - Systems That Run in Production
  - Cost, Scale & Reliability
  - LegalTech/Healthcare patterns
  - Tech leadership & decisions
- **Display**: Library of thinking, not a feed
  - No prominent "latest posts"
  - Dates de-emphasized

#### 4. About
- Story: Builder → architect → operator → consultant
- Emphasize: longevity, learning through building, running real systems, caring about consequences
- Avoid: resume dump, buzzwords, hype

#### 5. Contact / Book
- Email contact
- Topmate integration (paid sessions/consulting calls)
- Clear expectations: serious inquiries only, not free consulting, respect time

### Content Strategy
- **Tone & Voice**: Witty, sarcastic, pragmatic, builder-first
- **Positioning** (implicit): Systems that run in production, cost/failure modes/reliability focus, architecture through experience
- **Visual**: Clean, modern, strong typography, generous whitespace, calm colors
- **Images**: Purposeful, illustrative, humorous when appropriate, not stock-y

### Build Process
- Reads from AstroDB at build time
- Generates static pages for all blog posts, pages, and content
- Rebuilds triggered by:
  - Netlify build hook (immediate publish)
  - Scheduled rebuilds via Upstash cron (batched updates)

---

## Project 2: Admin Panel

### Purpose
Content management system for creating, editing, and managing blog content, with AI-powered features and social media integration.

### Technical Stack
- **Framework**: Astro 5.16.6 (dynamic mode)
- **Styling**: TailwindCSS 4.1.18 + DaisyUI 5.5.14
- **Interactivity**: Alpine.js 3.15.3 (via Vite, not Astro Alpine)
- **Persistence**: @alpinejs/persist 3.15.3
- **Database**: AstroDB (write operations)
- **HTTP Client**: ky 1.14.2
- **Utilities**: 
  - date-fns 4.1.0
  - remeda 2.33.1
  - uuid 13.0.0
  - typebox 1.0.73
  - choices.js 11.1.0 (for select components)
- **Icons**: lucide 0.562.0
- **Notifications**: simple-notify 1.0.6
- **Hosting**: Netlify (serverless functions)

### Authentication
- Environment-based password authentication
- Simple session-based auth (single user, no complex user management)
- No rate limiting required (single-person access)

### Core Features

#### 1. Content Management
- **Markdown Editor**: Rich markdown editor for blogs and pages
- **Front Matter**: Hugo-compatible front matter structure for migration compatibility
- **Image Upload**: 
  - Primary: Netlify Blob Storage
  - Fallback: Tigris (S3-compatible)
- **Content Migration**: Upload markdown files to parse and save to database (Hugo migration tool)

#### 2. AI Integration
- **Grammar & Elevation**: 
  - AI service: Claude, Gemini, or Together AI (quality-focused, cost-conscious)
  - Corrects grammar and elevates blog quality
  - Preserves author's tone and voice
  - Integrated in blog editor
- **Social Media Generation**:
  - Weekly API endpoint called by qStash
  - Generates posts for upcoming week based on criteria and blog data
  - Schedules posts for LinkedIn and Twitter
  - Part of Admin app, hosted on Netlify

#### 3. Rebuild Management
- **Hybrid Approach**:
  - **Immediate Publish**: Call Netlify build hook directly (real-time updates)
  - **Scheduled Publish**: Set flag in database, picked up by Upstash cron job (batched updates)
  - User choice: Schedule or push to live immediately
- **Database Flag**: Tracks pending rebuilds for cron-based batching

#### 4. Social Media Tools
- Short link helper (Hugo-compatible inline integration)
- Social media post generator
- Scheduling integration

---

## Shared Infrastructure

### Database: AstroDB
- **Shared** between both projects
- **Blog**: Reads at build time (static generation)
- **Admin**: Writes/updates content
- Schema includes:
  - Blog posts (with Hugo-compatible front matter)
  - Pages
  - Media/assets metadata
  - Rebuild flags

### Image Storage
- **Primary**: Netlify Blob Storage
- **Fallback**: Tigris (S3-compatible)
- Migration path if Netlify doesn't work

### External Services
- **qStash** (Upstash): Weekly cron jobs for social media generation
- **Netlify**: Hosting for both sites + build hooks
- **Google Analytics**: Site analytics
- **Topmate**: Integration for paid consulting sessions

---

## Development Standards

### Code Quality
- **Linting & Formatting**: Biome (already installed)
  - Remove other linting/formatting tools (ESLint, Prettier)
- **Pre-commit Hooks**: Husky
  - Runs Biome lint and format checks
- **Type Safety**:
  - TypeScript strict mode
  - Astro strict type checking (@astrojs/check)
- **Monorepo**: Turborepo for task orchestration

### TypeScript Configuration
- Strict type checking enabled
- Astro strict types enabled
- Shared TypeScript configs in `packages/typescript-config`

### Package Management
- **Package Manager**: pnpm 9.0.0
- **Node Version**: >=18

---

## Migration Strategy

### From Hugo
- **Front Matter**: Maintain similar structure for compatibility
- **Content Migration Tool**: 
  - Upload markdown files in Admin panel
  - Parse front matter and content
  - Save to AstroDB
- **Content Reorganization**:
  - Re-categorize existing blogs
  - Reframe if needed
  - Promote some to "Selected Writing"
  - De-emphasize short/exploratory posts
  - Organize by themes, not chronology

### Monorepo Migration
- Replace default Next.js apps (`docs`, `web`) with Astro apps (`blog`, `admin`)
- Replace default packages with:
  - `packages/services` - Shared business logic
  - `packages/dtos` - Type definitions and DTOs
  - Update ESLint configs to Biome (or remove if not needed)

---

## Technology Stack Summary

### Core Dependencies
```json
{
  "astro": "^5.16.6",
  "typescript": "^5.9.3",
  "@astrojs/check": "^0.9.6",
  "tailwindcss": "^4.1.18",
  "@tailwindcss/vite": "^4.1.18",
  "@tailwindcss/typography": "^0.5.19",
  "daisyui": "^5.5.14"
}
```

### Admin-Specific Dependencies
```json
{
  "alpinejs": "^3.15.3",
  "@alpinejs/persist": "^3.15.3",
  "@types/alpinejs": "^3.13.11",
  "ky": "^1.14.2",
  "date-fns": "^4.1.0",
  "remeda": "^2.33.1",
  "uuid": "^13.0.0",
  "typebox": "^1.0.73",
  "choices.js": "^11.1.0",
  "lucide": "^0.562.0",
  "simple-notify": "^1.0.6"
}
```

### Fonts
```json
{
  "@fontsource-variable/figtree": "^5.2.10",
  "@fontsource-variable/fraunces": "^5.2.9",
  "@fontsource/satisfy": "^5.2.7"
}
```

### Development Tools
```json
{
  "@biomejs/biome": "2.3.11",
  "husky": "^9.0.0",
  "turbo": "^2.7.3"
}
```

### Removed/Not Needed
- ❌ Firebase (no user management)
- ❌ Dexie (client-side DB not needed with AstroDB)
- ❌ dexie-encrypted (not needed)
- ❌ store2 (may be needed for admin page state, evaluate later)
- ❌ ESLint/Prettier (replaced with Biome)

---

## Success Criteria

### Blog Site (kunjan.in)
When someone lands on the site, they should think:
> "This person has built real things, understands trade-offs, has opinions, and would be expensive — but worth it."

### Admin Panel
- Efficient content creation and editing
- Seamless AI-powered grammar and elevation
- Reliable rebuild triggers (immediate or scheduled)
- Smooth social media integration

---

## Notes

- **AI Quality**: Prioritize quality over cost for AI services (Claude, Gemini, or Together AI)
- **Single User**: Admin is designed for single-person use, so security can be simpler
- **Content First**: Site is content-driven, not animation-driven
- **Voice Preservation**: AI helps with grammar/structure only, not voice
- **No Marketing Cringe**: Avoid marketing jargon, hype words, generic phrasing

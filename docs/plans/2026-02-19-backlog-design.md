# Portfolio Backlog Design

**Date:** 2026-02-19
**Author:** Gustavo Ferraz + Claude Code
**Source PRD:** `prd-portfolio.md`

## Structure

Epic-level backlog following the PRD phase roadmap (Approach A: Phase-Mirror). Priorities match the PRD (P0-P2). P3 bonus features excluded — can be added later.

## Dependency Chain

```
Epic 1 (Scaffolding) → Epic 2 (Core Sections) → Epic 3 (Polish) → Epic 4 (SEO) → Epic 5 (i18n)
```

---

## Epic 1: Project Scaffolding — P0

**Goal:** A deployable empty shell on Vercel with the full dev toolchain working.

**Scope:**
- Initialize Next.js 14+ with App Router and TypeScript strict
- Tailwind CSS with design system tokens (colors `#0A0A0F`, `#4361EE`, `#E0E0E0`, typography scale)
- ESLint + Prettier
- Framer Motion and `next-intl` installed (dependencies only, not wired)
- Root layout with Google Fonts (Inter/Geist + JetBrains Mono)
- Vercel project linked with auto-deploy on push
- Git repo initialized with `.gitignore`, `README.md`

**Acceptance Criteria:**
- `npm run dev` serves localhost:3000
- `npm run build` succeeds with zero errors
- `npm run lint` passes
- Push to `main` triggers successful Vercel deployment
- Tailwind design tokens available in config

**Dependencies:** None

---

## Epic 2: Core Sections — P0

**Goal:** All 6 content sections visible on the landing page, project detail pages via MDX. Functional but not yet polished.

**Scope:**
- **Navbar** — Fixed top, section links, hamburger on mobile, scroll-to-top button
- **Hero** — Name, title, avatar, social links (GitHub/LinkedIn/Email), CTA buttons
- **About** — Professional summary, UTFPR degree, tech stack icons, personal interests
- **Projects** — Card grid (thumbnail, title, description, tech tags, demo/repo links) linking to detail pages
- **Project Detail Pages** — MDX pipeline. Each project: full description, challenges, architecture, learnings. Priority: CheerConnect, Accodal, Valor Disparador Boletos, Nexus
- **Skills** — Categorized grid (Frontend, Backend, Database, DevOps, Tools) with tech icons
- **Timeline** — Vertical timeline with milestones
- **Contact** — Form UI (name, email, message) + direct links + location. Submission wired in Epic 3.
- **Footer** — Social links, copyright

**Acceptance Criteria:**
- All sections render correctly on desktop
- Project detail pages load from MDX files in `src/content/projects/`
- Navbar scrolls smoothly to each section
- No TypeScript errors, lint passes
- At least 4 project MDX files created (placeholder content acceptable)

**Dependencies:** Epic 1

---

## Epic 3: Polish & Interactions — P1

**Goal:** Professional feel — animated, themed, responsive, working contact form.

**Scope:**
- **Dark/Light Theme Toggle** — CSS variables + Tailwind `darkMode`, persist in `localStorage`
- **Framer Motion Animations** — Scroll-triggered entry, page transitions, hover effects on project cards, hero entrance animation. All gated on `prefers-reduced-motion`.
- **Responsive Fine-Tuning** — Mobile-first audit. Breakpoints: <768px, 768-1024px, >1024px. Hamburger animation.
- **Contact Form Submission** — Resend (or EmailJS). Honeypot + rate limiting. Success/error feedback.
- **Scroll Behaviors** — Active section indicator in navbar, smooth scroll, scroll-to-top visibility logic
- **Micro-interactions** — Hover effects, button press feedback, link animations

**Acceptance Criteria:**
- Theme toggle works and persists across reloads
- All animations respect `prefers-reduced-motion: reduce`
- Contact form sends email successfully (tested with real delivery)
- Layout correct at 375px, 768px, 1440px
- No layout shift during animations

**Dependencies:** Epic 2

---

## Epic 4: SEO & Performance — P1

**Goal:** Ranks well on Google, loads fast, rich social media previews.

**Scope:**
- **Meta Tags** — Dynamic `<title>`, `<meta description>` per page. Open Graph + Twitter Card tags.
- **OG Images** — Static or dynamic (Next.js `ImageResponse` API)
- **Sitemap & Robots** — Auto-generated `sitemap.xml`, `robots.txt`
- **Structured Data** — JSON-LD for `Person` and `WebSite`. Consider `CreativeWork` for projects.
- **Canonical URLs** — Per page, i18n-ready
- **Performance** — All images via `next/image` (WebP/AVIF), font `display: swap`, bundle analysis, lazy loading below-fold
- **Analytics** — Vercel Analytics or Plausible

**Acceptance Criteria:**
- Lighthouse > 90 in all 4 categories
- FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- OG preview renders on LinkedIn/Twitter
- `sitemap.xml` lists all pages, `robots.txt` valid
- JSON-LD validates (Google Rich Results Test)

**Dependencies:** Epic 3

---

## Epic 5: Internationalization — P2

**Goal:** Full site in PT-BR (default) and English with language toggle.

**Scope:**
- **next-intl Setup** — Middleware for locale detection/routing, `[locale]` segment, default PT-BR
- **Translation Files** — JSON messages for PT-BR and EN: navbar, hero, about, skills, timeline, contact, footer
- **Project Content i18n** — MDX per locale (`content/projects/pt-BR/`, `content/projects/en/`), manually translated
- **Language Toggle** — In navbar, switches locale, persists preference
- **SEO per Locale** — `hreflang` tags, locale-specific meta descriptions, canonical URLs per locale, sitemap for both locales

**Acceptance Criteria:**
- Language toggle switches all visible text (no untranslated strings)
- URL reflects locale (`/en/...` vs default `/...`)
- SEO tags are locale-aware (hreflang, canonical)
- Project detail pages translated in both languages
- Default PT-BR works without locale prefix

**Dependencies:** Epic 4

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Gustavo Ferraz — a modern, performant, responsive showcase of projects, skills, and professional background. Full spec lives in `prd-portfolio.md`.

## Tech Stack

- **Framework:** Next.js 14+ with App Router (SSR/SSG)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (respect `prefers-reduced-motion`)
- **Content:** MDX or Contentlayer for project pages
- **i18n:** `next-intl` — PT-BR default, English secondary
- **Forms:** Resend or EmailJS (no dedicated backend)
- **Deploy:** Vercel with CI/CD and preview deploys

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript compiler check (tsc --noEmit)
```

## Architecture

### Routing (App Router)

```
src/app/
├── layout.tsx           # Root layout (theme provider, fonts, navbar, footer)
├── page.tsx             # Landing — single-page with all core sections
├── [locale]/            # i18n routing (pt-BR, en)
└── projects/[slug]/     # Individual project detail pages
```

### Key Directories

- `src/components/` — Reusable UI components (Hero, About, Projects, Skills, Timeline, Contact)
- `src/content/projects/` — MDX files for project details
- `src/lib/` — Utilities, constants, type definitions
- `src/messages/` or `src/i18n/` — Translation JSON files (pt-BR, en)
- `public/` — Static assets (images, favicons, OG images)

### Design System

- **Dark theme default** with light mode toggle
- **Palette:** background `#0A0A0F`, accent `#4361EE`, text `#E0E0E0`
- **Typography:** Inter/Geist for body, JetBrains Mono for code snippets
- **Mobile-first** breakpoints: mobile (<768px), tablet (768–1024px), desktop (>1024px)

### Core Sections (Priority Order)

1. **Hero** — Name, title, avatar, social links (GitHub/LinkedIn/Email), CTA
2. **About** — Professional summary, UTFPR CS degree, tech stack icons, interests
3. **Projects** — Cards with thumbnail, description, tech tags, demo/repo links; detail pages via MDX
4. **Skills** — Categorized grid: Frontend, Backend, Database, DevOps, Tools
5. **Timeline** — Vertical timeline: academic projects, work, certifications
6. **Contact** — Form (name, email, message) + direct links + location (Ponta Grossa, PR)

### Featured Projects

| Project | Description |
|---------|-------------|
| CheerConnect | Social network for Brazilian cheerleading community (TCC) — React, Node.js, TypeScript |
| Accodal Gustavo | Technical challenge project — TypeScript |
| Valor Disparador Boletos | Bank payment slip management system — TypeScript |
| Nexus | TBD |

## Performance Targets

- Lighthouse > 90 across all categories
- FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- Images: lazy loading, WebP/AVIF, `next/image`

## SEO Requirements

- Meta tags, Open Graph, Twitter Cards on every page
- `sitemap.xml`, `robots.txt`
- JSON-LD structured data (Person, WebSite)

## Conventions

- All animations via Framer Motion — always gate on `prefers-reduced-motion`
- Navbar: fixed top, smooth scroll, active section indicator, hamburger on mobile
- Form security: honeypot field + rate limiting (no CAPTCHA)
- WCAG 2.1 AA: keyboard navigation, 4.5:1 contrast, alt text, aria-labels
- CSP and security headers configured in `next.config`

## Contact Info (for content)

- **GitHub:** [gustaf30](https://github.com/gustaf30)
- **LinkedIn:** [gustavo-p-ferraz](https://www.linkedin.com/in/gustavo-p-ferraz/)
- **Email:** gustavoferraz405@gmail.com
- **Location:** Ponta Grossa, PR — Brazil
- **Domain:** gustavoferraz.dev

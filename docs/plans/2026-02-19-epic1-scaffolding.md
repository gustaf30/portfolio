# Epic 1: Project Scaffolding — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** A deployable Next.js shell on Vercel with the full dev toolchain, design tokens, and fonts configured.

**Architecture:** Single Next.js 15 App Router application with Tailwind CSS v4 for styling (CSS-first `@theme` configuration), Geist Sans + JetBrains Mono fonts via `next/font`, and TypeScript strict mode. The project scaffold uses `src/` directory convention with the `@/*` import alias.

**Tech Stack:** Next.js 15 (App Router, Turbopack), TypeScript, Tailwind CSS v4, ESLint, Prettier

**Design doc:** `docs/plans/2026-02-19-backlog-design.md`

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: All default Next.js files (`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `package.json`, `.gitignore`)

**Step 1: Run create-next-app in the existing directory**

The directory already has `CLAUDE.md`, `docs/`, and `.git/`. These don't conflict with Next.js files.

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --use-npm --turbopack --disable-git
```

If prompted about the non-empty directory, accept and continue. The `--disable-git` flag skips git init since we already have a repo.

**Step 2: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts at `http://localhost:3000`, default Next.js page renders. Stop the server with Ctrl+C.

**Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: Build completes with no errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with TypeScript and Tailwind"
```

---

### Task 2: Configure Design System Tokens

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace globals.css with design system tokens**

The PRD defines: background `#0A0A0F`, accent `#4361EE`, text `#E0E0E0`. We use Tailwind v4's `@theme` directive to define these as design tokens that generate utility classes.

Replace the contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-background: #0A0A0F;
  --color-foreground: #E0E0E0;
  --color-accent: #4361EE;
  --color-accent-light: #6B83F2;
  --color-accent-dark: #2D47C9;
  --color-surface: #12121A;
  --color-surface-light: #1A1A2E;
  --color-surface-lighter: #2A2A3E;
  --color-muted: #8888AA;
  --color-border: #2A2A3E;

  /* Fonts — CSS variables set by next/font in layout.tsx */
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}

/* Base styles — dark theme as default */
body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds. The `@theme` tokens are now available as Tailwind utilities (e.g., `bg-background`, `text-accent`, `font-mono`).

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: configure design system tokens in Tailwind v4"
```

---

### Task 3: Configure Typography

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update layout.tsx with Geist Sans + JetBrains Mono**

The default create-next-app layout loads Geist Sans and Geist Mono. We keep Geist Sans but replace Geist Mono with JetBrains Mono (per the PRD).

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gustavo Ferraz — Desenvolvedor Full Stack",
  description:
    "Portfolio pessoal de Gustavo Ferraz. Projetos, habilidades técnicas e formas de contato.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

> **Note:** If `Geist` is not available from `next/font/google` in your Next.js version, it may come from the `geist` npm package instead. In that case, use:
> ```tsx
> import { GeistSans } from "geist/font/sans";
> ```
> and set `variable: "--font-geist-sans"` accordingly. Adapt the import to whatever create-next-app generated in Task 1.

**Step 2: Verify fonts load**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Inspect the `<body>` element — it should have CSS variables `--font-geist-sans` and `--font-jetbrains-mono` set. The page text should render in Geist Sans.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure Geist Sans and JetBrains Mono fonts"
```

---

### Task 4: Install Project Dependencies

**Files:**
- Modify: `package.json` (via npm install)

**Step 1: Install framer-motion and next-intl**

These are needed for later epics but installing now ensures they're in the dependency tree and don't break the build.

```bash
npm install framer-motion next-intl
```

**Step 2: Verify build still passes**

```bash
npm run build
```

Expected: Build succeeds. These packages are installed but not imported yet.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install framer-motion and next-intl dependencies"
```

---

### Task 5: Configure Code Quality Tooling

**Files:**
- Create: `.prettierrc`
- Modify: `package.json` (add `type-check` and `format` scripts)

**Step 1: Create Prettier configuration**

```bash
npm install --save-dev prettier eslint-config-prettier
```

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

**Step 2: Add scripts to package.json**

Add these scripts to the `"scripts"` section in `package.json`:

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,json}\""
  }
}
```

> Keep existing scripts (`dev`, `build`, `start`, `lint`). Only add the new ones.

**Step 3: Run all quality checks**

```bash
npm run lint
npm run type-check
npm run format:check
```

Expected: All three pass (format:check may fail on create-next-app defaults — run `npm run format` first to fix, then re-check).

```bash
npm run format
npm run format:check
```

Expected: `format:check` now passes.

**Step 4: Commit**

```bash
git add .prettierrc package.json package-lock.json eslint.config.mjs src/
git commit -m "feat: add Prettier, type-check, and format scripts"
```

---

### Task 6: Create Placeholder Page and README

**Files:**
- Modify: `src/app/page.tsx`
- Create: `README.md`

**Step 1: Replace default page with a minimal placeholder**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold tracking-tight">Gustavo Ferraz</h1>
      <p className="text-muted font-mono text-sm">
        Portfolio em construção...
      </p>
    </main>
  );
}
```

This validates that the design tokens (`text-muted`, `font-mono`) and fonts work together.

**Step 2: Create README.md**

Create `README.md`:

```markdown
# gustavoferraz.dev

Personal portfolio website for Gustavo Ferraz.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **i18n:** next-intl
- **Deploy:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
```

**Step 3: Final verification — all checks pass**

```bash
npm run build && npm run lint && npm run type-check && npm run format:check
```

Expected: All four commands succeed with exit code 0.

**Step 4: Commit**

```bash
git add src/app/page.tsx README.md
git commit -m "feat: add placeholder landing page and README"
```

---

## Verification Checklist (End of Epic 1)

Run these to confirm the epic is complete:

```bash
npm run dev          # Serves localhost:3000 with placeholder page
npm run build        # Zero errors
npm run lint         # Passes
npm run type-check   # Passes
npm run format:check # Passes
```

Visual checks:
- [ ] Page renders "Gustavo Ferraz" in Geist Sans
- [ ] "Portfolio em construção..." renders in JetBrains Mono
- [ ] Background is dark (`#0A0A0F`), text is light (`#E0E0E0`)
- [ ] No console errors in browser DevTools

## Next Step

Create Epic 2 implementation plan (`docs/plans/YYYY-MM-DD-epic2-core-sections.md`).

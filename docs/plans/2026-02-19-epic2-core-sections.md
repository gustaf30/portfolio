# Epic 2: Core Sections — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** All 6 content sections visible on the landing page with project detail pages via MDX, functional Navbar, and Footer.

**Architecture:** Single-page layout (`page.tsx`) composing section components in order. Each section is a standalone component in `src/components/` consuming typed data from `src/lib/data.ts`. Project detail pages use `@next/mdx` with dynamic imports from `src/content/projects/`. Navbar is fixed-top with smooth scroll to section IDs.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, `@next/mdx`, `lucide-react`

**Design doc:** `docs/plans/2026-02-19-backlog-design.md` (Epic 2 section)

---

### Task 1: Install Dependencies + Configure MDX + Data Layer

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/globals.css`
- Create: `src/mdx-components.tsx`
- Create: `src/lib/types.ts`
- Create: `src/lib/data.ts`

**Step 1: Install dependencies**

```bash
npm install lucide-react @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

**Step 2: Configure next.config.ts for MDX**

Replace `src/app/../next.config.ts` (at project root) with:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

**Step 3: Create MDX components file**

Create `src/mdx-components.tsx`:

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-6 text-3xl font-bold tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-foreground/80">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-foreground/80">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-foreground/80">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    code: ({ children }) => (
      <code className="rounded bg-surface-light px-1.5 py-0.5 font-mono text-sm text-accent-light">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-lg bg-surface p-4 font-mono text-sm">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-accent pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  };
}
```

**Step 4: Add smooth scroll to globals.css**

Append to the end of `src/app/globals.css` (after the existing `body` rule):

```css
html {
  scroll-behavior: smooth;
}

section {
  scroll-margin-top: 5rem;
}
```

**Step 5: Create types**

Create `src/lib/types.ts`:

```ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: "education" | "work" | "project";
}
```

**Step 6: Create data**

Create `src/lib/data.ts`:

```ts
import { Project, SkillCategory, TimelineEvent } from "./types";

export const projects: Project[] = [
  {
    slug: "cheerconnect",
    title: "CheerConnect",
    description:
      "Rede social vertical para a comunidade brasileira de cheerleading — plataforma de conexão e interação entre atletas, técnicos e equipes.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/gustaf30/cheerconnect",
  },
  {
    slug: "accodal",
    title: "Accodal",
    description:
      "Projeto de desafio técnico — demonstração de habilidades em processo seletivo com foco em qualidade de código e boas práticas.",
    tags: ["TypeScript", "React", "REST API"],
    github: "https://github.com/gustaf30/accodal-gustavo",
  },
  {
    slug: "valor-disparador",
    title: "Valor Disparador Boletos",
    description:
      "Sistema de disparo e gestão de boletos bancários com automação de processos e relatórios financeiros.",
    tags: ["TypeScript", "Node.js", "Express"],
    github: "https://github.com/gustaf30/valor-disparador-boletos",
  },
  {
    slug: "nexus",
    title: "Nexus",
    description:
      "Projeto Nexus — plataforma experimental explorando novas tecnologias e padrões de desenvolvimento.",
    tags: ["TypeScript", "Next.js"],
    github: "https://github.com/gustaf30/nexus",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Python"],
  },
  {
    name: "Banco de Dados",
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    name: "DevOps",
    skills: ["Git", "Docker", "Vercel", "GitHub Actions"],
  },
  {
    name: "Ferramentas",
    skills: ["VS Code", "Figma", "Postman", "Linux"],
  },
];

export const timeline: TimelineEvent[] = [
  {
    date: "2020 — Presente",
    title: "Ciência da Computação — UTFPR",
    description:
      "Bacharelado em Ciência da Computação na Universidade Tecnológica Federal do Paraná, campus Ponta Grossa.",
    type: "education",
  },
  {
    date: "2024",
    title: "CheerConnect — TCC",
    description:
      "Desenvolvimento do trabalho de conclusão de curso: rede social para a comunidade de cheerleading brasileira.",
    type: "project",
  },
  {
    date: "2024",
    title: "Desafio Técnico — Accodal",
    description:
      "Participação em processo seletivo com projeto técnico demonstrando habilidades em TypeScript e React.",
    type: "work",
  },
  {
    date: "2025",
    title: "Portfolio Pessoal",
    description:
      "Desenvolvimento do portfolio profissional com Next.js, TypeScript e Tailwind CSS.",
    type: "project",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/gustaf30",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/gustavo-p-ferraz/",
  },
  {
    name: "Email",
    url: "mailto:gustavoferraz405@gmail.com",
  },
];
```

**Step 7: Verify build**

```bash
npm run build
```

Expected: Build passes with no errors. The MDX config is set up but no MDX files exist yet — that's fine.

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: install deps, configure MDX, create data layer"
```

---

### Task 2: Section Wrapper + Navbar

**Files:**
- Create: `src/components/section.tsx`
- Create: `src/components/navbar.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create Section wrapper**

Create `src/components/section.tsx`:

```tsx
interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
```

**Step 2: Create Navbar**

Create `src/components/navbar.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experiência", href: "#timeline" },
  { label: "Contato", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#hero" className="text-lg font-bold text-accent">
            GF
          </a>

          {/* Desktop */}
          <ul className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground md:hidden"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <ul className="border-t border-border bg-background px-4 py-4 md:hidden">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Scroll to top */}
      <a
        href="#hero"
        className="fixed bottom-6 right-6 z-50 rounded-full border border-border bg-surface p-2 text-muted transition-colors hover:text-foreground"
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </a>
    </>
  );
}
```

**Step 3: Add Navbar to layout.tsx**

In `src/app/layout.tsx`, add the Navbar import and render it inside `<body>` before `{children}`:

```tsx
import { Navbar } from "@/components/navbar";
```

Add `<Navbar />` before `{children}` inside the body:

```tsx
<body className={`${geistSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
  <Navbar />
  {children}
</body>
```

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Section wrapper and Navbar with mobile menu"
```

---

### Task 3: Hero Section

**Files:**
- Create: `src/components/hero.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Hero component**

Create `src/components/hero.tsx`:

```tsx
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
        Gustavo Ferraz
      </h1>
      <p className="mt-4 text-xl text-muted sm:text-2xl">
        Desenvolvedor Full Stack
      </p>
      <p className="mt-2 max-w-lg text-muted">
        Construindo soluções web modernas com TypeScript, React e Node.js
      </p>

      <div className="mt-8 flex gap-5">
        <a
          href="https://github.com/gustaf30"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-foreground"
          aria-label="GitHub"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/gustavo-p-ferraz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="mailto:gustavoferraz405@gmail.com"
          className="text-muted transition-colors hover:text-foreground"
          aria-label="Email"
        >
          <Mail size={24} />
        </a>
      </div>

      <div className="mt-8 flex gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Ver Projetos
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-light"
        >
          Entrar em Contato
        </a>
      </div>

      <a
        href="#about"
        className="mt-16 text-muted transition-colors hover:text-foreground"
        aria-label="Rolar para baixo"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
```

**Step 2: Rewrite page.tsx**

Replace `src/app/page.tsx` with:

```tsx
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

> Each subsequent task will add more section imports here.

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section with social links and CTAs"
```

---

### Task 4: About Section

**Files:**
- Create: `src/components/about.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create About component**

Create `src/components/about.tsx`:

```tsx
import { Section } from "@/components/section";
import { GraduationCap, Gamepad2, Globe, Trophy } from "lucide-react";

const interests = [
  { icon: Trophy, label: "Xadrez" },
  { icon: Gamepad2, label: "Games" },
  { icon: Globe, label: "Viagens" },
];

export function About() {
  return (
    <Section id="about">
      <h2 className="mb-12 text-3xl font-bold tracking-tight">Sobre Mim</h2>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <p className="leading-relaxed text-foreground/80">
            Sou desenvolvedor full stack apaixonado por criar soluções web
            modernas e performáticas. Tenho experiência com TypeScript, React e
            Node.js, e busco sempre aplicar boas práticas de engenharia de
            software em cada projeto.
          </p>
          <p className="leading-relaxed text-foreground/80">
            Atualmente cursando Ciência da Computação na UTFPR (Universidade
            Tecnológica Federal do Paraná), onde desenvolvi projetos como o
            CheerConnect — uma rede social para a comunidade de cheerleading —
            como trabalho de conclusão de curso.
          </p>
        </div>

        <div className="space-y-8">
          {/* Education */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-light">
              <GraduationCap size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Ciência da Computação</h3>
              <p className="text-sm text-muted">
                UTFPR — Ponta Grossa, PR
              </p>
            </div>
          </div>

          {/* Interests */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Interesses
            </h3>
            <div className="flex flex-wrap gap-3">
              {interests.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80"
                >
                  <Icon size={16} className="text-accent" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

**Step 2: Add to page.tsx**

Import and add `<About />` after `<Hero />` in `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/hero";
import { About } from "@/components/about";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
}
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add About section with bio and interests"
```

---

### Task 5: Skills Section

**Files:**
- Create: `src/components/skills.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Skills component**

Create `src/components/skills.tsx`:

```tsx
import { Section } from "@/components/section";
import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <Section id="skills">
      <h2 className="mb-12 text-3xl font-bold tracking-tight">
        Skills & Tecnologias
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-surface-light px-3 py-1.5 text-sm text-foreground/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

**Step 2: Add to page.tsx**

Add `import { Skills } from "@/components/skills";` and `<Skills />` after `<About />`.

**Step 3: Verify build + Commit**

```bash
npm run build
git add -A
git commit -m "feat: add Skills section with categorized tech grid"
```

---

### Task 6: Timeline Section

**Files:**
- Create: `src/components/timeline.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Timeline component**

Create `src/components/timeline.tsx`:

```tsx
import { Section } from "@/components/section";
import { timeline } from "@/lib/data";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  project: Code2,
};

export function Timeline() {
  return (
    <Section id="timeline">
      <h2 className="mb-12 text-3xl font-bold tracking-tight">Experiência</h2>

      <div className="relative ml-4 border-l border-border pl-8">
        {timeline.map((event, index) => {
          const Icon = typeIcons[event.type];
          return (
            <div key={index} className="relative mb-12 last:mb-0">
              {/* Dot */}
              <div className="absolute -left-[2.85rem] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
                <Icon size={18} className="text-accent" />
              </div>

              {/* Content */}
              <span className="mb-1 text-sm text-muted">{event.date}</span>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                {event.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
```

**Step 2: Add to page.tsx**

Add `import { Timeline } from "@/components/timeline";` and `<Timeline />` after `<Skills />`.

**Step 3: Verify build + Commit**

```bash
npm run build
git add -A
git commit -m "feat: add Timeline section with vertical layout"
```

---

### Task 7: Projects Section (Main Page Cards)

**Files:**
- Create: `src/components/project-card.tsx`
- Create: `src/components/projects.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create ProjectCard component**

Create `src/components/project-card.tsx`:

```tsx
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-light px-2 py-1 text-xs text-accent-light"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Github size={16} />
            Código
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ExternalLink size={16} />
            Demo
          </a>
        )}
        <a
          href={`/projects/${project.slug}`}
          className="ml-auto text-sm text-accent transition-colors hover:text-accent-light"
        >
          Ver detalhes →
        </a>
      </div>
    </div>
  );
}
```

**Step 2: Create Projects section**

Create `src/components/projects.tsx`:

```tsx
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <Section id="projects">
      <h2 className="mb-12 text-3xl font-bold tracking-tight">Projetos</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
```

**Step 3: Add to page.tsx**

Add imports and `<Projects />` between `<About />` and `<Skills />`:

```tsx
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
    </main>
  );
}
```

**Step 4: Verify build + Commit**

```bash
npm run build
git add -A
git commit -m "feat: add Projects section with card grid"
```

---

### Task 8: MDX Project Detail Pages

**Files:**
- Create: `src/content/projects/cheerconnect.mdx`
- Create: `src/content/projects/accodal.mdx`
- Create: `src/content/projects/valor-disparador.mdx`
- Create: `src/content/projects/nexus.mdx`
- Create: `src/app/projects/[slug]/page.tsx`

**Step 1: Create MDX content files**

Create `src/content/projects/cheerconnect.mdx`:

```mdx
export const metadata = {
  title: "CheerConnect",
  description: "Rede social para a comunidade de cheerleading brasileira",
  tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
};

# CheerConnect

Plataforma de rede social desenvolvida como Trabalho de Conclusão de Curso (TCC) na UTFPR, focada em conectar a comunidade brasileira de cheerleading.

## Desafios Técnicos

- Arquitetura de uma rede social com feed de publicações, perfis de usuários e sistema de interações
- Modelagem de banco de dados relacional para múltiplas entidades interconectadas
- Implementação de autenticação e autorização segura
- Otimização de queries para listagens com paginação

## Arquitetura

O projeto segue uma arquitetura cliente-servidor com:

- **Frontend:** React com TypeScript, utilizando componentes reutilizáveis e gerenciamento de estado
- **Backend:** API REST com Node.js e Express, seguindo padrões RESTful
- **Banco de dados:** PostgreSQL com modelagem relacional

## Aprendizados

- Planejamento e execução de um projeto de software completo, do levantamento de requisitos à entrega
- Importância de testes e documentação ao longo do desenvolvimento
- Trabalho com prazos acadêmicos e gestão de escopo
```

Create `src/content/projects/accodal.mdx`:

```mdx
export const metadata = {
  title: "Accodal",
  description: "Projeto de desafio técnico",
  tags: ["TypeScript", "React", "REST API"],
};

# Accodal — Desafio Técnico

Projeto desenvolvido como parte de um processo seletivo técnico, demonstrando habilidades em desenvolvimento frontend e integração com APIs.

## Desafios Técnicos

- Implementação de interface responsiva seguindo especificações de design
- Integração com API REST e tratamento de estados de loading e erro
- Tipagem forte com TypeScript para garantir qualidade do código

## Arquitetura

- **Frontend:** React com TypeScript
- **Estilização:** CSS moderno com componentes reutilizáveis
- **Integração:** Consumo de API REST com tratamento de erros

## Aprendizados

- Desenvolvimento sob pressão de tempo com foco em qualidade
- Importância de código limpo e bem estruturado em processos seletivos
- Documentação clara como diferencial
```

Create `src/content/projects/valor-disparador.mdx`:

```mdx
export const metadata = {
  title: "Valor Disparador Boletos",
  description: "Sistema de disparo e gestão de boletos bancários",
  tags: ["TypeScript", "Node.js", "Express"],
};

# Valor Disparador Boletos

Sistema para automação de disparo e gestão de boletos bancários, focado em eficiência operacional e confiabilidade.

## Desafios Técnicos

- Integração com sistemas bancários e processamento de arquivos de retorno
- Automação de processos de geração e envio de boletos em lote
- Tratamento de erros e reprocessamento de falhas

## Arquitetura

- **Backend:** Node.js com Express e TypeScript
- **Processamento:** Jobs assíncronos para disparo em lote
- **Relatórios:** Geração de relatórios financeiros automatizados

## Aprendizados

- Desenvolvimento de sistemas financeiros com alta necessidade de confiabilidade
- Importância de logging e rastreabilidade em operações financeiras
- Tratamento robusto de erros em integrações externas
```

Create `src/content/projects/nexus.mdx`:

```mdx
export const metadata = {
  title: "Nexus",
  description: "Plataforma experimental",
  tags: ["TypeScript", "Next.js"],
};

# Nexus

Projeto experimental explorando novas tecnologias e padrões de desenvolvimento web moderno.

## Desafios Técnicos

- Exploração de arquiteturas modernas com Next.js e App Router
- Experimentação com padrões de design e componentização avançada
- Integração de diferentes ferramentas e bibliotecas do ecossistema React

## Arquitetura

- **Framework:** Next.js com App Router
- **Linguagem:** TypeScript com tipagem estrita
- **Estilização:** Abordagem moderna com CSS-in-JS ou utility-first

## Aprendizados

- Experimentação como ferramenta de aprendizado
- Avaliação de trade-offs entre diferentes abordagens técnicas
- Importância de projetos pessoais para crescimento profissional
```

**Step 2: Create project detail page route**

Create `src/app/projects/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  let Content: React.ComponentType;
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`);
    Content = mod.default;
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8">
      <a
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Voltar aos projetos
      </a>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-light px-2.5 py-1 text-xs text-accent-light"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-12 flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Github size={16} />
            Repositório
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-dark"
          >
            <ExternalLink size={16} />
            Demo
          </a>
        )}
      </div>

      <article>
        <Content />
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "cheerconnect" },
    { slug: "accodal" },
    { slug: "valor-disparador" },
    { slug: "nexus" },
  ];
}

export const dynamicParams = false;
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build passes. All 4 project detail pages are generated statically. The build output should show routes like `/projects/cheerconnect`, `/projects/accodal`, etc.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add MDX project detail pages with content"
```

---

### Task 9: Contact Section + Footer

**Files:**
- Create: `src/components/contact.tsx`
- Create: `src/components/footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create Contact component**

Create `src/components/contact.tsx`:

```tsx
"use client";

import { Section } from "@/components/section";
import { MapPin, Mail, Send } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact">
      <h2 className="mb-12 text-3xl font-bold tracking-tight">Contato</h2>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Info */}
        <div className="space-y-6">
          <p className="leading-relaxed text-foreground/80">
            Interessado em trabalhar juntos? Entre em contato por e-mail ou
            pelas redes sociais. Estou disponível para oportunidades de trabalho
            remoto ou híbrido.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-accent" />
              <a
                href="mailto:gustavoferraz405@gmail.com"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                gustavoferraz405@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-accent" />
              <span className="text-sm text-muted">
                Ponta Grossa, PR — Brasil
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-colors focus:border-accent"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-colors focus:border-accent"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-colors focus:border-accent"
              placeholder="Sua mensagem..."
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            <Send size={16} />
            Enviar Mensagem
          </button>
          <p className="text-xs text-muted">
            Envio funcional será ativado em breve.
          </p>
        </form>
      </div>
    </Section>
  );
}
```

**Step 2: Create Footer component**

Create `src/components/footer.tsx`:

```tsx
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Gustavo Ferraz
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/gustaf30"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/gustavo-p-ferraz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:gustavoferraz405@gmail.com"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Update page.tsx — final composition**

Replace `src/app/page.tsx` with the final version:

```tsx
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
    </main>
  );
}
```

**Step 4: Add Footer to layout.tsx**

In `src/app/layout.tsx`, import and add Footer after `{children}`:

```tsx
import { Footer } from "@/components/footer";
```

```tsx
<body className={`...`}>
  <Navbar />
  {children}
  <Footer />
</body>
```

**Step 5: Run all checks**

```bash
npm run build && npm run lint && npm run type-check && npm run format:check
```

Fix any formatting issues with `npm run format` if needed, then re-check.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Contact section with form and Footer"
```

---

## Verification Checklist (End of Epic 2)

```bash
npm run build        # Zero errors, all routes generated
npm run lint         # Passes
npm run type-check   # Passes
npm run format:check # Passes
```

Visual checks:
- [ ] Navbar visible at top with section links, hamburger on mobile
- [ ] Hero: name, title, social links, CTA buttons
- [ ] About: bio text, education, interests
- [ ] Projects: 4 cards with tags and links
- [ ] Skills: 5 categories with skill badges
- [ ] Timeline: vertical layout with icons and dates
- [ ] Contact: form fields (no submission yet), email + location
- [ ] Footer: copyright + social links
- [ ] Clicking "Ver detalhes" on a project card navigates to `/projects/[slug]`
- [ ] Project detail pages render MDX content
- [ ] Navbar smooth-scrolls to each section
- [ ] Scroll-to-top button visible

## Next Step

Create Epic 3 implementation plan (`docs/plans/YYYY-MM-DD-epic3-polish.md`).

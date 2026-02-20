import { Project, SkillCategory, TimelineEvent } from "./types";

export const projects: Project[] = [
  {
    slug: "cheerconnect",
    title: "CheerConnect",
    description:
      "Rede social vertical para a comunidade brasileira de cheerleading.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/gustaf30/cheerconnect",
  },
  {
    slug: "accodal",
    title: "Tax System",
    description:
      "Plataforma para extração automática de informações e visualização de documentos fiscais.",
    tags: ["TypeScript", "React", "REST API"],
    github: "https://github.com/gustaf30/accodal-gustavo",
  },
  {
    slug: "valor-disparador",
    title: "Valor — Disparador de Boletos",
    description:
      "Sistema de disparo de boletos bancários com automação de processos para empresa familiar.",
    tags: ["TypeScript", "Node.js", "Express"],
    github: "https://github.com/gustaf30/valor-disparador-boletos",
  },
  {
    slug: "nexus",
    title: "Nexus Hub",
    description:
      "plataforma experimental para centralizar plataformas que uso/usei no trabalho, como Gmail, Jira, Slack, etc.",
    tags: ["TypeScript", "Next.js", "Rust"],
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
    skills: ["Node.js", "Express", "Python", "Rust", "Java"],
  },
  {
    name: "Banco de Dados",
    skills: ["PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    name: "DevOps",
    skills: ["Git", "Docker", "Vercel", "GitHub Actions", "GCP"],
  },
  {
    name: "Ferramentas",
    skills: ["VS Code", "Figma", "Postman", "Linux", "N8N"],
  },
];

export const timeline: TimelineEvent[] = [
  {
    date: "2021 — Presente",
    title: "Ciência da Computação — UTFPR",
    location: "Ponta Grossa — PR",
    description:
      "Bacharelado em Ciência da Computação na Universidade Tecnológica Federal do Paraná.",
    type: "education",
  },
  {
    date: "2024",
    title: "Estágiario Full Stack",
    description:
      "Participação em processo seletivo com projeto técnico demonstrando habilidades em TypeScript e React.",
    location: "Remoto — Ponta Grossa, PR",
    type: "work",
  },
  {
    date: "2025",
    title: "CheerConnect — TCC",
    description:
      "Desenvolvimento do trabalho de conclusão de curso: rede social para a comunidade de cheerleading brasileira.",
    type: "project",
  },
  {
    date: "2025",
    title: "Portfolio Pessoal",
    description:
      "Desenvolvimento do portfolio profissional com Next.js, TypeScript e Tailwind CSS.",
    type: "project",
  },
  {
    date: "2026",
    title: "Sistema Fiscal Automatizado",
    description:
      "Participação em processo seletivo com projeto técnico demonstrando habilidades em TypeScript e React.",
    type: "project",
  },
  {
    date: "2026",
    title: "Low-Code Full Stack Developer",
    description: "Desenvolvedor Full Stack Low-Code na Accodal",
    location: "Remoto — Sacramento, California",
    type: "work",
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

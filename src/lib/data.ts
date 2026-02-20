import { Project, SkillCategory, TimelineEvent } from "./types";

export const projects: Project[] = [
  {
    slug: "cheerconnect",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/gustaf30/cheerconnect",
  },
  {
    slug: "accodal",
    tags: ["TypeScript", "React", "REST API"],
    github: "https://github.com/gustaf30/accodal-gustavo",
  },
  {
    slug: "valor-disparador",
    tags: ["TypeScript", "Node.js", "Express"],
    github: "https://github.com/gustaf30/valor-disparador-boletos",
  },
  {
    slug: "nexus",
    tags: ["TypeScript", "Next.js", "Rust"],
    github: "https://github.com/gustaf30/nexus",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
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
  { key: "backend", skills: ["Node.js", "Express", "Python", "Rust", "Java"] },
  { key: "database", skills: ["PostgreSQL", "MongoDB", "Firebase"] },
  {
    key: "devops",
    skills: ["Git", "Docker", "Vercel", "GitHub Actions", "GCP"],
  },
  { key: "tools", skills: ["VS Code", "Figma", "Postman", "Linux", "N8N"] },
];

export const timeline: TimelineEvent[] = [
  { key: "cs_degree", type: "education" },
  { key: "internship", type: "work" },
  { key: "cheerconnect_tcc", type: "project" },
  { key: "portfolio", type: "project" },
  { key: "fiscal_system", type: "project" },
  { key: "accodal", type: "work" },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/gustaf30" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/gustavo-p-ferraz/" },
  { name: "Email", url: "mailto:gustavoferraz405@gmail.com" },
];

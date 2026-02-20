import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { siteConfig } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      url: `${siteConfig.url}/projects/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
    },
  };
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
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Voltar aos projetos
      </Link>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-light px-2.5 py-1 font-mono text-[11px] tracking-wide text-accent-light"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-12 flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-muted transition-all hover:border-accent/30 hover:text-foreground"
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
            className="flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm text-white transition-colors hover:bg-accent-dark"
          >
            <ExternalLink size={16} />
            Demo
          </a>
        )}
      </div>

      <article className="prose-custom">
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

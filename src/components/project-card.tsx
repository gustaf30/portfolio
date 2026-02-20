"use client";

import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { fadeUp } from "@/lib/motion";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={{ type: "tween", duration: 0.2 }}
      className="group relative rounded-xl border border-border bg-surface/50 p-6 transition-colors duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
    >
      {/* Accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <h3 className="font-display text-xl font-bold">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground/70">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-light px-2.5 py-1 font-mono text-[11px] tracking-wide text-accent-light"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-border/50 pt-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Github size={14} />
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
            <ExternalLink size={14} />
            Demo
          </a>
        )}
        <a
          href={`/projects/${project.slug}`}
          className="ml-auto text-sm font-medium text-accent transition-colors hover:text-accent-light"
        >
          Ver detalhes &rarr;
        </a>
      </div>
    </motion.div>
  );
}

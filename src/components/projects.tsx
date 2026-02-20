"use client";

import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";
import { useTranslations } from "next-intl";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <Section id="projects">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.p
          variants={fadeUp}
          className="mb-2 font-mono text-sm tracking-wider text-accent"
        >
          {t("sectionLabel")}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mb-12 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {t("sectionTitle")}
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

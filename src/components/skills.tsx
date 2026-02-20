"use client";

import { Section } from "@/components/section";
import { skillCategories } from "@/lib/data";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";

export function Skills() {
  return (
    <Section id="skills">
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
          03 — Skills
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mb-12 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Skills & Tecnologias
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={fadeUp}
              className="rounded-xl border border-border bg-surface/50 p-6"
            >
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-accent">
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

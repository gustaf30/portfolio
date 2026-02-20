"use client";

import { Section } from "@/components/section";
import { timeline } from "@/lib/data";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";
import { useTranslations } from "next-intl";

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  project: Code2,
};

export function Timeline() {
  const t = useTranslations("timeline");

  return (
    <Section id="timeline">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
        transition={{ staggerChildren: 0.12 }}
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

        <div className="relative ml-4 border-l border-border pl-8">
          {timeline.map((event, index) => {
            const Icon = typeIcons[event.type];
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative mb-12 last:mb-0"
              >
                {/* Icon dot */}
                <div className="absolute -left-[2.85rem] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
                  <Icon size={18} className="text-accent" />
                </div>

                {/* Content */}
                <span className="mb-1 inline-block font-mono text-xs tracking-wider text-faint">
                  {t(`events.${event.key}.date`)}
                </span>
                <h3 className="text-lg font-semibold">
                  {t(`events.${event.key}.title`)}
                </h3>
                {t.has(`events.${event.key}.location`) && (
                  <span className="text-xs text-muted">
                    {t(`events.${event.key}.location`)}
                  </span>
                )}
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                  {t(`events.${event.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}

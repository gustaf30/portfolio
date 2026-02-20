"use client";

import { Section } from "@/components/section";
import { GraduationCap, Gamepad2, Globe, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  const interests = [
    { icon: Trophy, label: t("chess") },
    { icon: Gamepad2, label: t("games") },
    { icon: Globe, label: t("travel") },
  ];

  return (
    <Section id="about">
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

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="leading-relaxed text-foreground/80">{t("bio1")}</p>
            <p className="leading-relaxed text-foreground/80">{t("bio2")}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-8">
            {/* Education */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                <GraduationCap size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">{t("degree")}</h3>
                <p className="text-sm text-muted">{t("university")}</p>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-faint">
                {t("interestsLabel")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-accent/30"
                  >
                    <Icon size={14} className="text-accent" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}

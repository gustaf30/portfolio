"use client";

import { Section } from "@/components/section";
import { GraduationCap, Gamepad2, Globe, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";

const interests = [
  { icon: Trophy, label: "Xadrez" },
  { icon: Gamepad2, label: "Games" },
  { icon: Globe, label: "Viagens" },
];

export function About() {
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
          01 — Sobre
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mb-12 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Sobre Mim
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="leading-relaxed text-foreground/80">
              Sou um desenvolvedor full stack apaixonado por criar soluções web
              modernas e performáticas. Tenho experiência com TypeScript, React,
              Node.js e Python, e busco sempre aplicar boas práticas de
              engenharia de software em cada projeto.
            </p>
            <p className="leading-relaxed text-foreground/80">
              Atualmente cursando Ciência da Computação na UTFPR (Universidade
              Tecnológica Federal do Paraná).
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-8">
            {/* Education */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                <GraduationCap size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Ciência da Computação</h3>
                <p className="text-sm text-muted">UTFPR — Ponta Grossa, PR</p>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-faint">
                Interesses
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

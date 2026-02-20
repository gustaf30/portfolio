"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpBlur, staggerContainer } from "@/lib/motion";
import { useTheme } from "@/components/theme-provider";
import { useTranslations } from "next-intl";

export function Hero() {
  const { theme } = useTheme();
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      {/* Subtle radial gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent)_0%,_transparent_70%)] opacity-[0.04]" />

      <motion.div
        variants={staggerContainer(0.12, 0.2)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Avatar — crossfade between light/dark photos */}
        <motion.div
          variants={fadeUp}
          className="relative mb-8 h-[180px] w-[180px] overflow-hidden rounded-full border-2 border-border sm:h-[200px] sm:w-[200px]"
        >
          <Image
            src="/images/avatar-light.png"
            alt="Gustavo Ferraz"
            width={200}
            height={200}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: theme === "light" ? 1 : 0 }}
            priority
          />
          <Image
            src="/images/avatar-dark.png"
            alt="Gustavo Ferraz"
            width={200}
            height={200}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: theme === "dark" ? 1 : 0 }}
            priority
          />
        </motion.div>

        {/* Mono tag */}
        <motion.p
          variants={fadeUp}
          className="mb-6 font-mono text-sm tracking-wider text-accent"
        >
          {"<"}
          {t("roleTag")}
          {" />"}
        </motion.p>

        {/* Name — Bricolage Grotesque display with blur entrance */}
        <motion.h1
          variants={fadeUpBlur}
          className="font-display text-5xl font-800 tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Gustavo
          <br />
          <span className="text-accent">Ferraz</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-md text-lg leading-relaxed text-muted"
        >
          {t("tagline")}
        </motion.p>

        {/* Social links */}
        <motion.div variants={fadeUp} className="mt-10 flex gap-5">
          <a
            href="https://github.com/gustaf30"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full border border-border p-3 text-muted transition-all hover:border-accent/40 hover:text-foreground"
            aria-label="GitHub"
          >
            <Github
              size={20}
              className="transition-transform group-hover:scale-110"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/gustavo-p-ferraz/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full border border-border p-3 text-muted transition-all hover:border-accent/40 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin
              size={20}
              className="transition-transform group-hover:scale-110"
            />
          </a>
          <a
            href="mailto:gustavoferraz405@gmail.com"
            className="group rounded-full border border-border p-3 text-muted transition-all hover:border-accent/40 hover:text-foreground"
            aria-label="Email"
          >
            <Mail
              size={20}
              className="transition-transform group-hover:scale-110"
            />
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-8 flex gap-4">
          <motion.a
            href="#projects"
            className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
            whileTap={{ scale: 0.97 }}
          >
            {t("viewProjects")}
          </motion.a>
          <motion.a
            href="#contact"
            className="rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-surface-light"
            whileTap={{ scale: 0.97 }}
          >
            {t("contactCta")}
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          variants={fadeUp}
          href="#about"
          className="mt-20 text-faint transition-colors hover:text-muted"
          aria-label={t("scrollDown")}
        >
          <ArrowDown size={18} className="animate-bounce" />
        </motion.a>
      </motion.div>
    </section>
  );
}

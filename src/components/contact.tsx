"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import {
  MapPin,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";
import { useTranslations } from "next-intl";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [cooldown, setCooldown] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || cooldown) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check — bots fill hidden fields
    if (formData.get("_gotcha")) {
      setStatus("sent"); // Silently pretend success
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          _gotcha: formData.get("_gotcha"),
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("sent");
      form.reset();

      // Rate limit: 60s cooldown after success
      setCooldown(true);
      setTimeout(() => setCooldown(false), 60_000);

      // Reset success message after 5s
      setTimeout(() => setStatus("idle"), 5_000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5_000);
    }
  };

  return (
    <Section id="contact">
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
          {/* Info */}
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="leading-relaxed text-foreground/80">
              {t("description")}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface">
                  <Mail size={18} className="text-accent" />
                </div>
                <a
                  href="mailto:gustavoferraz405@gmail.com"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  gustavoferraz405@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted">{t("location1")}</span>
                  <span className="text-sm text-muted">{t("location2")}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Honeypot field for bot prevention */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium"
              >
                {t("nameLabel")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={status === "sending"}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-faint outline-none transition-colors focus:border-accent disabled:opacity-50"
                placeholder={t("namePlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                {t("emailLabel")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={status === "sending"}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-faint outline-none transition-colors focus:border-accent disabled:opacity-50"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium"
              >
                {t("messageLabel")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                disabled={status === "sending"}
                className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-faint outline-none transition-colors focus:border-accent disabled:opacity-50"
                placeholder={t("messagePlaceholder")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || cooldown}
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send size={14} />
                  {t("sendMessage")}
                </>
              )}
            </button>

            {/* Status feedback */}
            {status === "sent" && (
              <p className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle2 size={16} />
                {t("successMessage")}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} />
                {t("errorMessage")}
              </p>
            )}
            {status === "idle" && !cooldown && (
              <p className="text-xs text-faint">
                {t("infoConfigured")}
              </p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </Section>
  );
}

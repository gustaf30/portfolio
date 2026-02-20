import { Github, Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-bold text-accent">
            GF<span className="text-accent-light">.</span>
          </span>
          <span className="text-sm text-faint">
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/gustaf30"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border p-2 text-muted transition-all hover:border-accent/30 hover:text-foreground"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/gustavo-p-ferraz/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border p-2 text-muted transition-all hover:border-accent/30 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

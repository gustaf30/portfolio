"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const t = useTranslations("nav");

  return (
    <button
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-light hover:text-foreground"
      aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

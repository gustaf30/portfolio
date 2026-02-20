"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

const localeLabels: Record<string, string> = {
  "pt-BR": "PT",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "pt-BR" ? "en" : "pt-BR";

  function switchLocale() {
    router.replace({ pathname }, { locale: nextLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className="flex h-8 items-center gap-1 rounded-full px-2 text-xs font-medium text-muted transition-colors hover:bg-surface-light hover:text-foreground"
      aria-label={`Switch to ${localeLabels[nextLocale]}`}
    >
      <Globe size={14} />
      <span>{localeLabels[locale]}</span>
    </button>
  );
}

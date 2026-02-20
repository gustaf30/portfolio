"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from "next-intl";

const navKeys = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "experience", href: "#timeline" },
  { key: "contact", href: "#contact" },
];

const sectionIds = navKeys.map((l) => l.href.slice(1));

export function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef<HTMLDivElement>(null);

  /* ── Scroll detection ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Close mobile menu on scroll
      if (window.scrollY > 50) setIsOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Intersection Observer for active section ─────────── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Focus trap for mobile menu ───────────────────────── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Floating pill navbar — centered on desktop, full-width on mobile */}
      <nav
        ref={menuRef}
        role="navigation"
        aria-label={t("mainNavAriaLabel")}
        className={`fixed top-2 left-1/2 z-50 w-[calc(100%-1rem)] max-w-2xl -translate-x-1/2 rounded-2xl border transition-all duration-300 md:top-4 md:w-[calc(100%-2rem)] md:rounded-full ${
          scrolled
            ? "border-border/60 bg-surface/80 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-transparent bg-surface/40 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 md:px-5">
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-tight text-accent"
          >
            GF<span className="text-accent-light">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden gap-1 md:flex">
            {navKeys.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                      isActive
                        ? "bg-surface-light text-foreground"
                        : "text-muted hover:bg-surface-light hover:text-foreground"
                    }`}
                  >
                    {t(link.key)}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-light md:hidden"
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="border-t border-border/40 px-5 pb-4 pt-2 md:hidden">
            <ul className="space-y-1">
              {navKeys.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-surface-light text-foreground"
                          : "text-muted hover:bg-surface-light hover:text-foreground"
                      }`}
                    >
                      {t(link.key)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

      {/* Scroll to top — only visible when scrolled */}
      <a
        href="#hero"
        className={`fixed bottom-6 right-6 z-50 rounded-full border border-border bg-surface/80 p-2.5 text-muted backdrop-blur-sm transition-all hover:text-foreground ${
          scrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label={t("backToTop")}
      >
        <ArrowUp size={18} />
      </a>
    </>
  );
}

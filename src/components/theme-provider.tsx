"use client";

import { createContext, useContext, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
  });

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.add("theme-transitioning");
    root.classList.remove("dark", "light");
    root.classList.add(next);
    setTheme(next);
    localStorage.setItem("theme", next);

    // Remove transition class after longest delay (950ms) + duration (1000ms)
    setTimeout(() => root.classList.remove("theme-transitioning"), 2000);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Inline script to prevent flash of wrong theme.
 * Runs before React hydration, reads localStorage and prefers-color-scheme,
 * and sets the class on <html> immediately.
 *
 * NOTE: This uses dangerouslySetInnerHTML intentionally with a hardcoded
 * static string (no user input). This is the standard Next.js pattern
 * for blocking theme scripts to prevent FOUC (flash of unstyled content).
 */
export function ThemeScript() {
  // Static script — no user input, safe from XSS
  const script = `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches;var t=s||(p?'dark':'light');document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('dark')}})()`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}

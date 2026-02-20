/**
 * Shared Framer Motion variants and animation constants.
 *
 * Design system reference: docs/system-design.md Section 3
 */

/* ── Easing presets ────────────────────────────────────────── */

export const easings = {
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

/* ── Duration presets (seconds) ────────────────────────────── */

export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

/* ── Variants ──────────────────────────────────────────────── */

/** Fade up from below — default section/element entrance */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
};

/** Fade up with blur — dramatic hero entrance */
export const fadeUpBlur = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: durations.slower, ease: easings.easeOut },
  },
};

/** Stagger container — wraps children with staggered reveal */
export const staggerContainer = (staggerMs = 0.1, delayMs = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: staggerMs, delayChildren: delayMs },
  },
});

/* ── Viewport config for whileInView ──────────────────────── */

export const viewportConfig = {
  once: true,
  margin: "-80px" as const,
};

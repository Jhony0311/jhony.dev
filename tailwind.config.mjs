/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg)",
        "canvas-subtle": "var(--bg-subtle)",
        "canvas-inset": "var(--bg-inset)",
        ink: "var(--text)",
        "ink-muted": "var(--text-muted)",
        "ink-faint": "var(--text-faint)",
        line: "var(--line)",
        "accent-green": "var(--accent-green)",
        "accent-green-soft": "var(--accent-green-soft)",
        "accent-blue": "var(--accent-blue)",
        "accent-blue-soft": "var(--accent-blue-soft)",
        "stage-seedling": "var(--seedling)",
        "stage-budding": "var(--budding)",
        "stage-evergreen": "var(--evergreen)",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        shimmer: {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s ease-in-out infinite",
      },
    },
  },
};

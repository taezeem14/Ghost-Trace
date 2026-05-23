import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ghost: {
          cyan: "var(--ghost-cyan)",
          cyanDim: "var(--ghost-cyan-dim)",
          green: "var(--ghost-green)",
          greenDim: "var(--ghost-green-dim)",
          amber: "var(--ghost-amber)",
          red: "var(--ghost-red)",
          redDim: "var(--ghost-red-dim)",
          purple: "var(--ghost-purple)",
          dark: "var(--ghost-dark)",
          darker: "var(--ghost-darker)",
          border: "var(--ghost-border)",
        },
      },
      fontFamily: {
        ui: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        heading: ["var(--font-syne)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-scan": "linear-gradient(to bottom, transparent, var(--ghost-cyan), transparent)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scan-line 3s linear infinite",
        "glitch": "glitch 1s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px var(--ghost-cyanDim))" },
          "50%": { opacity: ".7", filter: "drop-shadow(0 0 2px transparent)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

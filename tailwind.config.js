/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        'video': '16 / 9',
        '16/9': '16 / 9',
        'square': '1 / 1',
      },
      colors: {
        brand: {
          primary: "var(--brand-primary, #E11D48)",
          hover: "var(--brand-primary-hover, #BE123C)",
          light: "var(--brand-primary-light, #FFF1F2)",
          accent: "var(--brand-accent, #F59E0B)",
        },
        surface: {
          bg: "var(--surface-bg, #FFFDFB)",
          card: "var(--surface-card, #FFFFFF)",
        },
        sidebar: {
          bg: "var(--sidebar-bg, #1F1218)",
          text: "var(--sidebar-text, #FFF1F2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
    },
  },
  plugins: [],
};

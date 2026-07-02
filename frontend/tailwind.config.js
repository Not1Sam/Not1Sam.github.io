/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        accent: 'var(--color-accent)',
        fluo: 'var(--color-fluo)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        mono: ['var(--font-mono)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'hero-image': "url('/images/hero-bg.png')",
      },
      fontFamily: {
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      boxShadow: {
        button: '0px 0px 68px 7px rgba(139, 92, 246, 0.4)',
      },
      colors: {
        'page-black': '#09090b',
        'page-gray': '#18181b',
        'primary': '#8b5cf6',
        'secondary': '#06b6d4',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
      }
    },
  },
  plugins: [],
}

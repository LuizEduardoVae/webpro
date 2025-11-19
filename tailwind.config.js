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
      serif: ['var(--font-playfair)', 'serif'],
    },
    extend: {
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #FFF 0%, #FFF 100%)',
        'blue-purple-gradient': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      },
      fontFamily: {
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      boxShadow: {
        button: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        'page-bg': '#ffffff',
        'page-black': '#09090b',
        'primary': '#000000', // Black is the new primary
        'secondary': '#6366f1', // Indigo/Purple accent
        'text-primary': '#0a0a0a',
        'text-secondary': '#52525b',
      }
    },
  },
  plugins: [],
}

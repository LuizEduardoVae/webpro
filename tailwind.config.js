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
        'hero-gradient': 'linear-gradient(180deg, #FFF 0%, #FFF 100%)',
        'orange-gradient': 'radial-gradient(circle at 50% 50%, #FF4D00 0%, rgba(255, 77, 0, 0) 70%)',
      },
      fontFamily: {
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      boxShadow: {
        button: '0px 4px 20px rgba(255, 77, 0, 0.3)',
      },
      colors: {
        'page-bg': '#ffffff',
        'page-black': '#09090b', // Keeping for compatibility if needed, but main bg is white
        'primary': '#FF4D00',
        'secondary': '#06b6d4',
        'text-primary': '#0a0a0a',
        'text-secondary': '#52525b',
      }
    },
  },
  plugins: [],
}

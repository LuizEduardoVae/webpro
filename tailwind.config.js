/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-dm-sans)', 'sans-serif'],
      serif: ['var(--font-playfair)', 'serif'],
    },
    extend: {
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #FFF 0%, #FFF 100%)',
        'black-gradient': 'linear-gradient(135deg, #000000 0%, #202020 100%)',
      },
      fontFamily: {
        mono: ['var(--font-plex-mono)', 'monospace'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      boxShadow: {
        button: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        'page-bg': '#ffffff',
        'page-black': '#09090b',
        'primary': '#000000',
        'secondary': '#333333', // Dark gray accent
        'text-primary': '#0a0a0a',
        'text-secondary': '#52525b',
      }
    },
  },
  plugins: [],
}

// sadadsaadsaddas
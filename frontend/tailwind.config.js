/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        climate: {
          dark: '#030712', // Very deep, rich black/blue
          card: 'rgba(15, 23, 42, 0.45)', // Glassy slate
          primary: '#0ea5e9', // Sky blue
          primaryHover: '#0284c7', 
          accent: '#06b6d4', // Bright Neon Cyan
          text: '#f8fafc',
          muted: '#94a3b8',
          border: 'rgba(255, 255, 255, 0.08)', // Subtle white for glass edge
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 10s infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)' },
          '50%': { opacity: .6, boxShadow: '0 0 5px rgba(6, 182, 212, 0.2)' },
        }
      }
    },
  },
  plugins: [],
}

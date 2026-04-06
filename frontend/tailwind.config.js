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
          dark: '#0f172a',    // slate-900
          card: '#1e293b',    // slate-800
          border: '#334155',  // slate-700
          primary: '#0ea5e9', // sky-500
          primaryHover: '#0284c7', // sky-600
          accent: '#14b8a6',  // teal-500
          text: '#f8fafc',    // slate-50
          muted: '#94a3b8',   // slate-400
        }
      }
    },
  },
  plugins: [],
}

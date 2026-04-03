// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['Dancing Script', 'cursive'],
        'romantic': ['Great Vibes', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage: {
        'romantic-gradient': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'starry-night': 'radial-gradient(circle at 10% 20%, rgba(255,105,180,0.1) 0%, rgba(255,182,193,0.05) 90%)',
      }
    },
  },
  plugins: [],
}
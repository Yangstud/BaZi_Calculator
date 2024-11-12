/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'spin': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'yin-yang': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTAwIDJDMTAwIDIgMTAwIDEwMCAxMDAgMTAwQzEwMCAxMDAgMiAxMDAgMiAxMDBDMiAxMDAgMTAwIDIgMTAwIDJaIiBmaWxsPSIjMDAwIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNTAiIHI9IjEwIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSIxMCIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')",
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        mytheme: {        
          "primary": "#F59E0B",
                  
          "secondary": "#d926a9",
                  
          "accent": "#1fb2a6",
                  
          "neutral": "#2a323c",
                  
          "base-100": "#ffffff",
                  
          "info": "#3abff8",
                  
          "success": "#36d399",
                  
          "warning": "#fbbd23",
                  
          "error": "#f87272",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: "#F59E0B"
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
}


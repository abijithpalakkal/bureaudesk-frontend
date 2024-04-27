/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: {
          DEFAULT: '#3F8CFF', 
        },
      },
      fontFamily:{
        nunitosans:'Nunito Sans'
        
      }
    },
  },
  plugins: [],
}


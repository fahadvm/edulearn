/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          blue: '#0ea5e9',
        },
        500: "#4f8cff",
        600: "#3f6fd8",
      },
      backgroundImage: {
        "gradient-soft": "linear-gradient(135deg, #d8e8ff 0%, #f9faff 100%)",
        "gradient-card": "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(230,240,255,0.6))",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};

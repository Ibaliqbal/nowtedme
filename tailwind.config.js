/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        note: "#313131",
        secondary: "#181818",
      },
    },
  },
  plugins: [],
};

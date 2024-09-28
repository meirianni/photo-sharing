/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white : "#FFFFFF",
        hover : "#87403A",
        main : "#994842",
        black : "#171614",
        grey : "#E8EAED"
      },
      fontFamily : {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

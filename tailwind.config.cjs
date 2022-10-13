/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cat-base": "#1e1e2e",
        "cat-surface0": "#313244",
        "cat-overlay0": "#6c7086",
        "cat-text": "#cdd6f4",
        "cat-sapphire": "#74c7ec",
        "cat-green": "#a6e3a1",
      },
    },
  },
  plugins: [],
};

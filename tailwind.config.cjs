/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "cat-base": "#1e1e2e",
                "cat-surface0": "#313244",
                "cat-overlay0": "#6c7086",
                "cat-subtext0": "#a6adc8",
                "cat-text": "#cdd6f4",
                "cat-sapphire": "#74c7ec",
                "cat-green": "#a6e3a1",
                "cat-red": "#f38ba8",
                "cat-mauve": "#cba6f7",
                "cat-peach": "#fab387",
            },
        },
    },
    plugins: [],
};

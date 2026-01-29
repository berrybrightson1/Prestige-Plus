import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F9F8F6",
                foreground: "#1A1A1A",
                border: "#E5DFD7",
                cream: {
                    50: "#FEFDFB",
                    100: "#F9F8F6",
                    200: "#F5F3F0",
                    300: "#EEEAE5",
                    400: "#E5DFD7",
                    500: "#D9D1C7",
                },
                accent: {
                    green: "#2D5F3F",
                    gold: "#C9A961",
                    navy: "#1E3A5F",
                },
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
            },
            boxShadow: {
                soft: "0 4px 20px rgba(0, 0, 0, 0.06)",
                float: "0 8px 30px rgba(0, 0, 0, 0.08)",
            },
            fontFamily: {
                sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;

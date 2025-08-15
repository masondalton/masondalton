/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        accent: "#ec4899",
        ink: "#0f172a",
        soft: "#f8fafc",
      },
      borderRadius: { xl2: "1rem" },
      boxShadow: {
        glow: "0 10px 30px rgba(99,102,241,0.25)",
        soft: "0 8px 20px rgba(15,23,42,0.08)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

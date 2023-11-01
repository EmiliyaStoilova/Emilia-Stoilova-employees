/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        md: "0px 0px 20px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
};

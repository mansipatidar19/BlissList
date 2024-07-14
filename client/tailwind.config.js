/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Custom focus styles
      ringWidth: {
        0: "0px",
      },
      boxShadow: {
        none: "none",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class", // This allows you to use form-specific utility classes without globally modifying all inputs
    }),
  ],
  variants: {
    extend: {
      ringWidth: ["focus"],
      boxShadow: ["focus"],
    },
  },
};

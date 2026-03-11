/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
      screens: {
        'tablet': '721px',
        'pc': '1024px',
        'wide': '1025px',
        'tablet-footer': '768px',
      },
    extend: {
    },
  },
  plugins: [],
}


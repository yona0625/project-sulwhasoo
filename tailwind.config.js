/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    screens: {
      tablet: "721px",
      pc: "1024px",
      wide: "1025px",
      "tablet-footer": "768px",
    },
    extend: {
      fontFamily: {
        korean: [
          "'Noto Sans KR'",
          "Malgun Gothic",
          "맑은 고딕",
          "Nanum Gothic",
          "나눔 고딕",
          "돋움",
          "dotum",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

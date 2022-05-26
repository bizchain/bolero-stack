module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
	],
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				"primaryBgColor": "#008184",
				"primaryTextColor": "#ffffff",
				"primaryColorLine": "#7fcbcd",
				"dashBorder": "#d9d9d9",
				"dashBorderDark": "#b6b6b6",
				"dashLink": "#0051c3",
				"dashLinkHover": "#003681",
				"dashGrayBackground": "#f2f2f2"
			},

			// fontFamily: {
			// 	"sans": ["Inter", ...defaultTheme.fontFamily.sans],
			// },

			screens: {
				"xs": "500px",
				"3xl": "2000px",
			},
		},
	},
	plugins: [
		require("daisyui"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
	],
}
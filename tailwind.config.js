/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// Background colors
				bg_white: "#FFFFFF",
				bg_secondary: "#F0F3F6",

				// Primary brand color
				brand_green: "#00B08E",

				// Text colors
				text_primary: "#374154",
				text_invert: "#FFFFFF",

				// Border color
				border: "#D0E0E6",

				// Status indicator / feedback
				danger_subtle: "#FFE3E2",
				danger_red: "#F04A38",
				success_subtle: "#ECFDF3",
				success_green: "#17A866",
			},
		},
	},
	plugins: [],
}

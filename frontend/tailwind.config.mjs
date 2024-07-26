const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: [],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				"badger-red": "#ff125e",
				"badger-orange": "#ff8e31",
				"badger-green": "#00e54a",
				"badger-blue": "#047eff",
				"badger-violet": "#6900ff",

				"badger-background": "var(--badger-background)",
				"badger-background-secondary": "var(--badger-background-secondary)",
				"badger-border": "var(--badger-border)",
				"badger-text": "var(--badger-text)",
			},
		},
	},
	plugins: [],
};

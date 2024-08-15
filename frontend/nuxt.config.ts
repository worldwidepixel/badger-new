const STAGING_API_URL = "https://badger-api-staging.worldwidepixel.ca";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	modules: ["@nuxtjs/tailwindcss", "nuxt-lucide-icons", "@nuxtjs/color-mode", "@nuxt/image", "floating-vue/nuxt"],

	colorMode: {
		classSuffix: "",
	},
	css: ["~/assets/global.css"],

	runtimeConfig: {
		public: {
			apiBase: getApiBase(),
		},
	},

	app: {
		head: {
			title: "Badger",
			titleTemplate: "%s - Badger",
			meta: [
				{
					name: "description",
					content: "Create beautiful modern, and unique badges using Badger.",
				},
				{ name: "theme-color", content: "#ff3a40" },
			],
			link: [{ rel: "shortcut icon", href: "./favicon.ico", type: "image/x-icon" }],
		},
	},

	compatibilityDate: "2024-07-24",
});

function getApiBase() {
	return process.env.BROWSER_BASE_URL || process.env.NODE_ENV === "production"
		? STAGING_API_URL
		: "http://localhost:3001";
}

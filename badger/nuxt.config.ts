// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	modules: ["@nuxtjs/tailwindcss", "nuxt-lucide-icons", "@nuxtjs/color-mode", "@nuxt/image"],

	colorMode: {
		classSuffix: "",
	},

	runtimeConfig: {
		public: {
			apiBase:
				process.env.NODE_ENV === "production"
					? "https://badger-api-staging.worldwidepixel.ca"
					: "http://localhost:3001",
		},
	},

	compatibilityDate: "2024-07-24",
});

const STAGING_API_URL = "https://badger-api-staging.worldwidepixel.ca";

function getApiBase() {
	return process.env.BROWSER_BASE_URL ?? STAGING_API_URL;
}

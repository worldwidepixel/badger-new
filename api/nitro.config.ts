//https://nitro.unjs.io/config
export default defineNitroConfig({
	srcDir: "src",
	compatibilityDate: "2025-07-19",
	cloudflare: {
		deployConfig: true,
		nodeCompat: true
	}
});

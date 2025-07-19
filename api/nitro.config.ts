//https://nitro.unjs.io/config
export default defineNitroConfig({
	srcDir: "src",
	compatibilityDate: "2025-07-19",
	errorHandler: "~/error.ts",
	noExternals: false,
	rollupConfig: {
		external(id) {
			if (id.startsWith("xss")) {
				return true;
			}
		},
	},
	node: false,
});

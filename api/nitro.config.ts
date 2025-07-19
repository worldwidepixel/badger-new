//https://nitro.unjs.io/config
export default defineNitroConfig({
	srcDir: "src",
	compatibilityDate: "2025-07-19",
	errorHandler: "~/error.ts",
	noExternals: true,
	node: false,
});

import FloatingVue from "floating-vue";

export default defineNuxtPlugin(() => {
	FloatingVue.options.themes["badger-ui"] = {
		...FloatingVue.options.themes.tooltip,
		$resetCss: true,
		placement: "bottom",
	};
});

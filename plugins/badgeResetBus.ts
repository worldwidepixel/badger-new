import mitt from 'mitt'

export default defineNuxtPlugin(() => {
	const emitter = mitt()

	return {
		provide: {
			resetBus: {
				$on: emitter.on,
				$emit: emitter.emit,
			},
		},
	};
});
//https://stackoverflow.com/questions/72553376/emit-event-using-nuxtlayout-vue3-nuxt3

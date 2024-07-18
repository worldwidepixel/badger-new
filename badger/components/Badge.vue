<script setup>
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiBase;

const props = defineProps({
	topText: String,
	topTextColour: String,
	topColour: String,
	bottomText: String,
	bottomTextColour: String,
	bottomColour: String,
	iconUrl: String,
	type: String,
	version: Number,
});

const badgeHeight = ref("56px");
badgeHeight.value =
	props.type === "cozy" || props.type === "cozy_minimal" ? "56px" : "40px";
const placeholderWidth = ref(150);
placeholderWidth.value =
	props.type === "cozy" || props.type === "cozy_minimal" ? 150 : 48;
</script>

<template>
	<NuxtImg
		:style="{ height: badgeHeight }"
		:placeholder="
			img(`/img/placeholderBadge.svg`, {
				h: badgeHeight,
				f: 'png',
				q: 50,
			})
		"
		:src="
			baseUrl +
			`/${type}?gradientStart=${topColour}&gradientEnd=${bottomColour}&lineOne=${topText}&lineTwo=${bottomText}&colourOne=${topTextColour}&colourTwo=${bottomTextColour}&iconUrl=${iconUrl}`
		"
	/>
</template>

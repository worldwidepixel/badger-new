<script setup>
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiBase;
import { saveAs } from "file-saver";

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
badgeHeight.value = props.type === "cozy" || props.type === "cozy_minimal" ? "56px" : "40px";
const placeholderWidth = ref(150);
placeholderWidth.value = props.type === "cozy" || props.type === "cozy_minimal" ? 150 : 48;
const url = `${baseUrl}/${props.type}?gradientStart=${props.topColour}&gradientEnd=${props.bottomColour}&lineOne=${props.topText}&lineTwo=${props.bottomText}&colourOne=${props.topTextColour}&colourTwo=${props.bottomTextColour}&iconUrl=${props.iconUrl}`;

const copy = (text) => {
	navigator.clipboard.writeText(text);
};
</script>

<template>
	<ul class="flex w-min justify-center divide-x rounded-xl border">
		<li
			v-for="format in ['png', 'svg']"
			class="h-full w-full cursor-pointer p-2"
			v-tooltip="{
				content: 'Export as ' + format.toUpperCase(),
				theme: 'badger-ui',
			}"
			@click.prevent="saveAs(url + `&format=${format}`, `badge.${format}`)">
			<LucideImageDown v-if="format == 'png'" />
			<LucidePenTool v-else />
		</li>

		<li
			class="h-full w-full cursor-pointer p-2"
			v-tooltip="{
				content: 'Copy markdown',
				theme: 'badger-ui',
			}"
			@click.prevent="copy(`![${topText} ${bottomText}](${url + `&format=png`})`)">
			<LucideAArrowDown />
		</li>

		<li
			class="h-full w-full cursor-pointer p-2"
			v-tooltip="{
				content: 'Copy HTML',
				theme: 'badger-ui',
			}"
			@click.prevent="copy(`<img src='${url + `&format=png`}' alt='${topText} ${bottomText}' />`)">
			<LucideCodeXml />
		</li>
	</ul>
</template>

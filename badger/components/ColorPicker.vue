<script setup lang="ts">
import type { Color } from "@/types/Color";
import { onMounted, ref } from "vue";
import Slider from "./Slider.vue";

const hexRegex = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i;

const props = defineProps<{
	defaultColor: Color;
}>();

const hue = ref<number>(0);
const saturation = ref<number>(0);
const lightness = ref<number>(0);
const color = defineModel<string>();
const emit = defineEmits(["updateColor"]);

onMounted(() => {
	color.value = props.defaultColor;
	hue.value = 1;
	saturation.value = 1;
	lightness.value = 1;

	UpdateColor();
});

function UpdateColor() {
	const h = hue.value * 360;
	const s = saturation.value * 100;
	let l = lightness.value;

	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0");
	};

	color.value = `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
	emit("updateColor", color.value);
}

function UpdateHue(h: number) {
	hue.value = h;
	UpdateColor();
}

function UpdateSaturation(s: number) {
	saturation.value = s;
	UpdateColor();
}

function UpdateLightness(l: number) {
	lightness.value = l;
	UpdateColor();
}
</script>

<template>
	<div class="flex w-40 flex-col gap-2">
		<Slider
			:default="1"
			class="h-10 w-20"
			@update-value="UpdateHue"
			style="
				background-image: linear-gradient(
					90deg,
					red 0px,
					rgb(255, 255, 0) 17%,
					rgb(0, 255, 0) 33%,
					rgb(0, 255, 255) 50%,
					rgb(0, 0, 255) 67%,
					rgb(255, 0, 255) 83%,
					red
				);
			" />
		<Slider
			:default="1"
			class="h-10 w-20"
			@update-value="UpdateSaturation"
			:style="{
				backgroundImage: `linear-gradient(
					90deg,
					hsl(${hue * 360}, 0%, 50%) 0%,
					hsl(${hue * 360}, 100%, 50%) 100%
				)`,
			}" />
		<Slider
			:default="1"
			class="h-10 w-20"
			@update-value="UpdateLightness"
			:style="{
				backgroundImage: `linear-gradient(
					90deg,
					#000 0%,
					hsl(${hue * 360}, 100%, 50%) 50%,
					#FFF 100%
				)`,
			}" />
	</div>
</template>

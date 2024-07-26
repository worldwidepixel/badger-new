<script setup lang="ts">
import { onMounted, ref } from "vue";

const hexRegex = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i;

const props = defineProps<{
	default: number;
}>();

const div = ref<HTMLDivElement>(null!);
const cursor = ref<HTMLDivElement>(null!);
const emit = defineEmits(["updateValue"]);
let rect: DOMRect;
const cursorPosition = defineModel<number>();

onMounted(() => {
	rect = div.value.getBoundingClientRect();
	cursorPosition.value = props.default * 160;
});

function UpdateCursor(position: number) {
	cursorPosition.value = Math.min(Math.max(position - rect.left, 0), rect.width);
	emit("updateValue", cursorPosition.value / rect.width);
}

function OnChange(event: MouseEvent | TouchEvent) {
	event.preventDefault();
	rect = div.value.getBoundingClientRect();

	const Update = (event: MouseEvent | TouchEvent) => {
		if (event.type.match(/^touch/i)) {
			UpdateCursor((event as TouchEvent).touches[0].clientX);
		} else {
			UpdateCursor((event as MouseEvent).clientX);
		}
	};

	Update(event);

	const animationFrame = (event: MouseEvent | TouchEvent) => {
		window.requestAnimationFrame(() => Update(event));
	};

	const OnRelease = () => {
		document.removeEventListener("mousemove", animationFrame);
		document.removeEventListener("touchmove", animationFrame);
		document.removeEventListener("mouseup", OnRelease);
		document.removeEventListener("touchend", OnRelease);
	};

	document.addEventListener("mousemove", animationFrame);
	document.addEventListener("touchmove", animationFrame);
	document.addEventListener("mouseup", OnRelease);
	document.addEventListener("touchend", OnRelease);
}
</script>

<template>
	<div
		ref="div"
		class="z-1 h-7 w-40 gap-0 rounded-md shadow-md"
		role="slider"
		@mousedown="OnChange"
		@touchstart="OnChange">
		<div
			ref="cursor"
			class="thumb absolute h-7 w-[2px] rounded bg-black will-change-transform"
			:style="{
				transform: `translate(${cursorPosition!}px, 0)`,
			}" />
	</div>
</template>

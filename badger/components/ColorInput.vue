<script setup lang="ts">
import { ref } from "vue";
import ColorPicker from "./ColorPicker.vue";

const hexRegex = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i;

const popup = ref(false);
const input = ref<HTMLInputElement>(null!);
const colorPicker = ref<typeof ColorPicker>(null!);
let color = defineModel<string>();

onMounted(() => {
	//console.log(color.value)
	Validate();
});

function Validate() {
	if (input.value.value.match(hexRegex)) {
		color.value = input.value.value;
	} else {
		UpdateColor();
	}
}

function CheckForValidate(e: KeyboardEvent) {
	if (e.key === "Enter") {
		Validate();
	}
}

function UpdateColor() {
	input.value.value = color.value!;
}

function Popup() {
	popup.value = !popup.value;
}
</script>

<template>
	<div class="flex flex-col">
		<div class="flex h-10 w-64 flex-row gap-0 rounded-xl border p-2">
			<input
				ref="input"
				class="w-[10rem] outline-none dark:bg-transparent"
				:value="color"
				@focusout="Validate"
				@keydown="CheckForValidate"
				type="text"
				maxlength="7" />

			<div
				class="h-full w-full cursor-pointer rounded-md border"
				v-tooltip="{
					content: 'Select Colour',
					theme: 'badger-ui',
				}"
				:style="{
					backgroundColor: color,
				}"
				@click="Popup"></div>
		</div>
		<transition
			enter-from-class="-translate-y-3 opacity-0 ease-in-out transition duration-300"
			enter-to-class="opacity-100 translate-y-0 ease-in-out transition duration-300"
			leave-to-class="opacity-0 -translate-y-3 ease-in-out transition duration-300"
			leave-from-class="opacity-100 translate-y-0 ease-in-out transition duration-300"
			v-show="popup">
			<ColorPicker
				ref="colorPicker"
				@update-color="UpdateColor"
				class="absolute z-10 mt-14 h-40 w-44 -translate-y-3 flex-col items-center justify-evenly rounded-xl border bg-white"
				v-model="color"
				:defaultColor="`#${color}`" />
		</transition>
	</div>
</template>

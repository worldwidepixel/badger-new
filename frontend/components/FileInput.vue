<!--DEPRECATED IN FAVOUR OF URL-->

<template>
	<input
		accept="image/*"
		type="file"
		@change="previewFiles"
		class="fileInput h-10 w-64 cursor-pointer gap-0 rounded-xl border p-[5px] outline-none file:cursor-pointer file:rounded-md file:border file:border-solid file:border-[#e5e7eb] file:bg-white file:active:border-slate-300 dark:file:bg-transparent dark:file:text-white" />
</template>

<style>
/*input.fileInput {
	background: none;
	margin: 0;
	padding-block: 0;
	padding-inline: 0;
	padding: 4px;
}

input.fileInput::before {
	display: none;
} */
</style>

<script setup>
const file = defineModel();

function previewFiles(event) {
	file.value = event.target.files[0];
	//console.log(file.value)
}

//console.log(':(')
</script>

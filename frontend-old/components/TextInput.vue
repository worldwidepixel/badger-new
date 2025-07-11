<template>
	<input
		class="h-10 w-64 gap-0 rounded-xl border p-2 outline-none dark:bg-transparent"
		placeholder="Type anything here"
		v-model="textInput" />
</template>

<script setup>
const textInput = defineModel();
</script>

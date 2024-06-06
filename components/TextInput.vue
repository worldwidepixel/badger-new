<template>
	<input class="dark:bg-transparent outline-none h-10 w-64 gap-0 rounded-xl p-2 border" placeholder="Type anything here" v-model="textInput">
</template>

<script setup>

	const textInput = defineModel();

</script>

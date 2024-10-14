<template>
	<NuxtLayout />
</template>

<script setup>
const route = useRoute();
useHead({
	title: "Badger",
	titleTemplate: "%s - Badger",
	meta: [
		{
			name: "description",
			content: "Create beautiful, modern, and unique badges using Badger.",
		},
		{ name: "theme-color", content: "#ff3a40" },
	],
	link: [{ rel: "shortcut icon", href: "./badge.png", type: "image/png" }],
});
</script>

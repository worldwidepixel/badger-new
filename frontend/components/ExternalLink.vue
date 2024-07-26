<template>
	<NuxtLink target="_blank" class="flex flex-row items-center text-base font-[700]" :to="to">
		<slot />
		<LucideArrowUpRight class="text-badger-red" />
	</NuxtLink>
</template>

<script setup>
const props = defineProps({
	to: String,
});
</script>

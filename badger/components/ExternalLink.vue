<template>
	<NuxtLink class="flex flex-row font-[700] text-base" :to="to">
		<slot />
		<LucideArrowUpRight class="text-[var(--brand-red)]" />
	</NuxtLink>
</template>

<script setup>
const props = defineProps({
	to: String,
});
</script>

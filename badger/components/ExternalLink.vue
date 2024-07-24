<template>
	<NuxtLink class="flex flex-row text-base font-[700]" :to="to">
		<slot />
		<LucideArrowUpRight class="text-[var(--brand-red)]" />
	</NuxtLink>
</template>

<script setup>
const props = defineProps({
	to: String,
});
</script>

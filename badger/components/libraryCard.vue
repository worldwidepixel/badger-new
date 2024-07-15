<template>
	<div>
		<NuxtLink
			class="flex flex-row items-center gap-4"
			:to="`${baseUrl}/${badge}`"
		>
			<img class="h-14" :src="`${baseUrl}/cozy${badge}`" />
		</NuxtLink>
	</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiBase;

const props = defineProps({
	badge: String,
	name: String,
});
</script>

<template>
	<div>
		<NuxtLink
			class="flex flex-row items-center gap-4"
			:to="`/?gradientStart=${badge.topColour}&gradientEnd=${badge.bottomColour}&lineOne=${badge.topText}&lineTwo=${badge.bottomText}&colourOne=${badge.topTextColour}&colourTwo=${badge.bottomTextColour}&iconUrl=${badge.icon}`"
		>
			<Badge
				style="height: 3.5rem !important"
				type="cozy"
				:topText="badge.topText"
				:bottomText="badge.bottomText"
				:topTextColour="badge.topTextColour"
				:bottomTextColour="badge.bottomTextColour"
				:topColour="badge.topColour"
				:bottomColour="badge.bottomColour"
				:iconUrl="badge.icon"
				:version="3"
			/>
		</NuxtLink>
	</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiBase;

const props = defineProps({
	badge: Object,
	name: String,
});
</script>

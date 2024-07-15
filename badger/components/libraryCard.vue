<template>

	<div>

		<NuxtLink class="flex flex-row items-center gap-4" :to="`https://badger-staging.worldwidepixel.ca/${badge}`">

			<img class="h-14" :src="`https://badger-staging.worldwidepixel.ca/cozy${badge}`">

		</NuxtLink>

	</div>

</template>

<script setup>

const props = defineProps({
	"badge": String,
	"name": String
})

</script>

<template>
	<div class="flex flex-col gap-4 p-4">
		<span class="text-3xl font-bold"> Library </span>

		<div class="flex flex-col gap-2" v-for="dataGroup in libraryData">
			<span class="font-[500] text-xl">
				{{ getKeyByValue(libraryData, dataGroup) }}
			</span>

			<div class="flex flex-row flex-wrap gap-2">
				<LibraryCard
					v-for="badge in dataGroup"
					:name="badge.title"
					:badge="badge"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiBase;

const libraryData = await $fetch(`${baseUrl}/internal/library`);

/*let newBadges = [];
let i = 0;

console.log(libraryData);

for (const badge in libraryData.Social) {
	//console.log(Object.keys(libraryData.Social[badge][i]));
	const params = new URLSearchParams(libraryData.Social[badge]);
	//console.log(params);
	const newBadge = {
		title: Object.keys(libraryData.Social)[i],
		topText: params.get("lineOne"),
		bottomText: params.get("lineTwo"),
		topTextColour: params.get("colourOne"),
		bottomTextColour: params.get("colourTwo"),
		topColour: params.get("gradientStart"),
		bottomColour: params.get("gradientEnd"),
		icon: params.get("iconUrl"),
	};
	//console.log(newBadge);
	newBadges.push(newBadge);
	//newBadges[i].title = Object.keys(section);
	//badge[Object.keys(badge)];
	i++;
}

console.log(newBadges); */

function getKeyByValue(object, value) {
	return Object.keys(object).find((key) => object[key] === value);
}

useSeoMeta({
	title: "Badger - Library",
	ogTitle: "Badger: A badge creator for the web",
	description: "Create beautiful modern, and unique badges using Badger.",
	ogDescription: "Create beautiful modern, and unique badges using Badger.",
	ogImage: "https://badger-staging.worldwidepixel.ca/img/ogimg.png",
});
</script>

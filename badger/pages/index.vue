<script setup lang="ts">
const { $resetBus } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const baseUrl = runtimeConfig.public.apiBase;

async function urlToData(url: string) {
	let blob = await fetch(url).then((r) => r.blob());
	let dataUrl = await new Promise((resolve) => {
		let reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
	return dataUrl;
}

// INITAL DECLARATIONS

const topText = ref("Made for");
const topTextColor = ref("#FFFFFF");
const topBackgroundColor = ref("#8F004C");
const bottomText = ref("You");
const bottomTextColor = ref("#FF0066");
const bottomBackgroundColor = ref("#61003D");
const badgeIconUrl = ref("https://badger-staging.worldwidepixel.ca/badger.png");

// LOAD FROM SAVED

onMounted(() => {
	topText.value = localStorage.getItem("topText") || "Made for";
	topTextColor.value = localStorage.getItem("topTextColor") || "#FFFFFF";
	topBackgroundColor.value =
		localStorage.getItem("topBackgroundColor") || "#8F004C";
	bottomText.value = localStorage.getItem("bottomText") || "You";
	bottomTextColor.value =
		localStorage.getItem("bottomTextColor") || "#FF0066";
	bottomBackgroundColor.value =
		localStorage.getItem("bottomBackgroundColor") || "#61003D";
	badgeIconUrl.value =
		localStorage.getItem("badgeIconUrl") ||
		"https://badger-staging.worldwidepixel.ca/badger.png";
});

// LOAD FROM URL

onMounted(() => {
	topBackgroundColor.value =
		route.query.gradientStart?.toString() || "#8F004C";
	bottomBackgroundColor.value =
		route.query.gradientEnd?.toString() || "#61003D";
	topText.value = route.query.lineOne?.toString() || "Made for";
	bottomText.value = route.query.lineTwo?.toString() || "You";
	topTextColor.value =
		route.query.colorOne?.toString() ||
		route.query.colourOne?.toString() ||
		"#FFFFFF";
	bottomTextColor.value =
		route.query.colorTwo?.toString() ||
		route.query.colourTwo?.toString() ||
		"#FF0066";
	badgeIconUrl.value =
		route.query.iconUrl?.toString() ||
		"https://badger-staging.worldwidepixel.ca/badger.png";
});

// SAVE ON EDIT

watch(
	[
		topText,
		topTextColor,
		topBackgroundColor,
		bottomText,
		bottomTextColor,
		bottomBackgroundColor,
		badgeIconUrl,
	],
	(newValues) => {
		const [
			topText,
			topTextColor,
			topBackgroundColor,
			bottomText,
			bottomTextColor,
			bottomBackgroundColor,
			badgeIconUrl,
		] = newValues;
		if (process.client) {
			localStorage.topText = topText;
			localStorage.topTextColor = topTextColor;
			localStorage.topBackgroundColor = topBackgroundColor;
			localStorage.bottomText = bottomText;
			localStorage.bottomTextColor = bottomTextColor;
			localStorage.bottomBackgroundColor = bottomBackgroundColor;
			localStorage.badgeIconUrl = badgeIconUrl;
		}
	},
);

$resetBus.$on("reset", () => resetToDefault());

//watchEffect(async () => badgeIcon.value = await toBase64(badgeIconRaw.value))

async function toBase64(file: File) {
	try {
		const encoded = new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
		return await encoded;
	} catch {
		//console.log(await urlToData('/badger.png'))
		return await urlToData("/badger.png");
	}
}

async function resetToDefault() {
	topText.value = "Made for";
	topTextColor.value = "#FFFFFF";
	topBackgroundColor.value = "#8F004C";
	bottomText.value = "You";
	bottomTextColor.value = "#FF0066";
	bottomBackgroundColor.value = "#61003D";
	badgeIconUrl.value = "https://badger-staging.worldwidepixel.ca/badger.png";
}

function getEmbeddableIcon() {
	if (route.query.iconUrl != null) {
		return `${baseUrl}/cozy_minimal?gradientStart=${topBackgroundColor.value.replace("#", "")}&gradientEnd=${bottomBackgroundColor.value.replace("#", "")}&iconUrl=${badgeIconUrl.value}&format=png`;
	} else {
		return `${baseUrl}/img/ogimg.png`;
	}
}

useSeoMeta({
	title: "Badger",
	ogTitle: "Badger: A badge creator for the web",
	description: "Create beautiful modern, and unique badges using Badger.",
	ogDescription: "Create beautiful modern, and unique badges using Badger.",
	ogImage: () => `${getEmbeddableIcon()}`,
});
</script>

<template>
	<div class="dark:text-white dark:bg-slate-950 flex flex-row h-full">
		<div class="flex flex-col gap-4 grow shrink-0 p-4">
			<span class="font-bold text-3xl"> Edit </span>

			<div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">
				<span class="w-fit text-xl font-medium"> Background </span>

				<span class="w-fit flex flex-row gap-4 items-center">
					Top
					<ColorInput class="h-10" v-model="topBackgroundColor" />
				</span>

				<span class="w-fit flex flex-row gap-4 items-center">
					Bottom
					<ColorInput class="h-10" v-model="bottomBackgroundColor" />
				</span>
			</div>

			<div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">
				<span class="text-xl font-medium"> Icon </span>

				<span class="w-fit flex flex-row gap-4 items-center">
					<TextInput v-model="badgeIconUrl" />

					<!--This could come back... eventually.-->
					<!--<img class="p-1 w-10 h-10 rounded-xl border" :src="badgeIconUrl">-->
				</span>
			</div>

			<div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">
				<span class="text-xl font-medium"> Text </span>

				<span class="w-fit flex flex-col gap-2">
					Top
					<TextInput v-model="topText" />
					<ColorInput class="h-10" v-model="topTextColor" />
				</span>

				<span class="w-fit flex flex-col gap-2">
					Bottom
					<TextInput v-model="bottomText" />
					<ColorInput class="h-10" v-model="bottomTextColor" />
				</span>
			</div>
		</div>

		<div class="flex flex-col gap-4 border-l grow-0 flex-shrink-0 p-4">
			<span class="font-bold text-3xl"> View </span>

			<span class="flex flex-row gap-2">
				<img
					:src="`${baseUrl}/cozy?gradientStart=${topBackgroundColor.replace('#', '')}&gradientEnd=${bottomBackgroundColor.replace('#', '')}&lineOne=${encodeURI(topText)}&lineTwo=${encodeURI(bottomText)}&colourOne=${topTextColor.replace('#', '')}&colourTwo=${bottomTextColor.replace('#', '')}&iconUrl=${badgeIconUrl}`"
				/>

				<img
					:src="`${baseUrl}/cozy_minimal?gradientStart=${topBackgroundColor.replace('#', '')}&gradientEnd=${bottomBackgroundColor.replace('#', '')}&iconUrl=${badgeIconUrl}`"
				/>
			</span>
			<span class="flex flex-row gap-2">
				<img
					:src="`${baseUrl}/compact?gradientStart=${topBackgroundColor.replace('#', '')}&gradientEnd=${bottomBackgroundColor.replace('#', '')}&lineOne=${encodeURI(topText)}&lineTwo=${encodeURI(bottomText)}&colourOne=${topTextColor.replace('#', '')}&colourTwo=${bottomTextColor.replace('#', '')}&iconUrl=${badgeIconUrl}`"
				/>

				<img
					:src="`${baseUrl}/cozy_minimal?gradientStart=${topBackgroundColor.replace('#', '')}&gradientEnd=${bottomBackgroundColor.replace('#', '')}&iconUrl=${badgeIconUrl}`"
				/>
			</span>
		</div>
	</div>
</template>

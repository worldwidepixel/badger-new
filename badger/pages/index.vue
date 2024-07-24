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
	<div
		class="grid auto-cols-fr grid-flow-row mx-0 sm:px-[20%] md:px-0 md:grid-flow-col h-full"
	>
		<div
			class="flex flex-col gap-4 grow-0 flex-shrink-0 xl:px-4 pt-4 xl:pb-4 border-b md:border-b-none"
		>
			<span class="font-bold text-3xl xl:px-0 px-4"> Edit </span>

			<div
				class="flex flex-col xl:flex-row xl:flex-wrap xl:gap-4 xl:w-auto w-full"
			>
				<div
					class="h-fit flex flex-col gap-2 p-4 xl:rounded-3xl xl:border border-y xl:w-auto w-full"
				>
					<span class="w-fit text-xl font-medium"> Background </span>

					<span class="w-fit flex flex-row gap-2 items-center">
						Top
						<ColorInput class="h-10" v-model="topBackgroundColor" />
					</span>

					<span class="w-fit flex flex-row gap-2 items-center">
						Bottom
						<ColorInput
							class="h-10"
							v-model="bottomBackgroundColor"
						/>
					</span>
				</div>

				<div
					class="h-fit flex flex-col gap-2 p-4 xl:rounded-3xl xl:border border-b xl:w-auto w-full"
				>
					<span class="text-xl font-medium"> Icon </span>

					<span class="w-fit flex flex-row gap-4 items-center">
						<TextInput v-model="badgeIconUrl" />

						<!--This could come back... eventually.-->
						<NuxtImg
							class="p-1 w-10 h-10 rounded-xl border"
							placeholder="/badger.png"
							:src="badgeIconUrl"
						/>
					</span>
				</div>

				<div
					class="h-fit flex flex-col gap-2 p-4 xl:rounded-3xl xl:border xl:w-auto w-full"
				>
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
		</div>
		<div
			class="h-full lg:col-span-2 border-l-none md:border-l lg:grid lg:auto-cols-fr lg:grid-flow-col"
		>
			<div
				class="flex flex-col gap-4 grow-0 flex-shrink-0 p-4 border-b lg:border-b-none"
			>
				<span class="font-bold text-3xl"> View </span>

				<span class="flex flex-row gap-2">
					<Badge
						type="cozy"
						:topText="encodeURI(topText)"
						:bottomText="encodeURI(bottomText)"
						:topTextColour="topTextColor.replace('#', '')"
						:bottomTextColour="bottomTextColor.replace('#', '')"
						:topColour="topBackgroundColor.replace('#', '')"
						:bottomColour="bottomBackgroundColor.replace('#', '')"
						:iconUrl="encodeURI(badgeIconUrl)"
						:version="3"
					/>

					<Badge
						type="cozy_minimal"
						:topText="encodeURI(topText)"
						:bottomText="encodeURI(bottomText)"
						:topTextColour="topTextColor.replace('#', '')"
						:bottomTextColour="bottomTextColor.replace('#', '')"
						:topColour="topBackgroundColor.replace('#', '')"
						:bottomColour="bottomBackgroundColor.replace('#', '')"
						:iconUrl="encodeURI(badgeIconUrl)"
						:version="3"
					/>
				</span>
				<span class="flex flex-row gap-2">
					<Badge
						type="compact"
						:topText="encodeURI(topText)"
						:bottomText="encodeURI(bottomText)"
						:topTextColour="topTextColor.replace('#', '')"
						:bottomTextColour="bottomTextColor.replace('#', '')"
						:topColour="topBackgroundColor.replace('#', '')"
						:bottomColour="bottomBackgroundColor.replace('#', '')"
						:iconUrl="encodeURI(badgeIconUrl)"
						:version="3"
					/>
					<Badge
						type="compact_minimal"
						:topText="encodeURI(topText)"
						:bottomText="encodeURI(bottomText)"
						:topTextColour="topTextColor.replace('#', '')"
						:bottomTextColour="bottomTextColor.replace('#', '')"
						:topColour="topBackgroundColor.replace('#', '')"
						:bottomColour="bottomBackgroundColor.replace('#', '')"
						:iconUrl="encodeURI(badgeIconUrl)"
						:version="3"
					/>
				</span>
			</div>
			<div
				class="flex flex-col gap-4 lg:border-l grow-0 flex-shrink-0 p-4"
			>
				<span class="font-bold text-3xl"> Export </span>
				Coming soon!
			</div>
		</div>
	</div>
</template>

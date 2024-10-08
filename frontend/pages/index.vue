<script setup lang="ts">
import { prominent } from "color.js";
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

// INITIAL DECLARATIONS

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
	topBackgroundColor.value = localStorage.getItem("topBackgroundColor") || "#8F004C";
	bottomText.value = localStorage.getItem("bottomText") || "You";
	bottomTextColor.value = localStorage.getItem("bottomTextColor") || "#FF0066";
	bottomBackgroundColor.value = localStorage.getItem("bottomBackgroundColor") || "#61003D";
	badgeIconUrl.value = localStorage.getItem("badgeIconUrl") || "https://badger-staging.worldwidepixel.ca/badger.png";
});

// LOAD FROM URL

onMounted(() => {
	topBackgroundColor.value = route.query.gradientStart?.toString() || "#8F004C";
	bottomBackgroundColor.value = route.query.gradientEnd?.toString() || "#61003D";
	topText.value = route.query.lineOne?.toString() || "Made for";
	bottomText.value = route.query.lineTwo?.toString() || "You";
	topTextColor.value = route.query.colorOne?.toString() || route.query.colourOne?.toString() || "#FFFFFF";
	bottomTextColor.value = route.query.colorTwo?.toString() || route.query.colourTwo?.toString() || "#FF0066";
	badgeIconUrl.value = route.query.iconUrl?.toString() || "https://badger-staging.worldwidepixel.ca/badger.png";
});

// SAVE ON EDIT

watch(
	[topText, topTextColor, topBackgroundColor, bottomText, bottomTextColor, bottomBackgroundColor, badgeIconUrl],
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

const iconColors = ref(["#000000", "#000000", "#000000", "#000000"]);

async function updateIconColors() {
	const colors = await prominent(badgeIconUrl.value, { format: "hex", amount: 4, group: 50 });
	iconColors.value = [colors[0].toString(), colors[1].toString(), colors[2].toString(), colors[3].toString()];
}

useSeoMeta({
	title: "Home",
	ogTitle: "Badger: A badge creator for the web",
	description: "Create beautiful, modern, and unique badges using Badger.",
	ogDescription: "Create beautiful, modern, and unique badges using Badger.",
	ogImage: () => `${getEmbeddableIcon()}`,
});
</script>

<template>
	<div class="flex w-full flex-col md:flex-row">
		<div class="flex w-full flex-col gap-4 p-6 pl-0 md:border-r md:pb-6">
			<span class="text-3xl font-bold">Edit</span>

			<div class="grid grid-flow-row gap-4 border-t pt-4">
				<div class="border-b">
					<span class="w-fit text-xl font-medium">Background</span>

					<div class="grid grid-cols-2 grid-rows-2 items-center gap-2 pb-6">
						<span class="h-10 content-center">Top</span>
						<ColorInput class="h-10 justify-self-end" v-model="topBackgroundColor" />

						<span class="h-10 content-center">Bottom</span>
						<ColorInput class="h-10 justify-self-end" v-model="bottomBackgroundColor" />
					</div>
				</div>

				<div class="border-b">
					<span class="w-fit text-xl font-medium">Icon</span>

					<div class="flex flex-col items-center gap-2 py-6">
						<TextInput v-model="badgeIconUrl" class="w-full" />
						<div class="flex w-full justify-center rounded-xl border">
							<span class="w-[50%] p-8">
								<img
									class="w-[100%] rounded-xl"
									placeholder="/badger.png"
									@load="updateIconColors()"
									:src="badgeIconUrl" />
							</span>
							<div class="grid w-[50%] grid-cols-2 grid-rows-2 divide-x">
								<div
									:style="'background-color:' + iconColors[0]"
									class="h-full w-full border-b border-l"></div>
								<div
									:style="'background-color:' + iconColors[1]"
									class="h-full w-full rounded-tr-[0.7rem] border-b"></div>
								<div :style="'background-color:' + iconColors[2]" class="h-full w-full"></div>
								<div
									:style="'background-color:' + iconColors[3]"
									class="h-full w-full rounded-br-[0.7rem]"></div>
							</div>
						</div>
						<span class="flex flex-row flex-wrap items-center justify-center gap-1 text-center text-sm">
							If you're looking for icons to use, check out
							<ExternalLink class="text-sm" to="https://simpleicons.org">simpleicons.org</ExternalLink>
							and <ExternalLink class="text-sm" to="https://lucide.dev">Lucide</ExternalLink>
						</span>
					</div>
				</div>

				<div class="border-b md:border-b-transparent">
					<span class="w-fit text-xl font-medium">Text</span>

					<div class="flex items-center gap-2 pt-6">
						<TextInput v-model="topText" class="w-full" />
						<ColorInput class="h-10 justify-self-end" v-model="topTextColor" />
					</div>

					<div class="flex items-center gap-2 pb-6 pt-2 md:pb-0">
						<TextInput v-model="bottomText" class="w-full" />
						<ColorInput class="h-10 justify-self-end" v-model="bottomTextColor" />
					</div>
				</div>
			</div>
		</div>

		<div class="flex w-full flex-col gap-4 p-6 pr-0">
			<span class="text-3xl font-bold">View</span>

			<div
				class="grid grid-cols-1 grid-rows-4 items-center gap-4 border-b border-t py-11 sm:grid-cols-2 sm:grid-rows-2">
				<div
					class="flex flex-col place-items-center gap-4"
					v-for="type in ['cozy', 'compact', 'cozy_minimal', 'compact_minimal']">
					<Badge
						v-tooltip="{
							content: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ') + ' Badge',
							theme: 'badger-ui',
						}"
						:type="type"
						:topText="encodeURI(topText)"
						:bottomText="encodeURI(bottomText)"
						:topTextColour="topTextColor.replace('#', '')"
						:bottomTextColour="bottomTextColor.replace('#', '')"
						:topColour="topBackgroundColor.replace('#', '')"
						:bottomColour="bottomBackgroundColor.replace('#', '')"
						:iconUrl="encodeURI(badgeIconUrl)"
						:version="3" />

					<BadgeDownload
						:type="type"
						:topText="encodeURI(topText)"
						:bottomText="encodeURI(bottomText)"
						:topTextColour="topTextColor.replace('#', '')"
						:bottomTextColour="bottomTextColor.replace('#', '')"
						:topColour="topBackgroundColor.replace('#', '')"
						:bottomColour="bottomBackgroundColor.replace('#', '')"
						:iconUrl="encodeURI(badgeIconUrl)"
						:version="3" />
				</div>
			</div>
			<span class="text-3xl font-bold">Export</span>
		</div>
	</div>
</template>

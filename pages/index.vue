<script setup lang="ts">
const { $resetBus } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()

//const defaultIcon = await urlToData('/badger.png')

async function urlToData(url: string) {
    let blob = await fetch(url).then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
	return dataUrl
};

const topText = ref('Made for')
const topTextColor = ref('#FFFFFF')
const topBackgroundColor = ref('#8F004C')
const bottomText = ref('You')
const bottomTextColor = ref('#FF0066')
const bottomBackgroundColor = ref('#61003D')
//const badgeIconRaw = ref()
const badgeIconUrl = ref('https://badger-staging.worldwidepixel.ca/badger.png')

$resetBus.$on('reset', () => resetToDefault())

//watchEffect(async () => badgeIcon.value = await toBase64(badgeIconRaw.value))

async function toBase64(file: File) {
try {
  const encoded = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  })
  return await encoded
} catch {
	//console.log(await urlToData('/badger.png'))
	return await urlToData('/badger.png')
}
}

async function resetToDefault() {
	topText.value = "Made for"
	topTextColor.value = "#FFFFFF"
	topBackgroundColor.value = "#8F004C"
	bottomText.value = "You"
	bottomTextColor.value = "#FF0066"
	bottomBackgroundColor.value = "#61003D"
	badgeIconUrl.value = 'https://badger-staging.worldwidepixel.ca/badger.png'
}

useSeoMeta({
	title: "Badger",
	ogTitle: "Badger: A badge creator for the web",
	description: "Create beautiful modern, and unique badges using Badger.",
	ogDescription: "Create beautiful modern, and unique badges using Badger.",
	ogImage: "https://badger.worldwidepixel.ca/img/ogimg.png"
})

</script>

<template>

	<div class="dark:text-white dark:bg-slate-950 flex flex-row h-full">

		<div class="flex flex-col gap-4 grow shrink-0 p-4">

			<span class="font-bold text-3xl"> Edit </span>

			<div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">

				<span class="w-fit text-xl font-medium"> Background </span>

				<span class="w-fit flex flex-row gap-4 items-center"> Top
					<ColorInput class="h-10" v-model="topBackgroundColor" />
				</span>

				<span class="w-fit flex flex-row gap-4 items-center"> Bottom
					<ColorInput class="h-10" v-model="bottomBackgroundColor" />
				</span>

			</div>

			<div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">

				<span class="text-xl font-medium"> Icon </span>

				<TextInput v-model="badgeIconUrl" />

			</div>

			<div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">

				<span class="text-xl font-medium"> Text </span>

				<span class="w-fit flex flex-col gap-2"> Top
					<TextInput v-model="topText" />
					<ColorInput class="h-10" v-model="topTextColor" />
				</span>

				<span class="w-fit flex flex-col gap-2"> Bottom
					<TextInput v-model="bottomText" />
					<ColorInput class="h-10" v-model="bottomTextColor" />
				</span>

			</div>

		</div>

		<div class="flex flex-col gap-4 border-l grow-0 shrink flex-shrink-0 p-4">

			<span class="font-bold text-3xl"> View </span>

			<span class="flex flex-row gap-2">

				<img
					:src="`https://badger-staging.worldwidepixel.ca/cozy?gradientStart=${topBackgroundColor.replace('#', '')}&gradientEnd=${bottomBackgroundColor.replace('#', '')}&lineOne=${encodeURI(topText)}&lineTwo=${encodeURI(bottomText)}&colourOne=${topTextColor.replace('#', '')}&colourTwo=${bottomTextColor.replace('#', '')}&iconUrl=${badgeIconUrl}`">

				<img
					:src="`https://badger-staging.worldwidepixel.ca/cozy_minimal?gradientStart=8f004c&gradientEnd=61003d&iconUrl=https://badger.worldwidepixel.ca/img/badger.png`">

			</span>

		</div>

	</div>

</template>

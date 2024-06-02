<script setup>

const runtimeConfig = useRuntimeConfig()

const topText = ref('Made for')
const topTextColor = ref('#FFFFFF')
const topBackgroundColor = ref('#8F004C')
const bottomText = ref('You')
const bottomTextColor = ref('#FF0066')
const bottomBackgroundColor = ref('#61003D')

function test() {
	//console.log(cozySvgBuilder.value)

	//setTimeout(test, 2000);
}

test();

</script>

<template>

	<div class="flex flex-row h-full">

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

				<!--<ColorInput class="h-10" default-color="#8F004C" /> (placeholder)-->

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
					:src="`https://badger-staging.worldwidepixel.ca/cozy?gradientStart=${topBackgroundColor.replace('#','')}&gradientEnd=${bottomBackgroundColor.replace('#','')}&lineOne=${encodeURI(topText)}&lineTwo=${encodeURI(bottomText)}&colourOne=${topTextColor.replace('#','')}&colourTwo=${bottomTextColor.replace('#','')}&iconUrl=https://badger.worldwidepixel.ca/img/badger.png`">

				<img
					:src="`https://badger-staging.worldwidepixel.ca/cozy_minimal?gradientStart=8f004c&gradientEnd=61003d&iconUrl=https://badger.worldwidepixel.ca/img/badger.png`">

			</span>

		</div>

	</div>

</template>

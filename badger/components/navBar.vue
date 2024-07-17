<template>
	<nav class="border-b p-4 flex flex-row gap-4 justify-between items-center">
		<NuxtLink to="/">
			<span class="flex flex-row gap-2 items-center text-xl select-none">
				<LogoType />
				<span class="font-[100] text-sm"> v2.0-dev </span>
			</span>
		</NuxtLink>

		<div class="flex-row gap-[1.5rem] items-center flex pr-2">
			<LucideRotateCcw
				class="cursor-pointer"
				@click="defaultSetup"
				v-if="isHome() === true"
			/>

			<NuxtLink to="/library"> <LucideLibrary /> </NuxtLink>

			<!--<NuxtLink to="/test">
				<LucideTestTube />
			</NuxtLink>-->

			<LucideMonitor
				v-if="colorMode.preference === 'system'"
				class="cursor-pointer"
				@click="changeColorMode"
			/>
			<LucideSun
				v-else-if="colorMode.preference === 'light'"
				class="cursor-pointer"
				@click="changeColorMode"
			/>
			<LucideMoon
				v-else-if="colorMode.preference === 'dark'"
				class="cursor-pointer"
				@click="changeColorMode"
			/>

			<a href="https://github.com/worldwidepixel/badger">
				<LucideGithub />
			</a>
		</div>
	</nav>
</template>

<script setup>
const route = useRoute();
const colorMode = useColorMode();
//import mitt from 'mitt';
//const emitter = mitt();
const { $resetBus } = useNuxtApp();

function changeColorMode() {
	switch (colorMode.preference) {
		case "system":
			colorMode.preference = "dark";
			break;
		case "dark":
			colorMode.preference = "light";
			break;
		case "light":
			colorMode.preference = "system";
			break;
	}
}

function defaultSetup() {
	if (isHome()) {
		$resetBus.$emit("reset");
	}
}

function isHome() {
	if (route.path === "/") {
		return true;
	} else {
		return false;
	}
}
</script>

<template>
	<header>
		<nav class="flex w-auto justify-center border-b p-5">
			<div class="flex w-full max-w-[80rem] flex-row items-center justify-evenly sm:justify-between">
				<NuxtLink to="/" class="flex items-center gap-4">
					<LogoType />
					<span class="hidden text-sm font-[100] sm:block"> v2.0.0-dev</span>
				</NuxtLink>

				<ul class="flex items-center gap-6">
					<li>
						<LucideRotateCcw class="cursor-pointer" @click="defaultSetup" v-if="isHome() === true" />
					</li>

					<li>
						<NuxtLink to="/library"> <LucideLibrary /> </NuxtLink>
					</li>

					<li>
						<LucideSun
							v-if="colorMode.preference === 'dark' || colorMode.preference == 'system'"
							class="cursor-pointer"
							@click="changeColorMode" />
						<LucideMoon
							v-else-if="colorMode.preference === 'light'"
							class="cursor-pointer"
							@click="changeColorMode" />
					</li>

					<li>
						<a href="https://github.com/worldwidepixel/badger">
							<LucideGithub />
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>
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
			colorMode.preference = "dark";
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

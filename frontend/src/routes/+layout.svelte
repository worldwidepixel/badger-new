<script lang="ts">
	import LogoType from '$lib/ui/+LogoType.svelte';
	import Button from '$lib/ui/+Button.svelte';
	import { LucideSunMoon } from '@lucide/svelte';
	import '../app.css';
	import '@fontsource-variable/inter';
	import { browser } from '$app/environment';
	import type { DeploymentInfo } from '$lib/types';
	import { appDimensions, pageDimensions } from '$lib/state.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		data: DeploymentInfo;
	}

	let { children, data }: Props = $props();

	let theme = refreshTheme(); // Load user theme

	function refreshTheme() {
		if (browser) {
			document.documentElement.classList.toggle(
				'dark',
				localStorage.theme === 'dark' ||
					(!('theme' in localStorage) &&
						window.matchMedia('(prefers-color-scheme: dark)').matches)
			);
			return localStorage.theme;
		}
		return 'light';
	}

	function setTheme(nextTheme: string) {
		theme = nextTheme;
		if (browser) {
			localStorage.theme = nextTheme;
		}
		refreshTheme();
	}

	function toggleTheme() {
		if (theme === 'light') {
			setTheme('dark');
			return;
		}
		setTheme('light');
	}
</script>

<svelte:window bind:innerWidth={pageDimensions.width} bind:innerHeight={pageDimensions.height} />
<svelte:body bind:offsetHeight={pageDimensions.contentHeight} />

<div class="flex h-full flex-col">
	<nav class="flex w-auto justify-center border-b p-5">
		<div class="grid w-full max-w-[80rem] grid-cols-3 flex-row items-center">
			<div class="flex flex-row items-center justify-start">
				<a aria-label="Badger home" class="w-fit" href="/">
					<span class="flex select-none flex-row items-center gap-2 text-xl">
						<LogoType />
					</span>
				</a>
			</div>
			<div class="flex flex-row items-center justify-center">
				badger 3: echoes of the prequel
			</div>
			<div class="flex flex-row items-center justify-end">
				<Button
					action={toggleTheme}
					style="transparent"
					roundness="circle"
					type="action"
					label="Toggle light/dark mode"
				>
					<LucideSunMoon />
				</Button>
			</div>
		</div>
	</nav>
	<main
		bind:clientWidth={appDimensions.width}
		bind:clientHeight={appDimensions.height}
		class="relative flex w-full flex-1 flex-col items-center px-6"
	>
		<div class="h-full w-full max-w-[80rem]">
			{@render children?.()}
		</div>
	</main>
	<footer
		class="bg-badger-background-secondary flex flex-col justify-center gap-6 border-t p-4 py-8 text-sm sm:flex-row sm:items-center"
	>
		<div class="mt-[-1.25rem] flex flex-col items-center gap-1 sm:items-start">
			<a href="/">
				<span class="flex select-none flex-row items-center gap-2 text-xl">
					<LogoType />
				</span>
			</a>
			<a
				class="underline"
				target="_blank"
				href="https://github.com/worldwidepixel/badger/commit/{data.deployment_branch}"
				aria-label="Badger on GitHub"
			>
				{data.deployment_branch}@{data.deployment_hash.substring(0, 7)}
			</a>
		</div>
		<div class="flex flex-col items-center gap-1 sm:items-start">
			<span
				class="decoration-badger-red text-badger-text-primary text-lg font-bold underline decoration-wavy"
				>About</span
			>
			Badger is a badge creator for the web.
			<a
				target="_blank"
				href="https://worldwidepixel.ca"
				aria-label="WorldWidePixel's website"
			>
				Created by WorldWidePixel.
			</a>
		</div>
	</footer>
</div>

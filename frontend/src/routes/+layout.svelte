<script lang="ts">
	import LogoType from '$lib/ui/+LogoType.svelte';
	import '../app.css';
	import '@fontsource-variable/inter';

	let { children } = $props();
</script>

<div class="flex h-full flex-col">
	<nav class="flex w-auto justify-center border-b p-5">
		<div
			class="flex w-full max-w-[80rem] flex-row items-center justify-evenly sm:justify-between"
		>
			<a href="/">
				<span class="flex select-none flex-row items-center gap-2 text-xl">
					<LogoType />
				</span>
			</a>
			badger 3: echoes of the prequel
		</div>
	</nav>
	<main class="relative flex w-full flex-1 flex-col items-center px-6">
		<div class="w-full max-w-[80rem]">
			{@render children()}
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
				href="https://github.com/worldwidepixel/badger-new"
			>
				Badger is open-source.
			</a>
		</div>
		<div class="flex flex-col items-center gap-1 sm:items-start">
			<span class="decoration-badger-red text-lg font-bold underline decoration-wavy"
				>About</span
			>
			Badger is a badge creator for the web.
			<a target="_blank" href="https://worldwidepixel.ca"> Created by WorldWidePixel. </a>
		</div>
	</footer>
</div>

<script lang="ts">
	import { appDimensions, pageDimensions } from '$lib/state.svelte';
	import type { Badge } from '@badgered/common';
	import { defaultBadge, V2BadgeVariants } from '@badgered/common';
	import ColourInput from '$lib/ui/+ColourInput.svelte';
	import TextInput from '$lib/ui/+TextInput.svelte';
	import UIBadge from '$lib/ui/+Badge.svelte';
	import BadgeOptions from '$lib/ui/+BadgeOptions.svelte';
	import ColorThief, { type RGBColor } from 'colorthief';
	import { browser } from '$app/environment';
	import { defaultIcon, rgbToHex } from '$lib';
	import type { HexColour } from '$lib/types';
	import { LucidePipette } from '@lucide/svelte';

	console.log(
		'If you see any GET errors here involving images, think "TypeError: Failed to fetch", it\'s just a result of how image fetching is handled. Have no fear.'
	);

	const tallestHeight = $derived(Math.max(pageDimensions.height, pageDimensions.contentHeight));

	const appHeight = $derived(
		Math.max(pageDimensions.height - (tallestHeight - appDimensions.height), 0)
	);

	let badgeState = $state<Badge>(defaultBadge);
	let badgePalette = $state<HexColour[]>([]);
	let badgeIconValid = $state<boolean>(true);

	if (browser) {
		const colorThief = new ColorThief();
		function setColourPallete() {
			try {
				badgePalette.length = 0;
				const image = new Image();
				image.crossOrigin = 'anonymous';
				image.src =
					badgeState.icon !== ''
						? badgeState.icon
						: 'https://v2.badger.worldwidepixel.ca/badger.png';
				image.onerror = image.onabort = () => {
					badgeIconValid = false;
				};
				image.onload = () => {
					badgeIconValid = true;
					const palette = colorThief.getPalette(image);
					palette.map((value) => {
						badgePalette.push(rgbToHex(...value));
					});
				};
			} catch (e) {
				console.log('hi');
			}
		}

		$effect(() => {
			setColourPallete();
			badgePalette;
		});
	}
</script>

<div class="grid h-full w-full grid-cols-2">
	<div
		style="max-height: {appHeight}px"
		class="flex flex-col gap-4 overflow-y-auto border-r py-6 pr-6"
	>
		<h1>Edit</h1>
		<hr />
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<h3>Background</h3>
				<div class="grid grid-cols-[1fr_16rem] items-center gap-2">
					<span class="w-fit">Top</span>
					<ColourInput
						label="Background top colour"
						bind:value={badgeState.topBackgroundColour}
					/>
					<span class="w-fit">Bottom</span>
					<ColourInput
						label="Background bottom colour"
						bind:value={badgeState.bottomBackgroundColour}
					/>
				</div>
			</div>
			<hr />
			<div class="flex flex-col gap-2">
				<h3>Icon</h3>
				<div class="flex flex-col items-center gap-4">
					<div class="grid w-full grid-cols-[1fr_16rem] items-center gap-2">
						<span class="w-fit">URL</span>
						<TextInput
							placeholder="Icon URL"
							label="Icon URL"
							bind:value={badgeState.icon}
							className="w-full"
						/>
					</div>
					<div class="flex w-full flex-row items-center gap-4 rounded-xl border p-4">
						<img
							draggable="false"
							alt="User-selected badge icon"
							class="size-40"
							src={badgeIconValid ? badgeState.icon : defaultIcon}
						/>
						<span class="bg-badger-border h-full w-[1px]"></span>
						<div class="flex w-full flex-col gap-2">
							<h3 class="text-center">Suggested Colours</h3>
							<div
								class="flex max-h-40 w-full flex-row flex-wrap justify-center gap-4 overflow-y-scroll px-4 py-2"
							>
								{#each badgePalette as colour}
									<span
										class="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border"
									>
										<LucidePipette
											class="group-active:bg-badger-background-secondary/90 bg-badger-background-secondary pointer-events-none size-10 scale-90 overflow-visible rounded-full border p-2.5 opacity-0 shadow transition group-hover:scale-100 group-hover:opacity-100 group-active:scale-95"
										/>
										<span
											class="absolute left-0 top-0 z-[-100] h-full w-full transition group-hover:brightness-90"
											style="background-color: {colour}"
										></span>
									</span>
								{/each}
								{#if badgePalette.length === 0}
									<span
										class="flex h-full w-full items-center justify-center text-center"
										>Please provide a valid image URL.</span
									>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<div class="flex flex-col gap-2">
				<h3>Text</h3>
				<div class="grid grid-cols-[1fr_16rem] items-center gap-2">
					<TextInput
						placeholder="Top: Type anything here"
						label="Bottom line text"
						bind:value={badgeState.topText}
						className="w-full"
					/>
					<ColourInput
						label="Top line text colour"
						bind:value={badgeState.topTextColour}
					/>
					<TextInput
						placeholder="Bottom: Type anything here"
						label="Bottom line text"
						bind:value={badgeState.bottomText}
						className="w-full"
					/>
					<ColourInput
						label="Bottom line text colour"
						bind:value={badgeState.bottomTextColour}
					/>
				</div>
			</div>
		</div>
	</div>
	<div style="max-height: {appHeight}px" class="flex flex-col gap-4 overflow-y-auto p-6">
		<h1>Preview</h1>
		<hr />
		<div class="my-4 grid w-full grid-cols-2 items-center gap-6">
			{#each V2BadgeVariants as type}
				<span
					class="flex h-fit flex-col items-center justify-center gap-4 justify-self-center"
				>
					<UIBadge data={badgeState} {type} label="{type} badge" />
					<BadgeOptions data={badgeState} {type} label="{type} badge" />
				</span>
			{/each}
		</div>
		<h1>Export</h1>
		<hr />
		export options for all badges will go here (think a ZIP file of all of them)
	</div>
</div>

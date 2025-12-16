<script lang="ts">
	import { appDimensions, pageDimensions, badgeState } from '$lib/state.svelte';
	import {
		defaultIcon,
		V2BadgeVariants,
		sanitiseText,
		build,
		type BadgeExportType,
		badgeExportTypes,
		defaultBadge,
		type Badge
	} from '@badgered/common';
	import ColourInput from '$lib/ui/+ColourInput.svelte';
	import TextInput from '$lib/ui/+TextInput.svelte';
	import UIBadge from '$lib/ui/+Badge.svelte';
	import BadgeOptions from '$lib/ui/+BadgeOptions.svelte';
	import ColorThief from 'colorthief';
	import { browser } from '$app/environment';
	import {
		createBlob,
		generatePalette,
		getCurrentLocale,
		rgbToHex,
		setCurrentLocale,
		uploadToHost
	} from '$lib';
	import type { BadgerParameters, HexColour } from '$lib/types';
	import {
		LucideArrowUpRight,
		LucideEye,
		LucideGlobe,
		LucideImage,
		LucideImageDown,
		LucidePaintbrush,
		LucidePen,
		LucidePenTool,
		LucidePipette,
		LucideText,
		LucideUpload
	} from '@lucide/svelte';
	import Button from '$lib/ui/+Button.svelte';
	import Tooltip from 'sv-tooltip';
	import { m } from '$lib/paraglide/messages';
	import JSZip from 'jszip';
	import fileSaver from 'file-saver';
	const saveAs = fileSaver;

	interface Props {
		data: BadgerParameters;
	}
	let { data }: Props = $props();

	console.log(
		'If you see any GET errors here involving images, think "TypeError: Failed to fetch", it\'s just a result of how image fetching is handled. Have no fear.'
	);

	// Parameter-based data loading
	for (const [key, value] of Object.entries(data.editorParameters)) {
		if (Object.keys(defaultBadge).includes(key)) {
			badgeState[key as keyof Badge] = value;
		}
	}

	// Application scaling

	const tallestHeight = $derived(Math.max(pageDimensions.height, pageDimensions.contentHeight));

	const appHeight = $derived(
		Math.max(pageDimensions.height - (tallestHeight - appDimensions.height), 0)
	);

	// Icon-based colour palettes

	let badgePalette = $state<HexColour[]>([]);
	let badgeIconValid = $state<boolean>(true);
	let badgeIconUpload = $state<FileList>();

	if (browser) {
		const colorThief = new ColorThief();
		function setColourPallete() {
			if (!URL.canParse(badgeState.icon)) {
				badgeIconValid = false;
				return;
			}
			try {
				badgePalette.length = 0;
				const image = new Image();
				image.crossOrigin = 'anonymous';
				image.src = badgeState.icon !== '' ? badgeState.icon : defaultIcon;
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
				console.log('Failed to parse image for colour palette.', e);
			}
		}

		$effect(() => {
			setColourPallete();
			badgePalette;
		});
	}

	function generateBackground(input: HexColour) {
		const colours = generatePalette(input);
		badgeState.topBackgroundColour = colours.top;
		badgeState.bottomBackgroundColour = colours.bottom;
		badgeState.bottomTextColour = colours.text;
	}

	// Remotely-hosted icons

	async function submitIconUpload(event: Event) {
		if (badgeIconUpload != null && badgeIconUpload[0] != null) {
			const uploadData = await uploadToHost(badgeIconUpload[0]);
			badgeState.icon = uploadData;
		}
	}

	// ZIP Downloads

	async function generateZip(fileType: BadgeExportType) {
		const container = new JSZip();
		for (const type of V2BadgeVariants) {
			const badgeData = await build(type, badgeState);
			const blob = createBlob(fileType.mime, badgeData);
			container.file(`${type}.${fileType.extension}`, blob);
		}

		container.generateAsync({ type: 'blob' }).then((content) => {
			saveAs(
				content,
				`badger_${badgeState.topText.replaceAll(' ', '_')}_${badgeState.bottomText.replaceAll(' ', '_')}_${fileType.extension}`
			);
		});
	}
</script>

<div class="grid h-full w-full grid-cols-2">
	<div
		style="max-height: {appHeight}px"
		class="flex flex-col gap-4 overflow-y-auto border-r py-6 pr-6"
	>
		<h1><LucidePen />{m['text.editor.edit.header']()}</h1>
		<hr />
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<h3><LucideText /> {m['text.editor.edit.text.header']()}</h3>
				<div class="grid grid-cols-[1fr_16rem] items-center gap-2">
					<TextInput
						placeholder={m['placeholder.editor.edit.text.top']()}
						label={m['label.editor.edit.text.content.top']()}
						bind:value={badgeState.topText}
						className="w-full"
					/>
					<ColourInput
						label={m['label.editor.edit.text.colour.top']()}
						bind:value={badgeState.topTextColour}
					/>
					<TextInput
						placeholder={m['placeholder.editor.edit.text.bottom']()}
						label={m['label.editor.edit.text.content.bottom']()}
						bind:value={badgeState.bottomText}
						className="w-full"
					/>
					<ColourInput
						label={m['label.editor.edit.text.colour.bottom']()}
						bind:value={badgeState.bottomTextColour}
					/>
				</div>
			</div>
			<hr />
			<div class="flex flex-col gap-2">
				<h3><LucideImage /> {m['text.editor.edit.icon.header']()}</h3>
				<div class="flex flex-col items-center gap-4">
					<div class="grid w-full grid-cols-[1fr__2.5rem_16rem] items-center gap-2">
						<span class="w-fit">{m['text.editor.edit.icon.url']()}</span>

						<Tooltip badger tip={m['label.editor.edit.icon.upload']()}>
							<span class="relative h-10 w-fit">
								<input
									onchange={submitIconUpload}
									class="peer absolute top-0 left-0 z-[-1] size-10 appearance-none opacity-0"
									id="file-input"
									name="file-input"
									type="file"
									accept="image/*"
									bind:files={badgeIconUpload}
								/>
								<div class="rounded-xl peer-focus-visible:outline">
									<label class="size-10" for="file-input">
										<Button
											className="size-10"
											label={m['label.editor.edit.icon.upload']()}
										>
											<LucideUpload />
										</Button></label
									>
								</div>
							</span>
						</Tooltip>

						<TextInput
							placeholder={m['label.editor.edit.icon.url']()}
							label={m['label.editor.edit.icon.url']()}
							bind:value={badgeState.icon}
							className="w-full"
						/>
					</div>
					<div
						class="bg-badger-background-secondary flex w-full flex-row items-center gap-4 rounded-xl border p-4"
					>
						<div class="flex shrink-0 flex-col gap-2">
							<span class="text-center font-semibold"
								>{m['text.editor.edit.icon.preview']()}</span
							>
							<img
								draggable="false"
								alt={m['label.editor.edit.icon.preview']()}
								class="aspect-square size-35 rounded-2xl p-2"
								src={badgeIconValid ? sanitiseText(badgeState.icon) : defaultIcon}
							/>
						</div>
						<span class="bg-badger-border h-full w-[1px]"></span>
						<div class="flex w-full flex-col gap-2">
							<span class="text-center font-semibold"
								>{m['text.editor.edit.icon.suggested']()}</span
							>
							<div
								class="flex h-35 w-full flex-row flex-wrap justify-center gap-2 overflow-y-scroll px-4 py-4"
							>
								{#each badgePalette as colour}
									<button
										onkeypress={(key) =>
											key.key.toLowerCase() === 'enter' || 'space'
												? generateBackground(colour)
												: {}}
										aria-label={m['label.editor.edit.icon.suggested']({
											colour: colour
										})}
										class="group relative flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border"
									>
										<LucidePipette
											onclick={() => generateBackground(colour)}
											class="group-active:bg-badger-background-secondary/90 group-focus-visible:bg-badger-background-secondary/90 bg-badger-background-secondary/60 relative z-1 size-10 scale-90 overflow-visible rounded-[0.8rem] border p-2.5 opacity-0 shadow backdrop-saturate-150 transition group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:scale-95"
										/>
										<span
											class="absolute top-0 left-0 z-0 h-full w-full transition group-hover:brightness-90"
											style="background-color: {colour}"
										></span>
									</button>
								{/each}
								{#if badgePalette.length === 0}
									<span
										class="flex h-full w-full items-center justify-center text-center"
										>{m['text.editor.edit.icon.invalid']()}</span
									>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>

			<hr />
			<div class="flex flex-col gap-2">
				<h3><LucidePaintbrush /> {m['text.editor.edit.background']()}</h3>
				<div class="grid grid-cols-[1fr_16rem] items-center gap-2">
					<span class="w-fit">{m['text.editor.edit.background.top']()}</span>
					<ColourInput
						label={m['label.editor.edit.background.top']()}
						bind:value={badgeState.topBackgroundColour}
					/>
					<span class="w-fit">{m['text.editor.edit.background.bottom']()}</span>
					<ColourInput
						label={m['label.editor.edit.background.bottom']()}
						bind:value={badgeState.bottomBackgroundColour}
					/>
				</div>
			</div>
		</div>
	</div>
	<div style="max-height: {appHeight}px" class="flex flex-col gap-4 overflow-y-auto p-6">
		<h1><LucideEye /> {m['text.editor.preview.header']()}</h1>
		<hr />
		<div class="my-4 grid w-full grid-cols-2 items-center gap-6">
			{#each V2BadgeVariants as type}
				<span
					class="flex h-fit flex-col items-center justify-center gap-4 justify-self-center"
				>
					<UIBadge
						data={badgeState}
						{type}
						label={m['label.editor.preview.badge']({
							//@ts-ignore
							type: m[`text.badge.type.${type}`]()
						})}
					/>
					<BadgeOptions
						data={badgeState}
						{type}
						label={m['label.editor.preview.badge']({
							//@ts-ignore
							type: m[`text.badge.type.${type}`]()
						})}
					/>
				</span>
			{/each}
		</div>
		<h1><LucideArrowUpRight /> {m['text.editor.export.header']()}</h1>
		<hr />
		<div class="grid w-full grid-cols-2 gap-2">
			<Button
				action={() => generateZip(badgeExportTypes[1])}
				type="action"
				label={m['label.editor.export.zip.svg']()}
				><LucidePenTool class="p-0.5" />{m['label.editor.export.zip.svg']()}</Button
			>
			<Button disabled label={m['label.editor.export.zip.png']()}
				><LucideImageDown class="p-0.5" /> {m['label.editor.export.zip.png']()}</Button
			>
		</div>
	</div>
</div>

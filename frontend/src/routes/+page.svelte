<script lang="ts">
	import { appDimensions, pageDimensions } from '$lib/state.svelte';
	import type { Badge } from '$lib/types';
	import ColourInput from '$lib/ui/+ColourInput.svelte';
	import TextInput from '$lib/ui/+TextInput.svelte';

	const tallestHeight = $derived(Math.max(pageDimensions.height, pageDimensions.contentHeight));

	const appHeight = $derived(
		Math.max(pageDimensions.height - (tallestHeight - appDimensions.height), 0)
	);

	let badgeState = $state<Badge>({
		topText: 'Made for',
		bottomText: 'You',
		topTextColour: '#FFFFFF',
		bottomTextColour: '#FF0066',
		topBackgroundColour: '#8F004C',
		bottomBackgroundColour: '#61003D',
		icon: 'https://badger-staging.worldwidepixel.ca/badger.png'
	});
</script>

<div class="grid h-full w-full grid-cols-2">
	<div
		style="max-height: {appHeight}px"
		class="flex flex-col gap-4 overflow-y-scroll border-r py-6 pr-6"
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
				<div class="flex flex-col items-center gap-2">
					<div class="grid w-full grid-cols-[1fr_16rem] items-center gap-2">
						<span class="w-fit">URL</span>
						<TextInput
							placeholder="Icon URL"
							label="Icon URL"
							bind:value={badgeState.icon}
							className="w-full"
						/>
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
						value={badgeState.bottomTextColour}
					/>
				</div>
			</div>
		</div>
	</div>
	<div style="max-height: {appHeight}px" class="flex flex-col overflow-y-scroll p-6">
		<h1>Preview</h1>
		<span style="background-color: {badgeState.topBackgroundColour}"
			>{badgeState.topText || '[empty]'}</span
		>
		<span style="background-color: {badgeState.bottomBackgroundColour}"
			>{badgeState.bottomText || '[empty]'}</span
		>
		<span>test</span>
		<span>scroll</span>
		<span>content</span>
		<span>this</span>
		<span>test</span>
		<span>scroll</span>
		<span>content</span>
		<span>this</span>
		<span>is</span>
		<span>test</span>
		<span>scroll</span>
		<span>content</span>
		<span>this</span>
		<span>test</span>
		<span>scroll</span>
		<span>content</span>
		<span>this</span>
		<span>is</span>
		<span>test</span>
		<span>scroll</span>
		<span>content</span>
		<span>this</span>
		<span>test</span>
		<span>scroll</span>
		<span>content</span>
		<span>this</span>
		<span>is</span>
		<span>test</span>
		<span>scroll</span>
		<span>content</span>
		<span>this</span>
		<span>test</span>
		<span>scroll</span>
		<span>content</span>
	</div>
</div>

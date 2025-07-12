<script lang="ts">
	import { appDimensions, pageDimensions } from '$lib/state.svelte';
	import ColourInput from '$lib/ui/+ColourInput.svelte';
	import TextInput from '$lib/ui/+TextInput.svelte';

	const tallestHeight = $derived(Math.max(pageDimensions.height, pageDimensions.contentHeight));

	const appHeight = $derived(
		Math.max(pageDimensions.height - (tallestHeight - appDimensions.height), 0)
	);

	let colour = $state('#8F004D');
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
					<ColourInput label="Background top colour" bind:value={colour} />
					<span class="w-fit">Bottom</span>
					<ColourInput label="Background bottom colour" value="#61003D" />
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
							value="https://badger-staging.worldwidepixel.ca/badger.png"
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
						label="Top line text"
						value=""
						className="w-full"
					/>
					<ColourInput label="Background top colour" value="#8F004D" />
					<TextInput
						placeholder="Bottom: Type anything here"
						label="Bottom line text"
						value=""
						className="w-full"
					/>
					<ColourInput label="Background bottom colour" value="#61003D" />
				</div>
			</div>
		</div>
	</div>
	<div style="max-height: {appHeight}px" class="flex flex-col overflow-y-scroll p-6">
		<h1>Preview</h1>
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

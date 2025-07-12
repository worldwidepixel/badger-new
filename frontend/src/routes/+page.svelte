<script lang="ts">
	import { appDimensions, pageDimensions } from '$lib/state.svelte';
	import ColourInput from '$lib/ui/+ColourInput.svelte';

	const tallestHeight = $derived(Math.max(pageDimensions.height, pageDimensions.contentHeight));

	const appHeight = $derived(
		Math.max(pageDimensions.height - (tallestHeight - appDimensions.height), 0)
	);
</script>

<div class="grid h-full w-full grid-cols-3">
	<div
		style={`max-height: ${appHeight}px`}
		class="col-span-2 flex flex-col overflow-y-scroll border-r py-6 pr-6"
	>
		<h1>Edit</h1>
		<ColourInput />
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
	<div style={`max-height: ${appHeight}px`} class="flex flex-col overflow-y-scroll p-6">
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

<script lang="ts">
	import { appDimensions, pageDimensions } from '$lib/state.svelte';
	import type { Badge } from '@badgered/common';
	import { build, defaultBadge } from '@badgered/common';
	import ColourInput from '$lib/ui/+ColourInput.svelte';
	import TextInput from '$lib/ui/+TextInput.svelte';
	import UIBadge from '$lib/ui/+Badge.svelte';

	const tallestHeight = $derived(Math.max(pageDimensions.height, pageDimensions.contentHeight));

	const appHeight = $derived(
		Math.max(pageDimensions.height - (tallestHeight - appDimensions.height), 0)
	);

	let badgeState = $state<Badge>(defaultBadge);

	$effect(() => {
		useBadgeState();
		refreshTestBadge();
	});

	let currentTestBadge = $state('');

	async function refreshTestBadge() {
		currentTestBadge = await build('cosy', badgeState);
	}

	function useBadgeState() {
		badgeState.bottomBackgroundColour;
		badgeState.bottomText;
		badgeState.bottomTextColour;
		badgeState.icon;
		badgeState.topBackgroundColour;
		badgeState.topText;
		badgeState.topTextColour;
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
						bind:value={badgeState.bottomTextColour}
					/>
				</div>
			</div>
		</div>
	</div>
	<div style="max-height: {appHeight}px" class="flex flex-col gap-4 overflow-y-auto p-6">
		<h1>Preview</h1>
		<hr />
		<UIBadge data={badgeState} type="cosy" label="Cosy badge" />
		<UIBadge data={badgeState} type="cosy_minimal" label="Cosy Minimal badge" />
		<UIBadge data={badgeState} type="compact" label="Compact badge" />
		<UIBadge data={badgeState} type="compact_minimal" label="Compact Minimal badge" />
	</div>
</div>

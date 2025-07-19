<script lang="ts">
	import { build, type Badge, type BadgeVariant } from '@badgered/common';
	import Tooltip from 'sv-tooltip';

	type Props = {
		label: string;
		type: BadgeVariant;
		data: Badge;
	};

	let { label, type, data }: Props = $props();

	let renderedBadge = $state('');

	$effect(() => {
		useBadgeState();
		refreshTestBadge();
	});

	async function refreshTestBadge() {
		renderedBadge = await build(type, data);
	}

	function useBadgeState() {
		data.bottomBackgroundColour;
		data.bottomText;
		data.bottomTextColour;
		data.icon;
		data.topBackgroundColour;
		data.topText;
		data.topTextColour;
	}
</script>

<span class="h-hit w-fit">
	<Tooltip class="tooltip-badger" tip={label}>
		<span aria-label={label}> {@html renderedBadge} </span>
	</Tooltip>
</span>

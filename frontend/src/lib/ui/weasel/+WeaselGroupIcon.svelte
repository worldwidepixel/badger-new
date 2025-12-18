<script lang="ts">
	import type { WeaselEditorGroupIcon } from '@badgered/common';
	import { LucideImage, LucidePaintbrush, LucideSettings2, LucideText } from '@lucide/svelte';

	const { icon }: { icon?: WeaselEditorGroupIcon } = $props();
</script>

{#if icon === 'text'}
	<LucideText />
{:else if icon === 'image'}
	<LucideImage />
{:else if icon === 'colour'}
	<LucidePaintbrush />
{:else}
	<LucideSettings2 />
{/if}

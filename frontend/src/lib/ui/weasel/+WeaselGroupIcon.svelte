<script lang="ts">
	import type { WeaselEditorGroupIcon } from '@badgered/common';
	import { Image, Paintbrush, Settings2, TextAlignStart } from '@lucide/svelte';

	const { icon }: { icon?: WeaselEditorGroupIcon } = $props();
</script>

{#if icon === 'text'}
	<TextAlignStart />
{:else if icon === 'image'}
	<Image />
{:else if icon === 'colour'}
	<Paintbrush />
{:else}
	<Settings2 />
{/if}

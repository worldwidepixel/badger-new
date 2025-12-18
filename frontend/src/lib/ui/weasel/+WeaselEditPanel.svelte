<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { badgerWeaselCollection, generateKey } from '@badgered/common';
	import { LucidePen } from '@lucide/svelte';
	import WeaselGroupIcon from './+WeaselGroupIcon.svelte';
	import WeaselInput from './+WeaselInput.svelte';

	const classicWeasel = badgerWeaselCollection.weasels.classic;
	const bId = classicWeasel.getId();
	const bEditorGroups = classicWeasel.getEditorGroups();
</script>

<h1><LucidePen />{m['text.editor.edit.header']()} (Weasel)</h1>
<hr />

<div class="flex flex-col gap-4">
	{#each bEditorGroups as group, iter}
		<div class="flex flex-col gap-2">
			<h3><WeaselGroupIcon icon={group.icon} /> {generateKey(bId, group.id)}</h3>
			{#each group.linkedInputs as input}
				<WeaselInput {input} id={generateKey(bId, group.id, input.id)} />
			{/each}
		</div>
		{#if bEditorGroups.length - iter != 1}
			<hr />
		{/if}
	{/each}
</div>

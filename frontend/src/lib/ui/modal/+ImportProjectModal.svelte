<script lang="ts">
	import { LucideUpload, XIcon } from '@lucide/svelte';
	import Modal, { ModalData } from './+Modal.svelte';
	import Button from '../+Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import { defaultBadge, type Badge } from '@badgered/common';
	import { badgeState } from '$lib/state.svelte';

	let { key }: { key: string } = $props();

	async function handleDrop(event: DragEvent, dataModal: ModalData) {
		event.preventDefault();
		if (event.dataTransfer && event.dataTransfer.items.length === 1) {
			const itemFile: File | null = event.dataTransfer.items[0].getAsFile();
			if (itemFile !== null && itemFile.name.endsWith('.badger')) {
				const rawContents = await itemFile.text();
				try {
					const itemData = JSON.parse(rawContents);
					for (const [key, value] of Object.entries((() => itemData)())) {
						if (Object.keys(defaultBadge).includes(key) && typeof value === 'string') {
							badgeState[key as keyof Badge] = value;
						}
					}
					dataModal.context.close();
				} catch (e) {
					console.error(`Failed to import badger project file ${itemFile.name}`, e);
				}
			}
		}
	}
</script>

<Modal {key}>
	{#snippet header()}
		<LucideUpload />
		<h3>TRANSLATEME Import .badger project</h3>
	{/snippet}
	{#snippet content(data)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- W3C has no useful documentation on what I should be using here that isn't aria-dropeffect="execute". Please contact me with any suggestions. -lynn -->
		<div
			ondrop={(event) => handleDrop(event, data)}
			class="bg-badger-background-tertiary flex items-center justify-center rounded-2xl border-2 border-dashed px-2 py-4 transition"
		>
			<span class="flex flex-col items-center gap-4 font-bold"
				><LucideUpload size={60} /> TRANSLATEME Drag a .badger file here</span
			>
		</div>
		<input type="file" accept="application/json+badger" />
	{/snippet}
	{#snippet footer(data)}
		<Button
			action={data.context.close}
			type="action"
			className="bg-badger-background-tertiary px-3"
			label={m['modal.common.cancel']()}
		>
			<XIcon class="p-0.5" />
			{m['modal.common.cancel']()}</Button
		>
	{/snippet}
</Modal>

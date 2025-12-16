<script lang="ts">
	import { RotateCcwIcon, TriangleAlertIcon, XIcon } from '@lucide/svelte';
	import Modal, { type ModalContext } from './+Modal.svelte';
	import Button from '../+Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import { resetBadge } from '$lib';

	let { key }: { key: string } = $props();

	function reset(context: ModalContext) {
		resetBadge();
		context.close();
	}
</script>

<Modal {key}>
	{#snippet header()}
		<TriangleAlertIcon />
		<h3>{m['label.layout.reset']()}</h3>
	{/snippet}
	{#snippet content()}
		<h4>{m['modal.reset.warn']()}</h4>
		<p>{m['modal.reset.message']()}</p>
		<p>{m['modal.reset.skip']()}</p>
	{/snippet}
	{#snippet footer(data)}
		<Button
			action={() => {
				reset(data.context);
			}}
			type="action"
			className="bg-badger-red-secondary text-white px-3"
			label={m['modal.reset.confirm']()}
		>
			<RotateCcwIcon class="p-0.5" />
			{m['modal.reset.confirm']()}</Button
		>
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

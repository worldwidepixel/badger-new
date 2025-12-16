<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { SaveIcon, SettingsIcon, XIcon } from '@lucide/svelte';
	import Button from '../+Button.svelte';
	import Modal from './+Modal.svelte';

	let { key }: { key: string } = $props();
</script>

<Modal {key}
	>{#snippet header()}
		<SettingsIcon />
		<h3>{m['modal.settings.title']()}</h3>
	{/snippet}
	{#snippet content()}
		{key}
		HELLO THERE T
	{/snippet}
	{#snippet footer(setter)}
		<Button className="bg-badger-background-tertiary px-3" label={m['modal.common.save']()}
			><SaveIcon class="p-0.5" />{m['modal.common.save']()}</Button
		>
		<Button
			action={() => {
				setter(false);
			}}
			type="action"
			className="bg-badger-background-tertiary px-3"
			label={m['modal.common.cancel']()}
		>
			<XIcon class="p-0.5" />
			{m['modal.common.cancel']()}</Button
		>
	{/snippet}
</Modal>

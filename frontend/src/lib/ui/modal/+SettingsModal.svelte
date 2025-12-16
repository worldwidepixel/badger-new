<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { CheckIcon, LucideMoon, LucideSun, SettingsIcon } from '@lucide/svelte';
	import Button from '../+Button.svelte';
	import Modal from './+Modal.svelte';
	import { currentTheme, toggleTheme } from '$lib/state.svelte';

	let { key }: { key: string } = $props();
</script>

<Modal {key}
	>{#snippet header()}
		<SettingsIcon />
		<h3>{m['modal.settings.title']()}</h3>
	{/snippet}
	{#snippet content()}
		<div class="grid w-full grid-cols-2 items-center gap-x-2">
			<h4 class="col-span-2">{m['modal.settings.appearance.title']()}</h4>
			<p>{m['modal.settings.appearance.theme.title']()}</p>
			<Button
				type="action"
				action={toggleTheme}
				className="bg-badger-background-tertiary px-3"
				label={m['label.layout.theme']()}
			>
				{#if currentTheme.theme === 'dark'}
					<LucideMoon class="p-0.5" />
					{m['modal.settings.appearance.theme.dark']()}
				{:else}
					<LucideSun class="p-0.5" />

					{m['modal.settings.appearance.theme.light']()}
				{/if}
			</Button>
		</div>
	{/snippet}
	{#snippet footer(data)}
		<Button
			action={data?.context.close}
			type="action"
			className="bg-badger-background-tertiary px-3"
			label={m['modal.common.done']()}
		>
			<CheckIcon class="p-0.5" />
			{m['modal.common.done']()}</Button
		>
	{/snippet}
</Modal>

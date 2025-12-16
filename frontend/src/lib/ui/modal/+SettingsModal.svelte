<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { LucideMoon, LucideSun, SaveIcon, SettingsIcon } from '@lucide/svelte';
	import Button from '../+Button.svelte';
	import Modal, { type ModalContext } from './+Modal.svelte';
	import { currentLocale, currentTheme, toggleTheme } from '$lib/state.svelte';
	import { locales } from '$lib/paraglide/runtime';
	import { setCurrentLocale } from '$lib';

	let { key }: { key: string } = $props();

	const existingLocale = currentLocale;
	let requestedLocale: string = $state(existingLocale.locale);

	function saveLocale(context: ModalContext) {
		if (requestedLocale !== existingLocale.locale) {
			setCurrentLocale(requestedLocale as any, { reload: false });
		}
		context.close();
	}
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
			<h4 class="col-span-2">{m['modal.settings.locale.title']()}</h4>
			<p>{m['modal.settings.locale.display_language']()}</p>
			<select
				style="appearance: base-select"
				class="bg-badger-background-tertiary flex w-56 cursor-pointer flex-row items-center justify-center gap-1 rounded-xl border p-1.5 px-3 text-left font-semibold text-nowrap transition hover:brightness-95 active:brightness-95"
				bind:value={requestedLocale}
			>
				{#each locales as locale}
					<option
						class="text-badger-text bg-badger-background-tertiary max-w-48 font-sans"
						value={locale}
						selected={locale === existingLocale.locale}
						>{m['meta.display_name']({}, { locale })}</option
					>
				{/each}
			</select>
		</div>
	{/snippet}
	{#snippet footer(data)}
		<Button
			action={() => saveLocale(data.context)}
			type="action"
			className="bg-badger-background-tertiary px-3"
			label={m['modal.common.save_and_quit']()}
		>
			<SaveIcon class="p-0.5" />
			{m['modal.common.save_and_quit']()}</Button
		>
	{/snippet}
</Modal>

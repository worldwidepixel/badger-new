<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { LucideMoon, LucideSun, SaveIcon, SettingsIcon } from '@lucide/svelte';
	import Button from '../+Button.svelte';
	import Modal, { type ModalContext } from './+Modal.svelte';
	import {
		currentLocale,
		debugState,
		theme,
		toggleLightDarkThemeProfile
	} from '$lib/state.svelte';
	import { locales, type Locale } from '$lib/paraglide/runtime';
	import { setCurrentLocale } from '$lib';

	let { key }: { key: string } = $props();

	const existingLocale = currentLocale;
	let requestedLocale: Locale = $state(existingLocale.locale);

	function saveLocale(context: ModalContext) {
		if (requestedLocale !== existingLocale.locale) {
			setCurrentLocale(requestedLocale, { reload: false });
		}
		context.close();
	}

	function toggleWeasel() {
		debugState.weasel = !debugState.weasel;
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
				action={toggleLightDarkThemeProfile}
				className="bg-badger-background-tertiary px-3"
				label={m['label.layout.theme']()}
			>
				{#if theme.themeProfile === 'dark'}
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
				aria-label={m['modal.settings.locale.display_language.aria']()}
				style="appearance: base-select"
				class="bg-badger-background-tertiary flex w-56 cursor-pointer flex-row items-center justify-center gap-1 rounded-xl border p-1.5 px-3 text-left font-semibold text-nowrap transition hover:brightness-95 active:brightness-95"
				bind:value={requestedLocale}
			>
				{#each locales as locale (locale)}
					<option
						class="text-badger-text bg-badger-background-tertiary max-w-48 font-sans"
						value={locale}
						selected={locale === existingLocale.locale}
						>{m['meta.display_name']({}, { locale })}</option
					>
				{/each}
			</select>
			<hr class="col-span-2 my-4" />
			<h4 class="col-span-2">{m['modal.settings.debug.title']()}</h4>
			<p>Use alpha Weasel system</p>
			<Button
				type="action"
				action={toggleWeasel}
				className="bg-badger-background-tertiary px-3"
				label="Toggle Weasel"
			>
				{debugState.weasel}
			</Button>
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

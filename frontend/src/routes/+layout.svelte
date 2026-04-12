<script lang="ts">
	import LogoType from '$lib/ui/+LogoType.svelte';
	import Button from '$lib/ui/+Button.svelte';
	import {
		LucideCheck,
		LucideRotateCcw,
		LucideSettings,
		LucideShare,
		LucideSunMoon
	} from '@lucide/svelte';
	import '../app.css';
	import '@fontsource-variable/inter';
	import { browser } from '$app/environment';
	import {
		appDimensions,
		badgeState,
		currentLocale,
		keyboardState,
		pageDimensions,
		toggleLightDarkThemeProfile
	} from '$lib/state.svelte';
	import Tooltip from 'sv-tooltip';
	import { pageBase, handleKeys, resetBadge } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import { createParameters } from '@badgered/common';
	import SettingsModal from '$lib/ui/modal/+SettingsModal.svelte';
	import { ModalData } from '$lib/ui/modal/+Modal.svelte';
	import ResetWarningModal from '$lib/ui/modal/+ResetWarningModal.svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { children, data } = $props();

	console.log(
		'%cBadger',
		"font-family: 'Inter', 'Helvetica', 'Segoe UI', sans-serif; font-size: 1.5rem; font-weight: 700;"
	);
	console.log(
		'%cA badge designer for the web',
		"font-family: 'Inter', 'Helvetica', 'Segoe UI', sans-serif; font-size: 1rem;"
	);

	// Project sharing

	let showCopyFeedback = $state(false);

	function shareBadgeProject() {
		const url = pageBase + createParameters(badgeState);
		try {
			if (browser) {
				navigator.clipboard.writeText(url);
			}
			showCopyFeedback = true;
			setTimeout(() => {
				showCopyFeedback = false;
			}, 5 * 1000);
		} catch {
			/* empty */
		}
	}

	// Layout modals

	const settingsModalData = new ModalData('modalSettings');
	const resetModalData = new ModalData('modalReset');

	function handleReset() {
		if (keyboardState.currentKey === 'Control') {
			resetBadge();
			return;
		}
		resetModalData.context.open();
	}
</script>

<svelte:head>
	<meta name="darkreader-lock" />
</svelte:head>

<svelte:window
	onkeydown={(event) => handleKeys(event, true)}
	onkeyup={(event) => handleKeys(event, false)}
	bind:innerWidth={pageDimensions.width}
	bind:innerHeight={pageDimensions.height}
/>
<svelte:body bind:offsetHeight={pageDimensions.contentHeight} />
{#key currentLocale.locale}
	<div class="flex h-full flex-col">
		<nav class="flex w-auto justify-center border-b p-5">
			<div class="grid w-full max-w-7xl grid-cols-3 flex-row items-center">
				<div class="flex flex-row items-center justify-start">
					<a aria-label="Badger home" class="w-fit" href={resolve('/')}>
						<span class="flex flex-row items-center gap-2 text-xl select-none">
							<LogoType />
						</span>
					</a>
				</div>
				<div class="flex flex-row items-center justify-center">
					<!--badger 3: echoes of the prequel-->
				</div>
				<div class="flex flex-row items-center justify-end gap-4">
					{#if page.url.pathname === '/'}
						<Button
							action={shareBadgeProject}
							type="action"
							className="px-3"
							label={m['label.layout.share.aria']()}
						>
							{#if showCopyFeedback}
								<LucideCheck class="p-0.5" />
							{:else}
								<LucideShare class="p-0.5" />
							{/if}
							{m['label.layout.share']()}
						</Button>
						<Tooltip left badger tip={m['label.layout.reset']()}>
							<Button
								action={handleReset}
								style="transparent"
								roundness="circle"
								type="action"
								label={m['label.layout.reset']()}
							>
								<LucideRotateCcw />
							</Button>
						</Tooltip>
					{/if}
					<Tooltip left badger tip={m['label.layout.settings']()}>
						<Button
							action={settingsModalData.context.open}
							style="transparent"
							roundness="circle"
							type="action"
							label={m['label.layout.settings']()}
						>
							<LucideSettings />
						</Button>
					</Tooltip>
					<Tooltip left badger tip={m['label.layout.theme']()}>
						<Button
							action={toggleLightDarkThemeProfile}
							style="transparent"
							roundness="circle"
							type="action"
							label={m['label.layout.theme']()}
						>
							<LucideSunMoon />
						</Button>
					</Tooltip>
				</div>
			</div>
		</nav>
		<!-- Any page-wide modals should be here. -->
		<SettingsModal key={settingsModalData.key} />
		<ResetWarningModal key={resetModalData.key} />
		<main
			bind:clientWidth={appDimensions.width}
			bind:clientHeight={appDimensions.height}
			class="relative flex w-full flex-1 flex-col items-center px-6"
		>
			<div class="h-full w-full max-w-7xl">
				{@render children?.()}
			</div>
		</main>
		<footer
			class="bg-badger-background-secondary flex flex-col justify-center gap-6 border-t p-4 py-8 text-sm sm:flex-row sm:items-center"
		>
			<div class="-mt-5 flex flex-col items-center gap-1 sm:items-start">
				<a href={resolve('/')}>
					<span class="flex flex-row items-center gap-2 text-xl select-none">
						<LogoType />
					</span>
				</a>
				<a
					class="underline"
					target="_blank"
					href="https://github.com/worldwidepixel/badger/commit/{data.deployment_info
						.git_hash}"
					aria-label={m['label.layout.source']()}
				>
					<code
						>{data.deployment_info.branch}@{data.deployment_info.git_hash.substring(
							0,
							7
						)}</code
					>
				</a>
			</div>
			<div class="flex flex-col items-center gap-1 sm:items-start">
				<span
					class="decoration-badger-red text-badger-text-primary text-lg font-bold underline decoration-wavy"
					>{m['text.layout.about.header']()}</span
				>
				{m['text.layout.about']()}
				<a
					target="_blank"
					href="https://worldwidepixel.ca"
					aria-label={m['label.layout.created']()}
					class="hover:underline"
				>
					{m['text.layout.created']()}
				</a>
			</div>
		</footer>
	</div>
{/key}

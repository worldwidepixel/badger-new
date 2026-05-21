<script lang="ts">
	import LogoType from '$lib/ui/+LogoType.svelte';
	import Button from '$lib/ui/+Button.svelte';
	import {
		LucideDownload,
		LucideCheck,
		LucideRotateCcw,
		LucideSettings,
		LucideShare,
		LucideSunMoon
	} from '@lucide/svelte';
	import '../app.css';
	import '@fontsource-variable/inter/wght.css';
	import '@fontsource-variable/inter/wght-italic.css';
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
	import { deepMerge, MetaTags } from 'svelte-meta-tags';
	import saveAs from 'file-saver';
	import ImportProjectModal from '$lib/ui/modal/+ImportProjectModal.svelte';

	let { children, data } = $props();

	if (browser) {
		console.log(
			'%cBadger',
			"font-family: 'Inter', 'Helvetica', 'Segoe UI', sans-serif; font-size: 1.5rem; font-weight: 700;"
		);
		console.log(
			'%cA badge designer for the web',
			"font-family: 'Inter', 'Helvetica', 'Segoe UI', sans-serif; font-size: 1rem;"
		);
	}

	const metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

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

	function downloadBadgeProject() {
		const fileBlob = new Blob([JSON.stringify(badgeState)], {
			type: 'application/json+badger'
		});
		saveAs(
			fileBlob,
			`${badgeState.topText.replaceAll(' ', '_')}_${badgeState.bottomText.replaceAll(' ', '_')}.badger`
		);
	}

	// Open import modal if a file is dragged onto screen

	function handleFileDrag(e: DragEvent) {
		importProjectModalData.context.open();
		e.preventDefault();
	}

	// Layout modals

	const settingsModalData = new ModalData('modalSettings');
	const resetModalData = new ModalData('modalReset');
	const importProjectModalData = new ModalData('modalImportProject');

	function handleReset() {
		if (keyboardState.currentKey === 'Control') {
			resetBadge();
			return;
		}
		resetModalData.context.open();
	}
</script>

<MetaTags {...metaTags} />

<svelte:head>
	<meta name="darkreader-lock" />
</svelte:head>

<svelte:window
	onkeydown={(event) => handleKeys(event, true)}
	onkeyup={(event) => handleKeys(event, false)}
	bind:innerWidth={pageDimensions.width}
	bind:innerHeight={pageDimensions.height}
/>
<svelte:body
	bind:offsetHeight={pageDimensions.contentHeight}
	ondragover={handleFileDrag}
	ondragenter={handleFileDrag}
/>
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
						<div class="flex flex-row items-center">
							<Button
								action={shareBadgeProject}
								type="action"
								className="px-3 active:translate-x-0.75 border-r-0 rounded-r-none"
								label={m['label.layout.share.aria']()}
							>
								{#if showCopyFeedback}
									<LucideCheck class="p-0.5" />
								{:else}
									<LucideShare class="p-0.5" />
								{/if}
								{m['label.layout.share']()}
							</Button>
							<Tooltip left badger tip={m['label.layout.download']()}>
								<Button
									action={downloadBadgeProject}
									type="action"
									className="active:-translate-x-px rounded-l-none"
									label={m['label.layout.download.aria']()}
								>
									<LucideDownload class="p-0.5" />
								</Button>
							</Tooltip>
						</div>

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
		<ImportProjectModal key={importProjectModalData.key} />
		<main
			bind:clientWidth={appDimensions.width}
			bind:clientHeight={appDimensions.height}
			class="relative flex w-full flex-1 flex-col items-center px-6"
		>
			<div class="h-full w-full max-w-7xl">
				{@render children?.()}
			</div>
		</main>
	</div>
{/key}

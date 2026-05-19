<script lang="ts">
	import { browser } from '$app/environment';
	import { apiBase } from '$lib';
	import {
		type BadgeVariant,
		type Badge,
		createEmbedUrl,
		build,
		badgeExportTypes
	} from '@badgered/common';
	import {
		LucideAArrowDown,
		LucideCodeXml,
		LucideImageDown,
		LucidePenTool
	} from '@lucide/svelte';
	import fileSaver from 'file-saver';
	const saveAs = fileSaver;
	import Tooltip from 'sv-tooltip';
	import { m } from '$lib/paraglide/messages';

	type Props = {
		label: string;
		type: BadgeVariant;
		data: Badge;
	};

	let { label, type, data }: Props = $props();

	function copy(text: string) {
		if (browser) {
			navigator.clipboard.writeText(text);
		}
	}

	async function createBlob(format: string) {
		return new Blob([await build(type, data)], {
			type: format
		});
	}
</script>

<ul
	class="bg-badger-background-secondary flex w-fit flex-row justify-center divide-x rounded-xl border"
>
	{#each badgeExportTypes as format (format.name)}
		<li>
			<Tooltip bottom badger tip={m['label.badge.tools.export']({ format: format.name })}>
				<button
					onclick={async () =>
						saveAs(
							await createBlob(format.mime),
							`${data.topText.replaceAll(' ', '_')}_${data.bottomText.replaceAll(' ', '_')}_${type}.${format.extension}`
						)}
					aria-label={m['label.badge.tools.export.aria']({
						format: format.name,
						type: label
					})}
					class="cursor-pointer p-2"
				>
					{#if format.mime === 'image/svg+xml'}
						<LucidePenTool />
					{:else}
						<LucideImageDown />
					{/if}
				</button>
			</Tooltip>
		</li>
	{/each}
	<li>
		<Tooltip bottom badger tip={m['label.badge.tools.copy.markdown']()}>
			<button
				onclick={() =>
					copy(
						`![${data.topText} ${data.bottomText}](${createEmbedUrl(data, type, apiBase, 'png')})`
					)}
				aria-label={m['label.badge.tools.copy.markdown.aria']({ label: label })}
				class="cursor-pointer p-2"
			>
				<LucideAArrowDown />
			</button>
		</Tooltip>
	</li>
	<li>
		<Tooltip bottom badger tip={m['label.badge.tools.copy.html']()}>
			<button
				onclick={() =>
					copy(
						`<img src='${createEmbedUrl(data, type, apiBase, 'png')}' alt='${data.topText} ${data.bottomText}' />`
					)}
				aria-label={m['label.badge.tools.copy.html.aria']({ label: label })}
				class="cursor-pointer p-2"
			>
				<LucideCodeXml />
			</button>
		</Tooltip>
	</li>
</ul>

<script lang="ts">
	import { browser } from '$app/environment';
	import { apiBase } from '$lib';
	import { type BadgeVariant, type Badge, createEmbedUrl, build } from '@badgered/common';
	import {
		LucideAArrowDown,
		LucideCodeXml,
		LucideImageDown,
		LucidePenTool
	} from '@lucide/svelte';
	import fileSaver from 'file-saver';
	const saveAs = fileSaver;
	import Tooltip from 'sv-tooltip';
	import mime from 'mime-types';

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
	{#each ['image/png', 'image/svg+xml'] as format}
		<li>
			<Tooltip bottom badger tip="Export as {format.toUpperCase()}">
				<button
					onclick={async () =>
						saveAs(
							await createBlob(format),
							`${data.topText.replaceAll(' ', '_')}_${data.bottomText.replaceAll(' ', '_')}_${type}.${mime.extension(format)}`
						)}
					aria-label="Export {label} badge as {format}"
					class="cursor-pointer p-2"
				>
					{#if format === 'svg'}
						<LucidePenTool />
					{:else}
						<LucideImageDown />
					{/if}
				</button>
			</Tooltip>
		</li>
	{/each}
	<li>
		<Tooltip bottom badger tip="Copy Markdown">
			<button
				onclick={() =>
					copy(
						`![${data.topText} ${data.bottomText}](${createEmbedUrl(data, type, apiBase, 'png')})`
					)}
				aria-label="Copy {label} badge Markdown code"
				class="cursor-pointer p-2"
			>
				<LucideAArrowDown />
			</button>
		</Tooltip>
	</li>
	<li>
		<Tooltip bottom badger tip="Copy HTML code">
			<button
				onclick={() =>
					copy(
						`<img src='${createEmbedUrl(data, type, apiBase, 'png')}' alt='${data.topText} ${data.bottomText}' />`
					)}
				class="cursor-pointer p-2"
			>
				<LucideCodeXml />
			</button>
		</Tooltip>
	</li>
</ul>

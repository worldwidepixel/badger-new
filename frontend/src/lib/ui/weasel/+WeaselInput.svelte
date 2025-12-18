<script lang="ts">
	import {
		prefixKey,
		WeaselBiLinkedInput,
		weaselInputElements,
		WeaselLinkedInput
	} from '@badgered/common';
	import ColourInput from '../+ColourInput.svelte';
	import TextInput from '../+TextInput.svelte';
	import Tooltip from 'sv-tooltip';
	import { LucidePipette, LucideUpload } from '@lucide/svelte';
	import Button from '../+Button.svelte';
	import { m } from '$lib/paraglide/messages';

	const { input, id }: { input: WeaselLinkedInput; id: string } = $props();
</script>

{#if input.inputElement === weaselInputElements.colour_input}
	<div class="grid grid-cols-[1fr_16rem] items-center gap-2">
		<p class="overflow-auto">{prefixKey(id, 'text')}</p>
		<ColourInput label={'TRANSLATE ME'} value={input.defaultValue} />
	</div>
{:else if input.inputElement === weaselInputElements.text_input}
	<div class="grid grid-cols-[1fr_16rem] items-center gap-2">
		<p class="overflow-auto">{prefixKey(id, 'text')}</p>
		<TextInput label={'TRANSLATE ME'} value={input.defaultValue} />
	</div>
{:else if input.inputElement === weaselInputElements.text_colour_input && input instanceof WeaselBiLinkedInput}
	<div class="grid grid-cols-[1fr__12rem_16rem] items-center gap-2">
		<p class="overflow-auto">{prefixKey(id, 'text')}</p>
		<TextInput
			placeholder={'TRANSLATE ME'}
			label={'TRANSLATE ME'}
			value={input.defaultValue}
			className="w-full"
		/>
		<ColourInput label={'TRANSLATE ME'} value={input.secondDefaultValue} />
	</div>
{:else if input.inputElement === weaselInputElements.image_input || input.inputElement === weaselInputElements.image_colour_input}
	<div class="grid w-full grid-cols-[1fr__2.5rem_16rem] items-center gap-2">
		<p class="overflow-auto">{prefixKey(id, 'text')}</p>

		<Tooltip badger tip={prefixKey(id, 'tip')}>
			<span class="relative h-10 w-fit">
				<input
					class="peer absolute top-0 left-0 z-[-1] size-10 appearance-none opacity-0"
					id="file-input"
					name="file-input"
					type="file"
					accept="image/*"
				/>
				<div class="rounded-xl peer-focus-visible:outline">
					<label class="size-10" for="file-input">
						<Button className="size-10" label={'TRANSLATE ME'}>
							<LucideUpload />
						</Button></label
					>
				</div>
			</span>
		</Tooltip>

		<TextInput
			placeholder={'TRANSLATE ME'}
			label={'TRANSLATE ME'}
			value={input.defaultValue}
			className="w-full"
		/>
	</div>
	{#if input.inputElement === weaselInputElements.image_colour_input && input instanceof WeaselBiLinkedInput}
		<div
			class="bg-badger-background-secondary flex w-full flex-row items-center gap-4 rounded-xl border p-4"
		>
			<div class="flex shrink-0 flex-col gap-2">
				<span class="text-center font-semibold">{m['text.editor.edit.icon.preview']()}</span
				>
				<img
					draggable="false"
					alt={m['label.editor.edit.icon.preview']()}
					class="aspect-square size-35 rounded-2xl p-2"
					src={input.defaultValue}
				/>
			</div>
			<span class="bg-badger-border h-full w-[1px]"></span>
			<div class="flex w-full flex-col gap-2">
				<span class="text-center font-semibold"
					>{m['text.editor.edit.icon.suggested']()}</span
				>
				<div
					class="flex h-35 w-full flex-row flex-wrap justify-center gap-2 overflow-y-scroll px-4 py-4"
				>
					{#each [] as colour}
						<button
							aria-label={m['label.editor.edit.icon.suggested']({
								colour: 'TRANSLATE ME'
							})}
							class="group relative flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border"
						>
							<LucidePipette
								onclick={() => {}}
								class="group-active:bg-badger-background-secondary/90 group-focus-visible:bg-badger-background-secondary/90 bg-badger-background-secondary/60 relative z-1 size-10 scale-90 overflow-visible rounded-[0.8rem] border p-2.5 opacity-0 shadow backdrop-saturate-150 transition group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:scale-95"
							/>
							<span
								class="absolute top-0 left-0 z-0 h-full w-full transition group-hover:brightness-90"
								style="background-color: {colour}"
							></span>
						</button>
					{/each}
					{#if [].length === 0}
						<span class="flex h-full w-full items-center justify-center text-center"
							>{m['text.editor.edit.icon.invalid']()}</span
						>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{/if}

<script module>
	export type ModalContext = {
		open: () => void;
		close: () => void;
	};

	export class ModalData {
		public key: string;
		private isOpen = $state(false);
		public context: ModalContext = $state({
			open: () => (this.isOpen = true),
			close: () => (this.isOpen = false)
		});

		public getIsOpen() {
			return this.isOpen;
		}

		public constructor(key: string) {
			this.key = key;
			setContext(this.key, this);
		}
	}
</script>

<script lang="ts">
	import { XIcon } from '@lucide/svelte';
	import { getContext, setContext, type Snippet } from 'svelte';
	import Button from '../+Button.svelte';
	import Tooltip from 'sv-tooltip';
	import { m } from '$lib/paraglide/messages';
	import { keyboardState } from '$lib/state.svelte';

	type Props = {
		header: Snippet<[ModalData]>;
		content: Snippet<[ModalData]>;
		footer: Snippet<[ModalData]>;
		key: string;
	};
	const { header, content, footer, key }: Props = $props();

	const modalData: ModalData = getContext((() => key)());

	keyboardState.listeners.push((event) => {
		if (event.key === 'Escape') {
			modalData.context.close();
		}
	});
</script>

{#if modalData.getIsOpen()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		onclick={() => modalData.context.close()}
		class="bg-badger-background-secondary/50 fixed top-0 right-0 bottom-0 left-0 z-10 h-full w-full backdrop-blur-sm"
	></div>

	<div
		class="pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-11 flex h-full w-full flex-col items-center justify-center"
	>
		<div
			class="bg-badger-background-secondary pointer-events-auto flex max-h-full max-w-full flex-col gap-4 rounded-2xl border shadow-2xl"
		>
			<div
				class="flex w-full flex-row justify-between gap-6 border-b-3 border-dotted px-6 py-5"
			>
				<div class="flex flex-row items-center gap-3">
					{@render header(modalData)}
				</div>
				<Tooltip badger tip={m['modal.common.close']()}>
					<Button
						type="action"
						action={modalData.context.close}
						roundness="circle"
						className="w-fit bg-badger-background-tertiary h-fit"
						label={m['modal.common.close']()}
					>
						<XIcon />
					</Button>
				</Tooltip>
			</div>
			<div class="flex max-h-full w-full flex-col gap-2 overflow-y-auto px-6">
				{@render content(modalData)}
			</div>
			<div class="flex flex-row flex-wrap items-center justify-end gap-2 px-6 pb-5">
				{@render footer(modalData)}
			</div>
		</div>
	</div>
{/if}

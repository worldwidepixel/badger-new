<script lang="ts">
	interface Props {
		value: string;
		label: string;
	}

	let { value = $bindable('#8f004d'), label }: Props = $props();

	const hexRegex = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i;

	let liveColour = $state(value);

	$effect(() => {
		liveColour = value;
	});

	function tryValidate(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			validate();
		}
	}

	function validate() {
		if (liveColour.match(hexRegex)) {
			value = liveColour;
		} else {
			liveColour = value;
		}
	}
</script>

<div class="bg-badger-background-secondary flex w-fit flex-col overflow-clip rounded-xl">
	<div class="flex h-10 w-64 flex-row gap-0 rounded-xl border p-2">
		<input
			aria-label="Hex input for {label}"
			name="colour-hex"
			class="w-[10rem] outline-none dark:bg-transparent"
			bind:value={liveColour}
			type="text"
			maxlength="7"
			onfocusout={validate}
			onkeypress={tryValidate}
		/>
		<span
			class="h-full w-full cursor-pointer overflow-clip rounded-md border focus-within:outline"
			style="background-color: {value}"
		>
			<!--
			There is a chance you will see the warning "The specified value "" does not conform to the required format."
			This warning is just a Chrome thing, and is not actually an issue. This is just how Svelte works.
			<3 WWP
		-->
			<input
				class="focus-visible:border-badger-text-primary h-full w-full cursor-pointer appearance-none rounded-md opacity-0"
				aria-label="Browser colour picker input for {label}"
				type="color"
				name="colour-picker"
				bind:value
			/>
		</span>
	</div>
</div>

<script lang="ts">
	interface Props {
		value: string;
		label: string;
		placeholder?: string;
		className?: string;
	}

	let { value, label, placeholder = 'Type anything here', className }: Props = $props();
</script>

<input
	aria-label="Text input for {label}"
	class="h-10 w-64 gap-0 rounded-xl border p-2 outline-offset-[-2px] {className}"
	{placeholder}
	bind:value
/>

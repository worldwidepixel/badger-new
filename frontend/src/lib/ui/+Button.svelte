<script lang="ts">
	type Props = {
		style?: 'solid' | 'transparent';
		roundness?: 'circle' | 'round';
		label: string;
		type?: 'action' | 'link';
		action?: any;
		to?: string;
		className?: string;
		disabled?: boolean;
		children: Function;
	};

	let {
		children,
		style = 'solid',
		roundness = 'round',
		label,
		type = 'link',
		action = () => {},
		to,
		className = '',
		disabled = false
	}: Props = $props();

	const roundnessStyle = roundness === 'circle' ? 'rounded-full' : 'rounded-xl';
	const transparencyStyle =
		style === 'solid'
			? 'bg-badger-background-secondary border'
			: 'hover:outline outline-badger-border hover:bg-badger-background-transparent hover:shadow';
	const actionStyle = action || to ? 'cursor-pointer' : '';
	const disabledStyle = disabled ? 'opacity-50 !cursor-not-allowed' : '';

	const buttonStyle = [
		'flex flex-row gap-1 items-center justify-center transition p-1.5 hover:brightness-99 active:brightness-95',
		roundnessStyle,
		transparencyStyle,
		actionStyle,
		disabledStyle,
		className
	].join(' ');
</script>

{#if type === 'action'}
	<button class={buttonStyle} onclick={action} aria-label={label}>
		{@render children()}
	</button>
{:else}
	<a class={buttonStyle} href={to} aria-label={label}>
		{@render children()}
	</a>
{/if}

<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex flex-col">
	<nav class="flex w-auto justify-center border-b p-5">
		<div
			class="flex w-full max-w-[80rem] flex-row items-center justify-evenly sm:justify-between"
		>
			badger 3: echoes of the prequel
		</div>
	</nav>
	{@render children()}
</div>

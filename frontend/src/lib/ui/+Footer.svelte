<script>
	import { resolve } from '$app/paths';
	import { m } from '$lib/paraglide/messages';
	import LogoType from './+LogoType.svelte';
	const { deployment } = $props();
</script>

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
			href="https://github.com/worldwidepixel/badger/commit/{deployment.git_hash}"
			aria-label={m['label.layout.source']()}
		>
			<code>{deployment.branch}@{deployment.git_hash.substring(0, 7)}</code>
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

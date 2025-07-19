<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/ui/+Button.svelte';
	import { LucideHome } from '@lucide/svelte';

	const splashes = [
		'Oh no!',
		'Skill Issue!',
		'We need to burrow back to you.',
		'Please come back in regular business hours.',
		'Try turning it off and on again!',
		'Oops!',
		'It seems I have died.',
		'Have you cleared your cache?',
		'Probably your fault.',
		"Hi! I'm Badger, and I'm a crashaholic.",
		'Probably not meant to happen.',
		'Is Cloudflare down?',
		'Is GitHub down?',
		'explod',
		'Not broken at all!',
		'How did you get here?',
		'Mind the gap.',
		'Does it work on Firefox?',
		'Try Internet Explorer instead.',
		'>:3',
		"Are you sure this isn't staging?",
		'Good to see you!',
		'Your fault.',
		'My fault.',
		'Enable your adblocker.',
		'And the dish ran away with the spoon.',
		'Would you like a soundtrack with that?',
		'F*cking hell, Gradle'
	];

	const logo = `
<svg width="70mm" height="70mm" version="1.1" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<linearGradient id="d" x1="5310.2" x2="5574.8" y1="2003.1" y2="1738.6" gradientUnits="userSpaceOnUse">
<stop stop-color="#6900ff" offset="0"/>
<stop stop-color="#c800ff" offset="1"/>
</linearGradient>
<linearGradient id="c" x1="5490.9" x2="5394.1" y1="1690.2" y2="2051.6" gradientUnits="userSpaceOnUse">
<stop stop-color="#ffa915" offset="0"/>
<stop stop-color="#ff813e" offset="1"/>
</linearGradient>
<linearGradient id="b" x1="5394.1" x2="5490.9" y1="1690.2" y2="2051.6" gradientUnits="userSpaceOnUse">
<stop stop-color="#006efc" offset="0"/>
<stop stop-color="#5208ff" offset="1"/>
</linearGradient>
<linearGradient id="a" x1="5310.2" x2="5574.8" y1="1738.6" y2="2003.1" gradientUnits="userSpaceOnUse">
<stop stop-color="#ff3f5e" offset="0"/>
<stop stop-color="#ff331d" offset="1"/>
</linearGradient>
</defs>
<rect width="70" height="70" fill-opacity="0" stop-color="#000000" stroke-width="0" style="-inkscape-stroke:none;font-variation-settings:normal"/>
<path transform="matrix(.30868 0 0 .30868 -1645 -542.5)" d="m5442.5 1757.5 98.195 170.08h-196.39z" fill="url(#d)"/>
<path transform="matrix(.26733 .15434 -.15434 .26733 -1131.2 -1305.1)" d="m5442.5 1757.5 98.195 170.08h-196.39z" fill="url(#c)" stroke-linecap="square" stroke-width="15.118"/>
<path transform="matrix(.15434 .26733 -.26733 .15434 -304.87 -1708.7)" d="m5442.5 1757.5 98.195 170.08h-196.39z" fill="url(#b)" stroke-linecap="square" stroke-width="15.118"/>
<path transform="matrix(0 .30868 -.30868 0 612.5 -1645)" d="m5442.5 1757.5 98.195 170.08h-196.39z" fill="url(#a)" stroke-linecap="square" stroke-width="15.118"/>
</svg>
	`;

	const splash = splashes[Math.floor(Math.random() * splashes.length)];
	const code = page.status.toString().replace('0', logo);
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
	<span> {splash} </span>
	<span
		class="flex select-none flex-row items-center gap-0 text-9xl font-extrabold [&>svg]:h-28 [&>svg]:w-28"
	>
		{@html code}
	</span>
	<span class="mb-2">{page.error?.message}</span>
	<Button type="link" to="/" label="Return to home page"><LucideHome /></Button>
</div>

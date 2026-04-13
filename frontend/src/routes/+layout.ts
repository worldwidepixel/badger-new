import { pageBase } from '$lib';
import { theme } from '$lib/state.svelte';
import { defineBaseMetaTags } from 'svelte-meta-tags';

export function load({ data }) {
	const title = 'Badger';
	const description = 'A badge designer for the web.';
	const baseMetaTags = defineBaseMetaTags({
		title,
		titleTemplate: '%s | Badger',
		description,
		canonical: pageBase,
		openGraph: {
			type: 'website',
			url: pageBase,
			title,
			description,
			siteName: title,
			images: [
				{
					url: pageBase + 'badger.png',
					alt: 'Badger logo',
					type: 'image/png'
				}
			]
		},
		additionalMetaTags: [
			{
				property: 'theme-color',
				content: '#ff125e'
			}
		]
	});

	if (data.savedThemeProfile) theme.themeProfile = data.savedThemeProfile;

	return { ...baseMetaTags, deployment_info: data.deployment_info };
}

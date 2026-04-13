import { theme } from '$lib/state.svelte';
import { defineBaseMetaTags } from 'svelte-meta-tags';

export function load({ url, data }) {
	const thisUrl = new URL(url.pathname, url.origin).href;

	const title = 'Badger';
	const description = 'A badge designer for the web.';
	const baseMetaTags = defineBaseMetaTags({
		title,
		titleTemplate: '%s | Badger',
		description,
		canonical: thisUrl,
		openGraph: {
			type: 'website',
			url: thisUrl,
			title,
			description,
			siteName: title,
			images: [
				{
					url: thisUrl + 'badger.png',
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

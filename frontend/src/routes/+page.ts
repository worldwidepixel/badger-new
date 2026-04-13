import { definePageMetaTags } from 'svelte-meta-tags';

export function load({ data }) {
	const pageMetaTags = definePageMetaTags({
		title: 'Badger',
		titleTemplate: '%s'
	});

	return { ...pageMetaTags, editorParameters: data.editorParameters };
}

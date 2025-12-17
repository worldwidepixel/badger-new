import { paraglideMiddleware } from '$lib/paraglide/server';
import type { Handle, ServerInit } from '@sveltejs/kit';

export const init: ServerInit = async () => {
	console.log('hai');
};

// Paraglide i18n

const paraglideHandle: Handle = ({ event, resolve }) => {
	return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});
};

export const handle: Handle = paraglideHandle;

import { paraglideMiddleware } from '$lib/paraglide/server';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

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

// Visual theme sync

const themeHandle: Handle = async ({ event, resolve }) => {
	const themeProfile = event.cookies.get('themeProfile');

	const response = await resolve(event);

	if (!themeProfile) {
		return response;
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace(
				'<html lang="en">',
				`<html lang="en" data-theme="${themeProfile}">`
			);
		}
	});
};

export const handle: Handle = sequence(themeHandle, paraglideHandle);

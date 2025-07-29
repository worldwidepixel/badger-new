import { env } from '$env/dynamic/public';
import chroma from 'chroma-js';
import type { HexColour } from './types';
import { ofetch } from 'ofetch';

export const apiBase = env.PUBLIC_API_BASE ?? 'https://api.v3.badger.worldwidepixel.ca/';

// https://stackoverflow.com/a/5624139
export function rgbToHex(r: number, g: number, b: number) {
	return ('#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)) as HexColour;
}

export function generatePalette(input: HexColour): {
	top: HexColour;
	bottom: HexColour;
	text: HexColour;
} {
	const parsedInput = chroma(input);
	return {
		top: parsedInput.shade(0.8).saturate(1.2).hex() as HexColour,
		bottom: parsedInput.shade(0.95).saturate(2).hex() as HexColour,
		text: parsedInput.tint(0.5).saturate(4).hex() as HexColour
	};
}

export function fileToBase64(file: File): Promise<string> {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	return new Promise((resolve, reject) => {
		reader.onload = () => resolve((reader.result ?? '').toString());
		reader.onerror = reject;
	});
}

// https://stackoverflow.com/a/38935990
export function base64toFile(b64: string, filename: string) {
	const array = b64.split(',');
	const mime = (array[0].match(/:(.*?);/) ?? [])[1];
	const bstr = atob(array[array.length - 1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function useFetch(url: string, opts?: any) {
	const fetchOptions = opts ?? {};
	if (!opts || !opts.headers) {
		fetchOptions.headers = {};
	}
	fetchOptions.headers['User-Agent'] = 'worldwidepixel/badger@3.0.0';
	return ofetch(url, fetchOptions);
}

export async function uploadToHost(data: File) {
	const form = new FormData();
	form.append('image', data);
	const imageResult = await useFetch('/internal/upload', {
		method: 'POST',
		body: {
			image: await fileToBase64(data)
		},
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return imageResult;
}

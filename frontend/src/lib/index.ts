import { env } from '$env/dynamic/public';
import chroma from 'chroma-js';
import type { HexColour } from './types';

export const apiBase = env.PUBLIC_API_BASE ?? 'https://api.v3.badger.worldwidepixel.ca/';
export const defaultIcon = '/badger.png';

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
		top: parsedInput.shade(0.6).saturate(1.2).hex() as HexColour,
		bottom: parsedInput.shade(0.85).saturate(2).hex() as HexColour,
		text: parsedInput.tint(0.5).saturate(4).hex() as HexColour
	};
}

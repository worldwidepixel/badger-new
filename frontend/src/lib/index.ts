import { env } from '$env/dynamic/public';
import type { HexColour } from './types';

export const apiBase = env.PUBLIC_API_BASE ?? 'https://api.v3.badger.worldwidepixel.ca/';
export const defaultIcon = '/badger.png';

// https://stackoverflow.com/a/5624139
export function rgbToHex(r: number, g: number, b: number) {
	return ('#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)) as HexColour;
}

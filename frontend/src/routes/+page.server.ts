import { defaultBadge, type Badge } from '@badgered/common';
import type { PageServerLoad } from './$types';
import type { BadgerParameters } from '$lib/types';

export function load({ url }): PageServerLoad<BadgerParameters> {
	const params = url.searchParams;
	const packedParameters: Partial<Badge> = {};

	for (const [key, value] of params) {
		if (Object.keys(defaultBadge).includes(key)) {
			packedParameters[key as keyof Partial<Badge>] = decodeURIComponent(value);
		}
	}

	return { editorParameters: packedParameters } as unknown as PageServerLoad<BadgerParameters>;
}

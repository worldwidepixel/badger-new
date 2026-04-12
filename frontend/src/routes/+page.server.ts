import { defaultBadge, type Badge } from '@badgered/common';

export function load({ url }) {
	const params = url.searchParams;
	const packedParameters: Partial<Badge> = {};

	for (const [key, value] of params) {
		if (Object.keys(defaultBadge).includes(key)) {
			packedParameters[key as keyof Partial<Badge>] = decodeURIComponent(value);
		}
	}

	return { editorParameters: packedParameters };
}

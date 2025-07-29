import { defaultBadge, type Badge } from '@badgered/common';
import { getLocale } from './paraglide/runtime';

export const pageDimensions = $state({
	width: 0,
	height: 0,
	contentHeight: 0
});

export const appDimensions = $state({
	width: 0,
	height: 0
});

export const badgeState = $state<Badge>(defaultBadge);

export const currentLocale = $state({
	locale: getLocale()
});

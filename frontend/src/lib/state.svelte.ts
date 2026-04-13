import { defaultBadge, type Badge } from '@badgered/common';
import { getLocale } from './paraglide/runtime';
import { browser } from '$app/environment';
import type { KeyboardStateType, ThemeProfile } from './types';

export const appDimensions = $state({
	width: 0,
	height: 0
});

export const badgeState = $state<Badge>(defaultBadge);

export const currentLocale = $state({
	locale: getLocale()
});

/* Theming */

export const theme = $state({
	themeProfile: 'light'
});

function setThemeProfile(newTheme: ThemeProfile) {
	if (browser) {
		document.cookie = `themeProfile=${newTheme}; path=/; SameSite=Strict;`;
		document.documentElement.setAttribute('data-theme', newTheme);
	}
	theme.themeProfile = newTheme;
}

export function toggleLightDarkThemeProfile() {
	if (theme.themeProfile !== 'dark') {
		setThemeProfile('dark');
		return;
	}
	setThemeProfile('light');
}

export const keyboardState: KeyboardStateType = $state({
	currentKey: '',
	listeners: []
});

export const pageDimensions = $state({
	width: 0,
	height: 0,
	contentHeight: 0
});

export const debugState = $state({
	weasel: false
});

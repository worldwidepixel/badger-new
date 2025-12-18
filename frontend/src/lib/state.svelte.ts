import { defaultBadge, type Badge } from '@badgered/common';
import { getLocale } from './paraglide/runtime';
import { browser } from '$app/environment';
import type { KeyboardStateType } from './types';

export const appDimensions = $state({
	width: 0,
	height: 0
});

export const badgeState = $state<Badge>(defaultBadge);

export const currentLocale = $state({
	locale: getLocale()
});

export const currentTheme = $state({
	theme: refreshTheme() // Load user theme
});

function refreshTheme() {
	if (browser) {
		document.documentElement.classList.toggle(
			'dark',
			localStorage.theme === 'dark' ||
				(!('theme' in localStorage) &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
		return localStorage.theme;
	}
	return 'light';
}

function setTheme(nextTheme: string) {
	currentTheme.theme = nextTheme;
	if (browser) {
		localStorage.theme = nextTheme;
	}
	refreshTheme();
}

export function toggleTheme() {
	if (currentTheme.theme === 'light') {
		setTheme('dark');
		return;
	}
	setTheme('light');
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

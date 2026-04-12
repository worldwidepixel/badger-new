// Colour

export type HexColour = `#${string}`;

// Keyboard handling

export type KeyboardStateType = {
	currentKey: string;
	listeners: ((event: KeyboardEvent) => void)[];
};

// Theming

export type ThemeProfile = 'dark' | 'light';

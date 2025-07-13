export type Badge = {
	topText: string;
	bottomText: string;
	topTextColour: string;
	bottomTextColour: string;
	topBackgroundColour: string;
	bottomBackgroundColour: string;
	icon: string;
};

// RENDERING

export type MinimalSafeBadge = {
	topText?: string;
	bottomText?: string;
	topTextColour?: string;
	bottomTextColour?: string;
	topBackgroundColour: string;
	bottomBackgroundColour: string;
	icon: string;
};

export type BadgeVariant = "cosy" | "cosy_minimal" | "compact" | "compact_minimal";

export type PathData = {
	topTextData: string;
	bottomTextData: string;
};

export type MinimalRenderProps = {
	topBackgroundColour: string;
	bottomBackgroundColour: string;
	icon: string;
};

export type RenderProps = {
	width: number;
	mediumPath: string;
	extraBoldPath: string;
	topBackgroundColour: string;
	bottomBackgroundColour: string;
	icon: string;
};

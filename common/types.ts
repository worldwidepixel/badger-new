import { defaultBadge } from "./build";

/* export type Badge = {
	topText: string;
	bottomText: string;
	topTextColour: string;
	bottomTextColour: string;
	topBackgroundColour: string;
	bottomBackgroundColour: string;
	icon: string;
}; */

export type Badge = typeof defaultBadge;

// RENDERING

export const V2BadgeVariants = ["cosy", "cosy_minimal", "compact", "compact_minimal"];
export type BadgeVariant = (typeof V2BadgeVariants)[number];

export type V4BadgeVariant = "full" | "full_strokeless";

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

export type BadgeExportType = {
	mime: string;
	extension: string;
	name: string;
};

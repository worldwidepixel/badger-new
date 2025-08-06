import { Font } from "opentype.js";
import xss from "xss";
import { Badge, BadgeVariant, PathData, RenderProps } from "./types";
import { getInterExtraBold, getInterMedium } from "./fonts";
import { compact, compactMinimal, cosy, cosyMinimal } from "./render";
import { sanitiseText } from "./utils";

export async function build(variant: BadgeVariant, props: Badge) {
	const mediumFont: Font = await getInterMedium();
	const extraBoldFont: Font = await getInterExtraBold();

	const pathData = generatePathData(
		mediumFont,
		extraBoldFont,
		props.topText,
		props.topTextColour,
		props.bottomText,
		props.bottomTextColour,
		variant,
	);

	const topTextWidth = calculateTextWidth(props.topText, variant !== "compact" ? 16 : 17, mediumFont);
	const bottomTextWidth = calculateTextWidth(props.bottomText, 17, extraBoldFont);
	const maxWidth = Math.max(topTextWidth, bottomTextWidth);
	const width = variant !== "compact" ? maxWidth + 64 + 24 : topTextWidth + 3.6 + bottomTextWidth + 42 + 8.5;

	let imageUrl = props.icon;

	if (imageUrl?.toString().includes("http")) {
		imageUrl = await toBase64ImageUrl(imageUrl.toString());
	}

	imageUrl = sanitiseText(imageUrl.toString());

	const renderProps: RenderProps = {
		width: width,
		mediumPath: pathData.topTextData,
		extraBoldPath: pathData.bottomTextData,
		topBackgroundColour: props.topBackgroundColour,
		bottomBackgroundColour: props.bottomBackgroundColour,
		icon: imageUrl,
	};

	switch (variant) {
		case "compact":
			return compact(renderProps);
		case "compact_minimal":
			return compactMinimal(renderProps);
		case "cosy_minimal":
			return cosyMinimal(renderProps);
		default:
			return cosy(renderProps);
	}
}

export const defaultIcon = "https://v3.badger.worldwidepixel.ca/badger.png";

// This constant defines the entire badge schema of Badger.
export const defaultBadge = {
	topText: "Made for",
	bottomText: "You",
	topTextColour: "#FFFFFF",
	bottomTextColour: "#FF0066",
	topBackgroundColour: "#8F004C",
	bottomBackgroundColour: "#61003D",
	icon: defaultIcon,
};

// Uhhh... this just assumes all images are PNGs.
async function toBase64ImageUrl(imgUrl: string): Promise<string> {
	const fetchImageUrl = await fetch(imgUrl);
	const responseArrBuffer = await fetchImageUrl.arrayBuffer();
	const toBase64 = `data:${
		fetchImageUrl.headers.get("Content-Type") || "image/png"
	};base64,${btoa(new Uint8Array(responseArrBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ""))}`;
	return toBase64;
}

function generatePathData(
	mediumFont: Font,
	extraBoldFont: Font,
	topText: string,
	topTextColour: string,
	bottomText: string,
	bottomTextColour: string,
	variant: BadgeVariant,
): PathData {
	const mediumPathData =
		variant !== "compact" ? mediumFont.getPath(topText, 64, 24.5, 16) : mediumFont.getPath(topText, 42, 26.5, 17);
	const mediumTextWidth = calculateTextWidth(topText, 17, mediumFont);
	const extraBoldPathData =
		variant !== "compact"
			? extraBoldFont.getPath(bottomText, 64, 43.5, 17)
			: extraBoldFont.getPath(bottomText, mediumTextWidth + 42 + 3.6, 26.5, 17);
	mediumPathData.fill = `${topTextColour}`;
	extraBoldPathData.fill = `${bottomTextColour}`;

	return {
		topTextData: mediumPathData.toSVG(2),
		bottomTextData: extraBoldPathData.toSVG(2),
	};
}

function calculateTextWidth(text: string, size: number, font: Font) {
	const fontSize = size;
	const fontScale = (1 / font.unitsPerEm) * fontSize;

	let width = 0;
	const glyphs = font.stringToGlyphs(text);
	for (let i = 0; i < glyphs.length; i++) {
		const glyph = glyphs[i];

		if (glyph.advanceWidth) {
			width += glyph.advanceWidth * fontScale;
		}
	}
	return width;
}

import { Font } from "opentype.js";
import { Badge, BadgeVariant, PathData, RenderProps } from "./types";
import { getInterExtraBold, getInterMedium } from "./fonts";
import xss from "xss";
import { compact, compactMinimal, cosy, cosyMinimal } from "./render";

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
	);

	const topTextWidth = calculateTextWidth(props.topText, 16, mediumFont);
	const bottomTextWidth = calculateTextWidth(props.bottomText, 17, extraBoldFont);
	const maxWidth = Math.max(topTextWidth, bottomTextWidth);
	const width = maxWidth + 64 + 24;

	let imageUrl = props.icon;

	if (imageUrl?.toString().includes("http")) {
		imageUrl = await toBase64ImageUrl(imageUrl.toString());
	}

	imageUrl = xss(imageUrl.toString());

	const renderProps: RenderProps = {
		width: width,
		mediumPath: pathData.topTextData,
		extraBoldPath: pathData.bottomTextData,
		topBackgroundColour: props.topBackgroundColour,
		bottomBackgroundColour: props.bottomBackgroundColour,
		icon: imageUrl,
	};

	console.log(renderProps);

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
): PathData {
	const mediumPathData = mediumFont.getPath(topText.toString(), 64, 24.5, 16);
	const extraBoldPathData = extraBoldFont.getPath(bottomText.toString(), 64, 43.5, 17);
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

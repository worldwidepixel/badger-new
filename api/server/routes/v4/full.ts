import { Font } from "opentype.js";
import sharp from "sharp";
import { getInterExtraBold, getInterMedium } from "../../lib/fonts";
import { purifyOutput } from "~/lib/purify";

export default defineEventHandler(async (event) => {
	const interMedium = await getInterMedium();
	const interExtraBold = await getInterExtraBold();

	try {
		const query = getQuery(event);
		const backgroundColour = query.color ?? query.colour;
		const lineOne = query.lineOne ?? "undefined";
		const lineTwo = query.lineTwo ?? "undefined";
		const colorOne = query.colorOne ?? query.colourOne;
		const colorTwo = query.colorTwo ?? query.colourTwo;
		const iconUrl = query.iconUrl;
		const format = query.format ?? "svg";

		function getWidth(text: any, size: any, font: Font) {
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

		const mediumPathData = interMedium.getPath(lineOne.toString(), 44, 19, 14);
		const extraBoldPathData = interExtraBold.getPath(lineTwo.toString(), 44, 35, 16);
		mediumPathData.fill = `#${colorOne}`;
		extraBoldPathData.fill = `#${colorTwo}`;

		const mediumPath = mediumPathData.toSVG(2);
		const extraBoldPath = extraBoldPathData.toSVG(2);

		const mediumWidth = getWidth(lineOne.toString(), 14, interMedium);
		const extraBoldWidth = getWidth(lineTwo.toString(), 16, interExtraBold);
		const OTFinalWidth = mediumWidth > extraBoldWidth ? mediumWidth : extraBoldWidth;

		//const width = OTFinalWidth + 64 + 40;
		const width = OTFinalWidth + 50;

		async function toBase64ImageUrl(imgUrl: string): Promise<string> {
			const fetchImageUrl = await fetch(imgUrl);
			const responseArrBuffer = await fetchImageUrl.arrayBuffer();
			const toBase64 = `data:${
				fetchImageUrl.headers.get("Content-Type") || "image/png"
			};base64,${Buffer.from(responseArrBuffer).toString("base64")}`;
			return toBase64;
		}

		let imageUrl = iconUrl;

		if (imageUrl?.toString().includes("http")) {
			imageUrl = await toBase64ImageUrl(imageUrl.toString());
		}

		imageUrl = await purifyOutput(imageUrl.toString());

		//console.log(width);

		let finalSvg = `
<svg width="${width}" height="44" viewBox="0 0 ${width} 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<rect x="1" y="1" width="${width - 2}" height="42" rx="7" fill="#${backgroundColour}"/>
	<rect x="1" y="1" width="${width - 2}" height="42" rx="7" fill="black" fill-opacity="0.7"/>
	<rect x="1" y="1" width="${
		width - 2
	}" height="42" rx="7" fill="url(#paint0_linear_1_99)" fill-opacity="0.3" style="mix-blend-mode:overlay"/>
	<rect x="1" y="1" width="${width - 2}" height="42" rx="7" stroke="#${backgroundColour}" stroke-width="2"/>
	<rect x="1" y="1" width="${width - 2}" height="42" rx="7" stroke="black" stroke-opacity="0.3" stroke-width="2"/>
	<g filter="url(#filter0_d_1_99)">
	<rect x="6" y="6" width="32" height="32" fill="url(#pattern0_1_99)"/>
	</g>
				${mediumPath}
				${extraBoldPath}
	<defs>
		<filter id="filter0_d_1_99" x="0.285715" y="0.285715" width="43.4286" height="43.4286" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix"/>
			<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
			<feOffset/>
			<feGaussianBlur stdDeviation="2.85714"/>
			<feComposite in2="hardAlpha" operator="out"/>
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_99"/>
			<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_99" result="shape"/>
		</filter>
		<pattern id="pattern0_1_99" patternContentUnits="objectBoundingBox" width="1" height="1">
			<use xlink:href="#image0_1_99" transform="scale(0.00195312)"/>
		</pattern>
		<linearGradient id="paint0_linear_1_99" x1="65.5" y1="0" x2="65.5" y2="44" gradientUnits="userSpaceOnUse">
			<stop stop-color="white"/>
			<stop offset="1" stop-color="white" stop-opacity="0"/>
		</linearGradient>
		<image id="image0_1_99" width="512" height="512" xlink:href="${imageUrl}" clip-path="inset(0% round 64px)" />
	</defs>
</svg>
`;

		if (format === "png") {
			setHeader(event, "Content-Type", "image/png");
			let svgBuffer = Buffer.from(finalSvg, "utf-8");
			let convertedPng = sharp(svgBuffer).png().toBuffer();
			return convertedPng;
		} else {
			setHeader(event, "Content-Type", "image/svg+xml");
			return finalSvg;
		}
	} catch {
		return Error;
	}
});

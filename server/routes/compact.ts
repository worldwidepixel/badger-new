import { Font } from "opentype.js";
import sharp from 'sharp';
import { getInterExtraBold, getInterMedium } from "../lib/fonts";

export default defineEventHandler(async (event) => {
	const interMedium = await getInterMedium();
	const interExtraBold = await getInterExtraBold();

	try {
		const query = getQuery(event);
		const gradientStart = query.gradientStart;
		const gradientEnd = query.gradientEnd;
		const lineOne = query.lineOne ?? "undefined";
		const lineTwo = query.lineTwo ?? "undefined";
		const colorOne = query.colorOne ?? query.colourOne;
		const colorTwo = query.colorTwo ?? query.colourTwo;
		const iconUrl = query.iconUrl;
		const format = query.format ?? 'svg';

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

		const mediumPathData = interMedium.getPath(
			lineOne.toString(),
			42,
			26.5,
			17,
		);
		mediumPathData.fill = `#${colorOne}`;
		const mediumPath = mediumPathData.toSVG(2);
		const mediumWidth = getWidth(lineOne.toString(), 17, interMedium);

		const extraBoldPathData = interExtraBold.getPath(
			lineTwo.toString(),
			mediumWidth + 42 + 3.6,
			26.5,
			17,
		);
		extraBoldPathData.fill = `#${colorTwo}`;
		const extraBoldPath = extraBoldPathData.toSVG(2);
		const extraBoldWidth = getWidth(lineTwo.toString(), 17, interExtraBold);

		const OTFinalWidth =
			mediumWidth > extraBoldWidth ? mediumWidth : extraBoldWidth;

		const width = mediumWidth + 3.6 + extraBoldWidth + 42 + 8.5;

		async function toBase64ImageUrl(imgUrl: string): Promise<string> {
			const fetchImageUrl = await fetch(imgUrl);
			const responseArrBuffer = await fetchImageUrl.arrayBuffer();
			const toBase64 = `data:${fetchImageUrl.headers.get("Content-Type") || "image/png"};base64,${Buffer.from(responseArrBuffer).toString("base64")}`;
			return toBase64;
		}

		let imageUrl = iconUrl;

		if (imageUrl?.toString().includes("http" || "https")) {
			imageUrl = await toBase64ImageUrl(imageUrl.toString());
		}

		console.log(width)

		let finalSvg = `
		<svg width="${width}" height="40" viewBox="0 0 ${width} 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<rect width="${width}" height="40" rx="8" fill="url(#paint0_linear_1_56)"/>
			<rect x="1.07143" y="1.07143" width="${width - 2}" height="37.8585" rx="6.92857" stroke="white" stroke-opacity="0.15" stroke-width="2.14286"/>
			<g filter="url(#filter0_d_1_56)">
				<rect x="8" y="6" width="28" height="28" fill="url(#pattern0_1_56)"/>
			</g>
			<g filter="url(#filter1_d_1_56)">
				${mediumPath}
				${extraBoldPath}
			</g>
			<defs>
				<filter id="filter0_d_1_56" x="2.39972" y="0.39972" width="39.202" height="39.202" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix"/>
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
				<feOffset/>
				<feGaussianBlur stdDeviation="2.80014"/>
				<feComposite in2="hardAlpha" operator="out"/>
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_56"/>
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_56" result="shape"/>
			</filter>
			<pattern id="pattern0_1_56" patternContentUnits="objectBoundingBox" width="1" height="1">
				<use xlink:href="#image0_1_56" transform="scale(0.00195312)"/>
			</pattern>
			<filter id="filter1_d_1_56" x="36.2871" y="3.78642" width="${width}" height="32.4286" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix"/>
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
				<feOffset/>
				<feGaussianBlur stdDeviation="2.85714"/>
				<feComposite in2="hardAlpha" operator="out"/>
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_56"/>
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_56" result="shape"/>
			</filter>
			<linearGradient id="paint0_linear_1_56" x1="149.501" y1="0" x2="149.501" y2="40.0014" gradientUnits="userSpaceOnUse">
				<stop stop-color="#${gradientStart}"/>
				<stop offset="1" stop-color="#${gradientEnd}"/>
			</linearGradient>
      		<image id="image0_1_56" width="512" height="512" xlink:href="${imageUrl}" />
		</defs>
	</svg>`

		if (format === 'png') {
			setHeader(event, "Content-Type", "image/png");
			let svgBuffer = Buffer.from(finalSvg, 'utf-8')
			let convertedPng = sharp(svgBuffer).png().toBuffer()
			return convertedPng;
		} else {
			setHeader(event, "Content-Type", "image/svg+xml");
			return finalSvg;
		}

	} catch {
		return Error;
	}
});

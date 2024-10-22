//import opentype from 'opentype.js'
//import TextToSVG from "text-to-svg";

//import TextToSVG from 'text-to-svg';
import { Font } from "opentype.js";
import sharp from "sharp";
import { getInterExtraBold, getInterMedium } from "../lib/fonts";
import { purifyOutput } from "~/lib/purify";

export default defineEventHandler(async (event) => {
	setHeader(event, "Access-Control-Allow-Origin", "*");

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

		const mediumPathData = interMedium.getPath(lineOne.toString(), 64, 24.5, 16);
		const extraBoldPathData = interExtraBold.getPath(lineTwo.toString(), 64, 43.5, 17);
		mediumPathData.fill = `#${colorOne}`;
		extraBoldPathData.fill = `#${colorTwo}`;

		const mediumPath = mediumPathData.toSVG(2);
		const extraBoldPath = extraBoldPathData.toSVG(2);

		const mediumWidth = getWidth(lineOne.toString(), 16, interMedium);
		const extraBoldWidth = getWidth(lineTwo.toString(), 17, interExtraBold);
		const OTFinalWidth = mediumWidth > extraBoldWidth ? mediumWidth : extraBoldWidth;

		//const width = OTFinalWidth + 64 + 40;
		const width = OTFinalWidth + 64 + 24;

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

		let finalSvg = `<svg width="${width}" height="56" viewBox="0 0 ${width} 56" fill="none" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
      <rect x="0" width="${width}" height="56" rx="8" fill="url(#BackgroundGradient)" />
      <rect x="1.05" y="1.05" width="${width - 2}" height="54" rx="6.95" stroke="white"
          stroke-opacity="0.15" stroke-width="2.1" />
      <g filter="url(#IconShadow)">
          <rect x="16" y="8" width="40" height="40" fill="url(#IconPattern)" />
      </g>
      <g filter="url(#TextShadow)">
          <!-- Generate these -->
          ${mediumPath}
          ${extraBoldPath}
      </g>
  </g>
  <defs>
      <filter id="IconShadow" x="10.2857" y="2.28571" width="51.4286" height="51.4286"
          filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2.85714" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="DropShadowEffect" />
          <feBlend mode="normal" in="SourceGraphic" in2="DropShadowEffect" result="shape" />
      </filter>
      <pattern id="IconPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#Icon" transform="scale(0.00195312)" />
      </pattern>
      <filter id="TextShadow" x="58.4" y="3.9" width="806.2" height="48.2"
          filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2.8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="DropShadowEffect" />
          <feBlend mode="normal" in="SourceGraphic" in2="DropShadowEffect" result="shape" />
      </filter>
      <linearGradient id="BackgroundGradient" x1="77.5" y1="0" x2="77.5" y2="56"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#${gradientStart}" /> <!-- gradientStart -->
          <stop offset="1" stop-color="#${gradientEnd}" /> <!-- gradientEnd -->
      </linearGradient>
      <!-- Generate this tag in code -->
      <image id="Icon" width="512" height="512"
          xlink:href="${imageUrl}" clip-path="inset(0% round 64px)" />
  </defs>
</svg>`;

		//if (pngRequested === true) {
		//	//setHeader(event, "Content-Type", "image/png");
		//	const svgBuffer = Buffer.from(finalSvg, 'utf-8')
		//	console.log(svgBuffer)
		//	await sharp(svgBuffer).png().toBuffer().then(output => {
		//return output
		//	})
		//console.log(returnablePng)
		//}

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

	/*return {
	"welcome": "hello",
	"start": gradientStart,
	"end": gradientEnd ,
	"one": lineOne ,
	"two": lineTwo,
	"colourOne": colourOne,
	"colourTwo": colourTwo,
	"icon": iconUrl,
	"svg": finalSvg
  }; */
});

import sharp from "sharp";
import { purifyOutput } from "~/lib/purify";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const gradientStart = query.gradientStart;
    const gradientEnd = query.gradientEnd;
    const iconUrl = query.iconUrl;
    const format = query.format ?? "svg";

    async function toBase64ImageUrl(imgUrl: string): Promise<string> {
      const fetchImageUrl = await fetch(imgUrl);
      const responseArrBuffer = await fetchImageUrl.arrayBuffer();
      const toBase64 = `data:${
        fetchImageUrl.headers.get("Content-Type") || "image/png"
      };base64,${Buffer.from(responseArrBuffer).toString("base64")}`;
      return toBase64;
    }

    let imageUrl = iconUrl;

    if (imageUrl?.toString().includes("http" || "https")) {
      imageUrl = await toBase64ImageUrl(imageUrl.toString());
    }

    imageUrl = await purifyOutput(imageUrl.toString());

    let finalSvg = `
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<rect width="40" height="40" rx="8" fill="url(#paint0_linear_1_68)"/>
	<rect x="1.05" y="1.05" width="37.9" height="37.9" rx="6.95" stroke="white" stroke-opacity="0.15" stroke-width="2.1"/>
	<g filter="url(#filter0_d_1_68)">
		<rect x="6" y="6" width="28" height="28" fill="url(#pattern0_1_68)"/>
	</g>
	<defs>
		<filter id="filter0_d_1_68" x="2" y="2" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix"/>
			<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
			<feOffset/>
			<feGaussianBlur stdDeviation="2"/>
			<feComposite in2="hardAlpha" operator="out"/>
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_68"/>
			<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_68" result="shape"/>
		</filter>
		<pattern id="pattern0_1_68" patternContentUnits="objectBoundingBox" width="1" height="1">
			<use xlink:href="#image0_1_68" transform="scale(0.00195312)"/>
		</pattern>
		<linearGradient id="paint0_linear_1_68" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
			<stop stop-color="#${gradientStart}"/>
			<stop offset="1" stop-color="#${gradientEnd}"/>
		</linearGradient>
		<image id="image0_1_68" width="512" height="512" xlink:href="${imageUrl}"/>
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

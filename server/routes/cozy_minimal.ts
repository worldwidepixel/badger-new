import sharp from 'sharp';

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const gradientStart = query.gradientStart;
		const gradientEnd = query.gradientEnd;
		const iconUrl = query.iconUrl;
		const format = query.format ?? 'svg';

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

		let finalSvg = `
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="56" height="56" rx="8.4" fill="url(#paint0_linear_1_62)"/>
            <rect x="1.05" y="1.05" width="54" height="54" rx="7.35" stroke="white" stroke-opacity="0.15" stroke-width="2.1"/>
        <g filter="url(#filter0_d_1_62)">
            <rect x="8" y="8" width="40" height="40" fill="url(#pattern0_1_62)"/>
        </g>
            <defs>
                <filter id="filter0_d_1_62" x="2.28571" y="2.28571" width="51.4286" height="51.4286" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="2.85714"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_62"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_62" result="shape"/>
                </filter>
                <pattern id="pattern0_1_62" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_1_62" transform="scale(0.00195312)"/>
                </pattern>
                <linearGradient id="paint0_linear_1_62" x1="28" y1="0" x2="28" y2="56" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#${gradientStart}"/>
                    <stop offset="1" stop-color="#${gradientEnd}"/>
                </linearGradient>
                <image id="image0_1_62" width="512" height="512" xlink:href="${imageUrl}"/>
            </defs>
        </svg>
        `;

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

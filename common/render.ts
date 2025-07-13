import { MinimalRenderProps, RenderProps } from "./types";

export function cosy(props: RenderProps) {
	return `
<svg width="${props.width}" height="56" viewBox="0 0 ${props.width} 56" fill="none" xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink">
	<g>
		<rect x="0" width="${props.width}" height="56" rx="8" fill="url(#BackgroundGradient)" />
		<rect x="1.05" y="1.05" width="${props.width - 2}" height="54" rx="6.95" stroke="white" stroke-opacity="0.15"
			stroke-width="2.1" />
		<g filter="url(#IconShadow)">
			<rect x="16" y="8" width="40" height="40" fill="url(#IconPattern)" />
		</g>
		<g filter="url(#TextShadow)">
			<!-- Generate these -->
			${props.mediumPath}
			${props.extraBoldPath}
		</g>
	</g>
	<defs>
		<filter id="IconShadow" x="10.2857" y="2.28571" width="51.4286" height="51.4286" filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha" />
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
		<filter id="TextShadow" x="58.4" y="3.9" width="806.2" height="48.2" filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha" />
			<feOffset />
			<feGaussianBlur stdDeviation="2.8" />
			<feComposite in2="hardAlpha" operator="out" />
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
			<feBlend mode="normal" in2="BackgroundImageFix" result="DropShadowEffect" />
			<feBlend mode="normal" in="SourceGraphic" in2="DropShadowEffect" result="shape" />
		</filter>
		<linearGradient id="BackgroundGradient" x1="77.5" y1="0" x2="77.5" y2="56" gradientUnits="userSpaceOnUse">
			<stop stop-color="${props.topBackgroundColour}" /> <!-- gradientStart -->
			<stop offset="1" stop-color="${props.bottomBackgroundColour}" /> <!-- gradientEnd -->
		</linearGradient>
		<!-- Generate this tag in code -->
		<image id="Icon" width="512" height="512" xlink:href="${props.icon}" clip-path="inset(0% round 64px)" />
	</defs>
</svg>
`;
}

export function compact(props: RenderProps) {
	return `
		<svg width="${props.width}" height="40" viewBox="0 0 ${props.width} 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<rect width="${props.width}" height="40" rx="8" fill="url(#paint0_linear_1_56)"/>
			<rect x="1.07143" y="1.07143" width="${
				props.width - 2
			}" height="37.8585" rx="6.92857" stroke="white" stroke-opacity="0.15" stroke-width="2.14286"/>
			<g filter="url(#filter0_d_1_56)">
				<rect x="8" y="6" width="28" height="28" fill="url(#pattern0_1_56)"/>
			</g>
			<g filter="url(#filter1_d_1_56)">
				${props.mediumPath}
				${props.extraBoldPath}
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
			<filter id="filter1_d_1_56" x="36.2871" y="3.78642" width="${props.width}" height="32.4286" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
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
				<stop stop-color="${props.topBackgroundColour}"/>
				<stop offset="1" stop-color="${props.bottomBackgroundColour}"/>
			</linearGradient>
      		<image id="image0_1_56" width="512" height="512" xlink:href="${props.icon}" clip-path="inset(0% round 64px)" />
		</defs>
	</svg>`;
}

export function cosyMinimal(props: MinimalRenderProps) {
	return `
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
                    <stop stop-color="${props.topBackgroundColour}"/>
                    <stop offset="1" stop-color="${props.bottomBackgroundColour}"/>
                </linearGradient>
                <image id="image0_1_62" width="512" height="512" xlink:href="${props.icon}" clip-path="inset(0% round 64px)" />
            </defs>
        </svg>
        `;
}

export function compactMinimal(props: MinimalRenderProps) {
	return `
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
			<stop stop-color="${props.topBackgroundColour}"/>
			<stop offset="1" stop-color="${props.bottomBackgroundColour}"/>
		</linearGradient>
		<image id="image0_1_68" width="512" height="512" xlink:href="${props.icon}" clip-path="inset(0% round 64px)" />
	</defs>
</svg>

        `;
}

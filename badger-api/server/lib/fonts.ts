import opentype from "opentype.js";

const INTER_MEDIUM_URL = "https://fonts.bunny.net/inter/files/inter-latin-500-normal.woff";
const INTER_EXTRA_BOLD_URL = "https://fonts.bunny.net/inter/files/inter-latin-800-normal.woff";

let bufferMedium: ArrayBuffer | null = null;
let interMedium: opentype.Font | null = null;

export async function getInterMedium(): Promise<opentype.Font> {
	if (!bufferMedium) {
		const res = await fetch(INTER_MEDIUM_URL);
		bufferMedium = await res.arrayBuffer();
		interMedium = opentype.parse(bufferMedium);
	}
	if (!interMedium) {
		throw new Error("Inter Medium font not loaded yet");
	}
	return interMedium;
}

let bufferExtraBold: ArrayBuffer | null = null;
let interExtraBold: opentype.Font | null = null;

export async function getInterExtraBold(): Promise<opentype.Font> {
	if (!bufferExtraBold) {
		const res = await fetch(INTER_EXTRA_BOLD_URL);
		bufferExtraBold = await res.arrayBuffer();
		interExtraBold = opentype.parse(bufferExtraBold);
	}
	if (!interExtraBold) {
		throw new Error("Inter Extra Bold font not loaded yet");
	}
	return interExtraBold;
}

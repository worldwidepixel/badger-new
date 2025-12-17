import opentype from "opentype.js";

class BadgerFont {
	private url: string;
	private buffer: ArrayBuffer | undefined;
	private font: opentype.Font | undefined;
	private name: string;

	public constructor(url: string, name: string) {
		this.name = name;
		this.url = url;
		this.getFont();
	}

	public async getFont() {
		const fontResponse = await fetch(this.url);
		if (!this.buffer) {
			this.buffer = await fontResponse.arrayBuffer();
			this.font = opentype.parse(this.buffer);
		}
		if (!this.font) {
			throw new Error(`${this.name} has not loaded`);
		}
		return this.font;
	}
}

const INTER_MEDIUM_URL = "https://fonts.bunny.net/inter/files/inter-latin-500-normal.woff";
const INTER_EXTRA_BOLD_URL = "https://fonts.bunny.net/inter/files/inter-latin-800-normal.woff";

export const interMediumFont = new BadgerFont(INTER_MEDIUM_URL, "Inter Medium");
export const interExtraBoldFont = new BadgerFont(INTER_EXTRA_BOLD_URL, "Inter Extrabold");

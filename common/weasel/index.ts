import { BadgerFont } from "../fonts";

export const emptyRenderer: WeaselBadgeRenderer = async (fonts: BadgerFont[]) => {
	return "";
};

export function generateKey(...args: string[]) {
	return ["weasel", ...args].join(".");
}

export type WeaselCollection = {
	id: string;
	weasels: { [key: string]: Weasel };
};

// Weasels belong to the same animal family as Badgers, so I thought it'd be fitting.
export class Weasel {
	private id;
	private fonts;
	private parameters;
	private editorGroups;
	private variants;

	private constructor(
		id: string,
		fonts: BadgerFont[],
		parameters: WeaselParameter[],
		editorGroups: WeaselEditorGroup[],
		variants: WeaselBadgeVariant[],
	) {
		this.id = id;
		this.fonts = fonts;
		this.parameters = parameters;
		this.editorGroups = editorGroups;
		this.variants = variants;
	}

	static Builder = class {
		private id: string;
		private parameters;
		private editorGroups: WeaselEditorGroup[] = [];
		private variants: WeaselBadgeVariant[] = [];
		private fonts: BadgerFont[] = [];

		public constructor(id: string, parameters: { [key: string]: WeaselParameter }) {
			this.id = id;
			this.parameters = parameters;
			return this;
		}

		public addEditorGroup(group: (params: { [key: string]: WeaselParameter }) => WeaselEditorGroup) {
			this.editorGroups.push(group(this.parameters));
			return this;
		}

		public addVariant(variant: WeaselBadgeVariant) {
			this.variants.push(variant);
			return this;
		}

		public addFont(font: BadgerFont) {
			this.fonts.push(font);
			return this;
		}

		public build() {
			return new Weasel(this.id, this.fonts, Object.values(this.parameters), this.editorGroups, this.variants);
		}
	};

	public getId() {
		return this.id;
	}
	public getFonts() {
		return this.fonts;
	}
	public getParameters() {
		return this.parameters;
	}
	public getEditorGroups() {
		return this.editorGroups;
	}
	public getVariants() {
		return this.variants;
	}
}

export class WeaselParameter {
	public id;
	public constructor(id: string) {
		this.id = id;
	}
}

export type WeaselEditorGroupIcon = "text" | "image" | "colour";

export class WeaselEditorGroup {
	public id; // Used for translations.
	public icon;
	public linkedInputs;

	private constructor(id: string, icon: WeaselEditorGroupIcon, linkedInputs: WeaselLinkedInput[]) {
		this.id = id;
		this.icon = icon;
		this.linkedInputs = linkedInputs;
	}

	static Builder = class {
		private id;
		private icon;
		private linkedInputs: WeaselLinkedInput[] = [];

		public constructor(id: string, icon: WeaselEditorGroupIcon) {
			this.id = id;
			this.icon = icon;
			return this;
		}

		public addInput(input: WeaselLinkedInput) {
			this.linkedInputs.push(input);
			return this;
		}

		public build() {
			return new WeaselEditorGroup(this.id, this.icon, this.linkedInputs);
		}
	};
}

export class WeaselLinkedInput {
	public id;
	public parameter;
	public defaultValue;
	public inputElement;

	public constructor(id: string, parameter: WeaselParameter, defaultValue: string, inputElement: WeaselInputElement) {
		this.id = id;
		this.parameter = parameter;
		this.defaultValue = defaultValue;
		this.inputElement = inputElement;
	}
}

export class WeaselBiLinkedInput extends WeaselLinkedInput {
	public secondParameter;
	public secondDefaultValue;

	public constructor(
		id: string,
		firstParameter: WeaselParameter,
		firstDefaultValue: string,
		secondParameter: WeaselParameter,
		secondDefaultValue: string,
		inputElement: WeaselInputElement,
	) {
		super(id, firstParameter, firstDefaultValue, inputElement);
		this.secondParameter = secondParameter;
		this.secondDefaultValue = secondDefaultValue;
	}
}

export class WeaselInputElement {
	public id;

	public constructor(id: string) {
		this.id = id;
	}
}

export const weaselInputElements = {
	colour_input: new WeaselInputElement("colour_input"),
	text_input: new WeaselInputElement("text_input"),
	text_colour_input: new WeaselInputElement("text_colour_input"),
	image_input: new WeaselInputElement("image_input"),
	image_colour_input: new WeaselInputElement("image_colour_input"),
};

export class WeaselBadgeVariant {
	public id;
	public renderer;

	public constructor(id: string, renderer: WeaselBadgeRenderer) {
		this.id = id;
		this.renderer = renderer;
	}
}

export type WeaselBadgeRenderer = (fonts: BadgerFont[]) => Promise<string>;

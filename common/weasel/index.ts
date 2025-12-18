import { BadgerFont, interExtraBoldFont, interMediumFont } from "../fonts";

export const emptyRenderer: WeaselBadgeRenderer = async (fonts: BadgerFont[]) => {
	return "";
};

// Weasels belong to the same animal family as Badgers, so I thought it'd be fitting.
export class Weasel {
	private id;
	private fonts;
	private parameters;
	private editorGroups;
	private variantGroups;

	private constructor(
		id: string,
		fonts: BadgerFont[],
		parameters: WeaselParameter[],
		editorGroups: WeaselEditorGroup[],
		variantGroups: WeaselVariantGroup[],
	) {
		this.id = id;
		this.fonts = fonts;
		this.parameters = parameters;
		this.editorGroups = editorGroups;
		this.variantGroups = variantGroups;
	}

	static Builder = class {
		private id: string;
		private parameters;
		private editorGroups: WeaselEditorGroup[] = [];
		private variantGroups: WeaselVariantGroup[] = [];
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

		public addVariantGroup(variantGroup: WeaselVariantGroup) {
			this.variantGroups.push(variantGroup);
			return this;
		}

		public addFont(font: BadgerFont) {
			this.fonts.push(font);
			return this;
		}

		public build() {
			return new Weasel(
				this.id,
				this.fonts,
				Object.values(this.parameters),
				this.editorGroups,
				this.variantGroups,
			);
		}
	};
}

export class WeaselParameter {
	public id;
	public constructor(id: string) {
		this.id = id;
		Object.freeze(this);
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
		Object.freeze(this);
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
	public inputElement;

	public constructor(id: string, parameter: WeaselParameter, inputElement: WeaselInputElement) {
		this.id = id;
		this.parameter = parameter;
		this.inputElement = inputElement;
		Object.freeze(this);
	}
}

export class WeaselBiLinkedInput extends WeaselLinkedInput {
	public secondParameter;

	public constructor(
		id: string,
		firstParameter: WeaselParameter,
		secondParameter: WeaselParameter,
		inputElement: WeaselInputElement,
	) {
		super(id, firstParameter, inputElement);
		this.secondParameter = secondParameter;
		Object.freeze(this);
	}
}

export class WeaselInputElement {
	public id;

	public constructor(id: string) {
		this.id = id;
		Object.freeze(this);
	}
}

export const weaselInputElements = {
	colour_input: new WeaselInputElement("colour_input"),
	text_input: new WeaselInputElement("text_input"),
	text_colour_input: new WeaselInputElement("text_colour_input"),
	image_input: new WeaselInputElement("image_input"),
	image_colour_input: new WeaselInputElement("image_colour_input"),
};

export class WeaselVariantGroup {
	public id;
	public variants;

	private constructor(id: string, variants: WeaselBadgeVariant[]) {
		this.id = id;
		this.variants = variants;
		Object.freeze(this);
	}

	static Builder = class {
		private id;
		private variants: WeaselBadgeVariant[] = [];

		public constructor(id: string) {
			this.id = id;
			return this;
		}

		public addVariant(variant: WeaselBadgeVariant) {
			this.variants.push(variant);
			return this;
		}

		public build() {
			return new WeaselVariantGroup(this.id, this.variants);
		}
	};
}

export class WeaselBadgeVariant {
	public id;
	public renderer;

	public constructor(id: string, renderer: WeaselBadgeRenderer) {
		this.id = id;
		this.renderer = renderer;
		Object.freeze(this);
	}
}

export type WeaselBadgeRenderer = (fonts: BadgerFont[]) => Promise<string>;

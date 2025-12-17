import { BadgerFont, interExtraBoldFont, interMediumFont } from "./fonts";

export async function create() {
	const nothingRenderer = async (fonts: BadgerFont[]) => {
		return "";
	};

	/*
	export const defaultBadge = {
		topText: "Made for",
		bottomText: "You",
		topTextColour: "#FFFFFF",
		bottomTextColour: "#FF0066",
		topBackgroundColour: "#8F004C",
		bottomBackgroundColour: "#61003D",
		icon: defaultIcon,
	};
	 */

	const bwKeys = {
		topText: "topText",
		bottomText: "bottomText",
		topTextColour: "topTextColour",
		bottomTextColour: "bottomTextColour",
		topBackgroundColour: "topBackgroundColour",
		bottomBackgroundColour: "bottomBackgroundColour",
		icon: "icon",
	};

	const badgerWeasel = new Weasel(
		[interMediumFont, interExtraBoldFont],
		Object.keys(bwKeys), // Parameter declarations
		[
			new WeaselBiLinkedInput(bwKeys.topText, bwKeys.topTextColour, weaselInputElements.text_colour_input),
			new WeaselBiLinkedInput(bwKeys.bottomText, bwKeys.bottomTextColour, weaselInputElements.text_colour_input),
			new WeaselLinkedInput(bwKeys.topBackgroundColour, weaselInputElements.colour_input),
			new WeaselLinkedInput(bwKeys.bottomBackgroundColour, weaselInputElements.colour_input),
			new WeaselLinkedInput(bwKeys.icon, weaselInputElements.text_input),
		],
		[new WeaselBadgeVariant("cosy", nothingRenderer)],
	);
}

// Weasels belong to the same animal family as Badgers, so I thought it'd be fitting.
export class Weasel {
	private fonts;
	private parameters;
	private linkedInputs;
	private badgeVariants;

	public constructor(
		fonts: BadgerFont[],
		parameters: WeaselParameter[],
		linkedInputs: WeaselLinkedInput[],
		badgeVariants: WeaselBadgeVariant[],
	) {
		this.fonts = fonts;
		this.parameters = parameters;
		this.linkedInputs = linkedInputs;
		this.badgeVariants = badgeVariants;
	}
}

export type WeaselParameter = string;

export class WeaselLinkedInput {
	public parameterId;
	public inputElement;

	public constructor(parameterId: string, inputElement: WeaselInputElement) {
		this.parameterId = parameterId;
		this.inputElement = inputElement;
		Object.freeze(this);
	}
}

export class WeaselBiLinkedInput extends WeaselLinkedInput {
	public secondParameterId;

	public constructor(firstParameterId: string, secondParameterId: string, inputElement: WeaselInputElement) {
		super(firstParameterId, inputElement);
		this.secondParameterId = secondParameterId;
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

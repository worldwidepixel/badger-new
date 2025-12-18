import {
	emptyRenderer,
	Weasel,
	WeaselBadgeVariant,
	WeaselBiLinkedInput,
	WeaselCollection,
	WeaselEditorGroup,
	weaselInputElements,
	WeaselLinkedInput,
	WeaselParameter,
} from "../";
import { interExtraBoldFont, interMediumFont } from "../fonts";

const classicWeasel: Weasel = new Weasel.Builder("classic", {
	icon: new WeaselParameter("icon"),
	topText: new WeaselParameter("topText"),
	bottomText: new WeaselParameter("bottomText"),
	topTextColour: new WeaselParameter("topTextColour"),
	bottomTextColour: new WeaselParameter("bottomTextColour"),
	topBackgroundColour: new WeaselParameter("topBackgroundColour"),
	bottomBackgroundColour: new WeaselParameter("bottomBackgroundColour"),
})
	.addFont(interMediumFont)
	.addFont(interExtraBoldFont)
	.addEditorGroup((p) =>
		new WeaselEditorGroup.Builder("text", "text")
			.addInput(
				new WeaselBiLinkedInput(
					"text_top",
					p.topText,
					"Made for",
					p.topTextColour,
					"#FFFFFF",
					weaselInputElements.text_colour_input,
				),
			)
			.addInput(
				new WeaselBiLinkedInput(
					"text_bottom",
					p.bottomText,
					"You",
					p.bottomTextColour,
					"#FF0066",
					weaselInputElements.text_colour_input,
				),
			)
			.build(),
	)
	.addEditorGroup((p) =>
		new WeaselEditorGroup.Builder("icon", "image")
			.addInput(
				new WeaselLinkedInput(
					"image_icon",
					p.icon,
					"https://v3.badger.worldwidepixel.ca/badger.png",
					weaselInputElements.image_colour_input,
				),
			)
			.build(),
	)
	.addEditorGroup((p) =>
		new WeaselEditorGroup.Builder("background", "colour")
			.addInput(
				new WeaselLinkedInput(
					"colour_background_top",
					p.topBackgroundColour,
					"#8F004C",
					weaselInputElements.colour_input,
				),
			)
			.addInput(
				new WeaselLinkedInput(
					"colour_background_bottom",
					p.bottomBackgroundColour,
					"#61003D",
					weaselInputElements.colour_input,
				),
			)
			.build(),
	)
	.addEditorGroup((p) =>
		new WeaselEditorGroup.Builder("test", "text")
			.addInput(
				new WeaselLinkedInput(
					"test_colour_input",
					p.topTextColour,
					"#FFFFFF",
					weaselInputElements.colour_input,
				),
			)
			.addInput(new WeaselLinkedInput("test_text_input", p.topText, "Made for", weaselInputElements.text_input))
			.addInput(
				new WeaselBiLinkedInput(
					"test_text_colour_input",
					p.bottomText,
					"You",
					p.topBackgroundColour,
					"#8F004C",
					weaselInputElements.text_colour_input,
				),
			)
			.addInput(
				new WeaselLinkedInput(
					"test_image_input",
					p.icon,
					"https://v3.badger.worldwidepixel.ca/badger.png",
					weaselInputElements.image_input,
				),
			)
			.addInput(
				new WeaselBiLinkedInput(
					"test_image_colour_input",
					p.icon,
					"https://v3.badger.worldwidepixel.ca/badger.png",
					p.bottomBackgroundColour,
					"#61003D",
					weaselInputElements.image_colour_input,
				),
			)
			.build(),
	)
	.addVariant(new WeaselBadgeVariant("cosy", emptyRenderer))
	.addVariant(new WeaselBadgeVariant("cosy_minimal", emptyRenderer))
	.addVariant(new WeaselBadgeVariant("compact", emptyRenderer))
	.addVariant(new WeaselBadgeVariant("compact_minimal", emptyRenderer))

	.build();

export const badgerWeaselCollection: WeaselCollection = {
	id: "badger",
	weasels: {
		classic: classicWeasel,
	},
};

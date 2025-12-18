import {
	emptyRenderer,
	Weasel,
	WeaselBadgeVariant,
	WeaselBiLinkedInput,
	WeaselEditorGroup,
	weaselInputElements,
	WeaselLinkedInput,
	WeaselParameter,
	WeaselVariantGroup,
} from ".";
import { interExtraBoldFont, interMediumFont } from "../fonts";

const badgerWeasel: Weasel = new Weasel.Builder("badger", {
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
				new WeaselBiLinkedInput("text_top", p.topText, p.topTextColour, weaselInputElements.text_colour_input),
			)
			.addInput(
				new WeaselBiLinkedInput(
					"text_bottom",
					p.bottomText,
					p.bottomTextColour,
					weaselInputElements.text_colour_input,
				),
			)
			.build(),
	)
	.addEditorGroup((p) =>
		new WeaselEditorGroup.Builder("icon", "image")
			.addInput(new WeaselLinkedInput("image_icon", p.icon, weaselInputElements.text_colour_input))
			.build(),
	)
	.addEditorGroup((p) =>
		new WeaselEditorGroup.Builder("background", "colour")
			.addInput(
				new WeaselLinkedInput("colour_background_top", p.topBackgroundColour, weaselInputElements.colour_input),
			)
			.addInput(
				new WeaselLinkedInput(
					"colour_background_bottom",
					p.bottomBackgroundColour,
					weaselInputElements.colour_input,
				),
			)
			.build(),
	)
	.addVariantGroup(
		new WeaselVariantGroup.Builder("v2")
			.addVariant(new WeaselBadgeVariant("cosy", emptyRenderer))
			.addVariant(new WeaselBadgeVariant("cosy_minimal", emptyRenderer))
			.addVariant(new WeaselBadgeVariant("compact", emptyRenderer))
			.addVariant(new WeaselBadgeVariant("compact_minimal", emptyRenderer))
			.build(),
	)
	.addVariantGroup(
		new WeaselVariantGroup.Builder("v4")
			.addVariant(new WeaselBadgeVariant("full", emptyRenderer))
			.addVariant(new WeaselBadgeVariant("full_strokeless", emptyRenderer))
			.build(),
	)

	.build();

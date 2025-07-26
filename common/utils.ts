import xss from "xss";
import { Badge, BadgeVariant, V2BadgeVariants } from "./types";

export function sanitiseText(text: string) {
	return xss(text);
}

export function isBadgeType(test: string) {
	return V2BadgeVariants.includes(test);
}

export function getWittyComment() {
	const splashes = [
		"Oh no!",
		"Skill Issue!",
		"We need to burrow back to you.",
		"Please come back in regular business hours.",
		"Try turning it off and on again!",
		"Oops!",
		"It seems I have died.",
		"Have you cleared your cache?",
		"Probably your fault.",
		"Hi! I'm Badger, and I'm a crashaholic.",
		"Probably not meant to happen.",
		"Is Cloudflare down?",
		"Is GitHub down?",
		"explod",
		"Not broken at all!",
		"How did you get here?",
		"Mind the gap.",
		"Does it work on Firefox?",
		"Try Internet Explorer instead.",
		">:3",
		"Are you sure this isn't staging?",
		"Good to see you!",
		"Your fault.",
		"My fault.",
		"Enable your adblocker.",
		"And the dish ran away with the spoon.",
		"Would you like a soundtrack with that?",
		"F*cking hell, Gradle",
	];

	return splashes[Math.floor(Math.random() * splashes.length)];
}

export function createEmbedUrl(
	data: Badge,
	type: BadgeVariant,
	apiBase: string,
	format?: string,
	apiVersion?: string,
	badgeFormat?: string,
) {
	return [
		apiBase,
		!apiBase.endsWith("/") ? "/" : "",
		[apiVersion ?? "v3", "format", badgeFormat ?? "v2", type].join("/"),
		[
			"?topText=" + data.topText,
			"&bottomText=" + data.bottomText,
			"&topTextColour=" + data.topTextColour,
			"&bottomTextColour=" + data.bottomTextColour,
			"&topBackgroundColour=" + data.topBackgroundColour,
			"&bottomBackgroundColour=" + data.bottomBackgroundColour,
			"&icon=" + encodeURIComponent(data.icon),
			format ? "&format=" + format : "",
		].join(""),
	].join("");
}

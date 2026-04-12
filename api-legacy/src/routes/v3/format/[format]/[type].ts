import { Badge, BadgeVariant, build, defaultBadge, isBadgeType } from "@badgered/common";

export default defineEventHandler(async (event) => {
	const status = getResponseStatus(event);
	const { format, type } = getRouterParams(event);

	setHeader(event, "Access-Control-Allow-Origin", "*");

	if (format && type) {
		switch (format) {
			case "v2":
				if (isBadgeType(type)) {
					return returnBuild(type, defaultBadge, event);
				}
		}
	}

	throw createError({
		status: 404,
		statusMessage: "Badge format not found",
	});
});

async function returnBuild(type: BadgeVariant, badge: Badge, event: any) {
	setHeader(event, "Content-Type", "image/svg+xml");
	return await build(type, badge);
}

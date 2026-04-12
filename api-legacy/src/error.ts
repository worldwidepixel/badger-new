import { getWittyComment } from "@badgered/common";

export default defineNitroErrorHandler((error, event) => {
	setResponseHeader(event, "Content-Type", "application/json");
	return send(
		event,
		JSON.stringify({
			url: event.path,
			status_code: error.statusCode,
			status_name: error.name,
			message: error.message,
			witty_comment: getWittyComment(),
		}),
	);
});

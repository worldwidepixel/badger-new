export default defineEventHandler(async (event) => {
	const status = getResponseStatus(event);
	return { code: 404, description: "route not found" };
});

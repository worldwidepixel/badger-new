export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const modrinth_api_base = "https://api.modrinth.com/v3/";
		const headers = { UserAgent: "worldwidepixel/badger@2.0.0, Badger Wrappers, hello@worldwidepixel.ca" };
		const data: any = await $fetch(modrinth_api_base + `project/${query.project ?? "fabric-api"}`, {
			headers: headers,
		});
		const formatter = new Intl.NumberFormat("en-GB", { notation: "standard" });
		const colour = data.color.toString(16) ?? "1bd96a";
		const icon = data.icon_url ?? "https://modrinth.com/favicon.ico";
		const line_one_text = `${formatter.format(data.downloads ?? 0)} download${(data.downloads ?? 0) != 1 ? "s" : ""}`;
		const line_two_text = "on Modrinth";
		let badge_url = `/v4/full?colour=${colour}&lineOne=${line_one_text}&lineTwo=${line_two_text}&colourOne=FFFFFF&colourTwo=FFFFFF&iconUrl=${icon}`;
		if (query.format) {
			badge_url = badge_url + "&format=png";
		}
		const final_badge = await $fetch(badge_url);
		return final_badge;
	} catch {
		return Error;
	}
});

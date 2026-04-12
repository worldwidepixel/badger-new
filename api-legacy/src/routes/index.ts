import packageInfo from "../../package.json"

export default defineEventHandler(async (event) => {
	return {
		about: packageInfo.description,
		documentation: "Not yet available. https://badger.worldwidepixel.ca",
		name: packageInfo.name,
		version: packageInfo.version,
	};
});

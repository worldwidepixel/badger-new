import { Hono } from "hono";
import centralPackageInfo from "../../package.json";
import appPackageInfo from "../package.json";

const app = new Hono();

app.get("/", (c) => {
	return c.json({
		about: appPackageInfo.description,
		documentation: "Not yet available. https://badger.worldwidepixel.ca",
		name: appPackageInfo.name,
		version: centralPackageInfo.version,
	});
});

export default app;

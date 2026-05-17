/* eslint-disable @typescript-eslint/no-unused-vars */
export function createRequire(_filename: string | URL): NodeRequire {
	const req = function require(id: string): never {
		throw new Error(`Cannot use require() in Cloudflare Workers.`);
	};
	req.resolve = () => {
		throw new Error('Not supported');
	};
	/* @ts-expect-error argh */
	req.resolve.paths = () => null;
	req.cache = {};
	req.extensions = {};
	req.main = undefined;
	return req as unknown as NodeRequire;
}
export function isBuiltin() {
	return false;
}
export function findSourceMap() {
	return undefined;
}
export function syncBuiltinESMExports() {}
export default { createRequire, isBuiltin, findSourceMap, syncBuiltinESMExports };

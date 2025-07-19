import { santitiseText } from "@badgered/common";

/** @deprecated */
export async function purifyOutput(input: string): Promise<String> {
	const cleanOutput = santitiseText(input);
	return cleanOutput;
}

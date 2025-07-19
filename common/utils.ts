import { V2BadgeVariants } from "./types";

export function isBadgeType(test: string) {
	return V2BadgeVariants.includes(test);
}

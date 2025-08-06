import type { Badge } from '@badgered/common';

export type DeploymentInfo = {
	deployment_branch: string;
	deployment_hash: string;
};

// Colour

export type HexColour = `#${string}`;

// Editor

export type BadgerParameters = {
	editorParameters: Partial<Badge>;
} & DeploymentInfo;

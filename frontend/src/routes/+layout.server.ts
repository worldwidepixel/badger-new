import { CF_PAGES_BRANCH, CF_PAGES_COMMIT_SHA, ORIGIN } from '$env/static/private';
import type { DeploymentInfo } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export function load(): LayoutServerLoad<DeploymentInfo> {
	console.log(ORIGIN ?? 'WHAT');
	return {
		deployment_branch: CF_PAGES_BRANCH ?? 'local',
		deployment_hash: CF_PAGES_COMMIT_SHA ?? 'unknown'
	} as unknown as LayoutServerLoad<DeploymentInfo>;
}

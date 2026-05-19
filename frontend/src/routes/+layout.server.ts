//import { CF_PAGES_BRANCH, CF_PAGES_COMMIT_SHA } from '$env/static/private';
import {
	WORKERS_CI_BRANCH as BRANCH,
	WORKERS_CI_COMMIT_SHA as COMMIT_SHA
} from '$env/static/private';

export function load({ cookies }) {
	return {
		deployment_info: {
			branch: BRANCH ?? 'local',
			git_hash: COMMIT_SHA ?? 'unknown'
		},
		savedThemeProfile: cookies.get('themeProfile')
	};
}

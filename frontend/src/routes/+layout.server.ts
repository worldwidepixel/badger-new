import { CF_PAGES_BRANCH, CF_PAGES_COMMIT_SHA } from '$env/static/private';

export function load({ cookies }) {
	return {
		deployment_info: {
			branch: CF_PAGES_BRANCH ?? 'local',
			git_hash: CF_PAGES_COMMIT_SHA ?? 'unknown'
		},
		savedThemeProfile: cookies.get('themeProfile')
	};
}

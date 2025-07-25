import { env } from '$env/dynamic/public';

export const apiBase = env.PUBLIC_API_BASE ?? 'https://api.v3.badger.worldwidepixel.ca/';

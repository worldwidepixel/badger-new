import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		noExternal: ['opentype.js']
	},
	resolve: {
		alias: {
			fs: path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/lib/fake-fs.ts')
		}
	}
});

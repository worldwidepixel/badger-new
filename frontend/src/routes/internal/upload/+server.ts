import { error } from '@sveltejs/kit';
import { base64toFile, useFetch } from '$lib';

export async function POST({ request }) {
	const { image } = await request.json();
	//console.log(image);
	const form = new FormData();
	form.append('fileToUpload', base64toFile(image, 'Badger Embed Icon'));
	form.append('reqtype', 'fileupload');
	const data = await useFetch('https://catbox.moe/user/api.php', {
		method: 'POST',
		body: form
	}).catch((e) => {
		console.error(e.data);
		error(e.data.status_code ?? 500, 'Failed to upload image: ' + e.data);
	});

	const response = new Response(JSON.stringify(data), {
		status: data.status_code ?? 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
}

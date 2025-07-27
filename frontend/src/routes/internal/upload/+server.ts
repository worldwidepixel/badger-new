import { useFetch } from '$lib';
import { error, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (requestData) => {
	const requestBody = await requestData.request.json();
	const form = new FormData();
	form.append('image', requestBody.image ?? '');
	form.append('key', requestBody.key ?? '');
	const data = await useFetch('https://freeimage.host/api/1/upload', {
		method: 'POST',
		body: form
	}).catch((e) => {
		console.error(e.data);
		error(e.data.status_code, 'Failed to upload image.' + JSON.stringify(e.data));
	});

	const response = new Response(JSON.stringify(data), {
		status: data.status_code ?? 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

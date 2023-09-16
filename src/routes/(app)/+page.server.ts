import cfetch from '$lib/cfetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const listingsPromise = cfetch(`/api/listings/feed`, 'GET', fetch);

	return {
		streamed: {
			listingsPromise
		}
	};
};

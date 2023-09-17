import cfetch from '$lib/cfetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url: { searchParams } }) => {
	const query = searchParams.get('q');

	const listingsPromise = cfetch(`/api/listings/feed${query ? '?q=' + query : ''}`, 'GET', fetch);

	return {
		streamed: {
			listingsPromise
		}
	};
};

import cfetch from '$lib/cfetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const uid = params.uid;

	const listingPromise = cfetch<TCompleteListing>(`/api/listings/${uid}`, 'GET', fetch);

	return {
		streamed: {
			listingPromise
		}
	};
};

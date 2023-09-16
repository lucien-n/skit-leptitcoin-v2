import cfetch from '$lib/cfetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const uid = params.uid;

	const listingPromise: Promise<{ data: TListing[]; error: string }> = cfetch(
		`/api/listings/${uid}`,
		'GET',
		fetch
	);

	return {
		streamed: {
			listingPromise
		}
	};
};

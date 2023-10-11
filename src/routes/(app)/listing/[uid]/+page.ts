import { cfetch } from '$lib/cfetch';
import { currentListingStore } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const uid = params.uid;

	let listing: TListing;

	if (currentListingStore.is(uid))
		listing = currentListingStore.get() as TListing; // will always return a listing
	else {
		const { data, error } = await cfetch<TListing[]>(`/api/listings/${uid}`, 'GET', fetch);
		if (!error && data && data.length > 0) listing = data[0] as TListing;
		else throw redirect(303, '/');
	}

	const authorPromise = cfetch<TProfile>(`/api/users/${listing.author.uid}/profile`, 'GET', fetch);

	return {
		listing,
		streamed: {
			authorPromise
		}
	};
};

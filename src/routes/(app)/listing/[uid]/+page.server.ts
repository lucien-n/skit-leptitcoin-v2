import cfetch from '$lib/cfetch';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const uid = params.uid;

	const getCompleteListing = async (): Promise<{
		listing?: TCompleteListing;
		error?: string;
	}> => {
		const { data, error } = await cfetch(`/api/listings/${uid}`, 'GET', fetch);

		if (error) throw redirect(303, '/');

		if (!(data.length > 0)) return { error };

		const listing = data?.[0] as TListing;

		const { data: authorData, error: authorError } = await cfetch(
			`/api/users/${listing.author.uid}/profile`,
			'GET',
			fetch
		);

		if (authorError || !(authorData.length > 0)) return { error: 'Could not find author profile' };

		const author = authorData?.[0] as TProfile;

		const completeListing = { ...listing, author } as TCompleteListing;

		return { listing: completeListing };
	};

	return {
		streamed: {
			listingPromise: getCompleteListing()
		}
	};
};

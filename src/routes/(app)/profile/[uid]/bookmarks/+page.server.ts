import cfetch from '$lib/cfetch';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, PageServerParentData } from './$types';

export const load: PageServerLoad = async ({ fetch, parent }) => {
	const { profile }: PageServerParentData = await parent();

	if (!profile) throw redirect(303, '/');

	const getBookmarkedListings = async (): Promise<TListing[]> => {
		const { data, error } = await cfetch(`/api/users/${profile.uid}/bookmarks`, 'GET', fetch);
		if (error) return [];

		const bookmarks = data as TBookmark[];

		const listings: TListing[] = [];
		for (const bookmark of bookmarks) {
			const { data, error } = await cfetch(`/api/listings/${bookmark.listing_uid}`, 'GET', fetch);
			if (error || !data) continue;

			const listing = data[0] as TListing;
			listings.push(listing);
		}

		return listings;
	};

	return {
		streamed: {
			getBookmarkedListings: getBookmarkedListings()
		}
	};
};

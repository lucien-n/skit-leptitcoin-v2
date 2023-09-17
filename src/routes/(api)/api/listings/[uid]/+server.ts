import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, uid } }) => {
	const query = supabase
		.from('listings')
		.select(
			'uid, title, description, category, condition, created_at, author:profiles(author_uid:uid, name)'
		)
		.match({ uid });

	const { data, error }: DbResult<typeof query> = await query;

	if (error) return new Response(JSON.stringify({ error }), { status: 500 });

	const listing_data = data?.[0];

	if (!listing_data) return new Response(null, { status: 204 });

	const author_data = listing_data.author;

	const author = {
		// @ts-expect-error: Typescript for some reasons thinks that the returned object is a list
		uid: author_data.author_uid || 'unknown',
		// @ts-expect-error: Typescript for some reasons thinks that the returned object is a list
		name: author_data.name || 'Unknown'
	};
	const listing = {
		uid: listing_data.uid,
		author,
		title: listing_data.title,
		description: listing_data.description,
		category: listing_data.category,
		condition: listing_data.condition,
		created_at: listing_data.created_at
	} satisfies TListing;

	return new Response(JSON.stringify({ data: [listing] }), { status: 200 });
};

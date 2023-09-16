import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
	const query = supabase
		.from('listings')
		.select('uid, author_uid, title, description, category, condition, created_at')
		.range(0, 15);

	const { data, error }: DbResult<typeof query> = await query;

	if (error) return new Response(JSON.stringify({ error }), { status: 500 });

	if (!data) return new Response(null, { status: 204 });

	const listings: TListing[] = [];

	for (const listing_data of data) {
		const listing = {
			uid: listing_data.uid,
			author_uid: listing_data.author_uid,
			title: listing_data.title,
			description: listing_data.description,
			category: listing_data.category,
			condition: listing_data.condition,
			created_at: listing_data.created_at
		} satisfies TListing;
		listings.push(listing);
	}

	return new Response(JSON.stringify({ data: listings }), { status: 200 });
};

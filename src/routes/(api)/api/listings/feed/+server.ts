import { getHeaders, getRouteExpiration } from '$lib/server/cache';
import { redis } from '$lib/server/redis';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	locals: { supabase },
	url: { searchParams },
	setHeaders
}) => {
	let headers = getHeaders('listings/feed');
	const param = searchParams.get('q');

	let query = supabase
		.from('listings')
		.select(
			'uid, price, title, description, category, condition, created_at, author:profiles(author_uid:uid, name)'
		)
		.range(0, 15);
	if (param) query = query.ilike('title', `%${param}%`);

	const { data, error }: DbResult<typeof query> = await query;

	if (error) return new Response(JSON.stringify({ error }), { status: 500 });

	if (!data) return new Response(null, { status: 204 });

	const listings: TListing[] = [];

	for (const listing_data of data) {
		const redisKey = 'listing:' + listing_data.uid;
		const cached = await redis.get(redisKey);

		if (cached) {
			const ttl = await redis.ttl(redisKey);
			headers = { 'Cache-Control': `max-age=${ttl}` };
			const listing = JSON.parse(cached);
			if (listing satisfies TListing) listings.push(listing);
		}

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
			price: listing_data.price,
			title: listing_data.title,
			description: listing_data.description,
			category: listing_data.category,
			condition: listing_data.condition,
			created_at: listing_data.created_at
		} satisfies TListing;

		listings.push(listing);

		if (!cached) {
			redis.set(
				listing_data.uid,
				JSON.stringify(listing),
				'EX',
				getRouteExpiration('listings/feed')
			);
		}
	}

	setHeaders(headers);

	return new Response(JSON.stringify({ data: listings }), { status: 200 });
};

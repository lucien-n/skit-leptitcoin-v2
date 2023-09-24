import { getHeaders, getRouteExpiration } from '$lib/server/cache';
import { redis } from '$lib/server/redis';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ setHeaders, locals: { supabase, uid } }) => {
	let headers = getHeaders('listings/listing');

	const redisKey = 'listing:' + uid;
	const cached = await redis.get(redisKey);

	if (cached) {
		const ttl = await redis.ttl(redisKey);
		headers = { 'Cache-Control': `max-age=${ttl}` };
		return new Response(JSON.stringify({ data: [JSON.parse(cached)] }), { status: 200 });
	}

	const query = supabase
		.from('listings')
		.select(
			'uid, price, title, description, category, condition, image, created_at, author:profiles(author_uid:uid, name)'
		)
		.match({ uid });

	const { data, error }: DbResult<typeof query> = await query;

	if (error) return new Response(JSON.stringify({ error }), { status: 500 });

	const listingData = data?.[0];

	if (!listingData) return new Response(null, { status: 204 });

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const authorData: { author_uid: string; name: string } = listingData.author;

	const listing = {
		uid: listingData.uid,
		author: {
			uid: authorData.author_uid,
			name: authorData.name
		},
		price: listingData.price,
		title: listingData.title,
		description: listingData.description,
		category: listingData.category,
		condition: listingData.condition,
		created_at: listingData.created_at,
		image: listingData.image
	} satisfies TListing;

	redis.set(redisKey, JSON.stringify(listing), 'EX', getRouteExpiration('listings/listing'));

	setHeaders(headers);

	return new Response(JSON.stringify({ data: [listing] }), { status: 200 });
};

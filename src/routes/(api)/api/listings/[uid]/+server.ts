import { getHeaders, getRouteExpiration } from '$lib/server/cache';
import { checkUid } from '$lib/server/helper';
import { redis } from '$lib/server/redis';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	setHeaders,
	locals: { supabase },
	params: { uid }
}) => {
	if (!uid) return new Response(null, { status: 422 });

	const headers = getHeaders('listings/listing');

	let uids: string[] = [];

	if (uid.length > 36) uids = uid.split(';');
	else uids.push(uid);
	uids = uids.filter((id) => checkUid(id));

	const offset = 0;
	const limit = 10;

	const listings: TListing[] = [];

	for (const id of uids) {
		const redisKey = 'listing:' + id;
		const cached = await redis.get(redisKey);

		if (cached && (JSON.parse(cached) satisfies TListing)) {
			listings.push(JSON.parse(cached) as TListing);
			uids = uids.filter((_id) => _id != id);
		}
	}

	if (uids.length == 0) return new Response(JSON.stringify({ data: listings }), { status: 200 });

	const query = supabase
		.from('listings')
		.select(
			'uid, price, title, description, category, condition, image, created_at, author:profiles(author_uid:uid, name)'
		)
		.match({ is_validated: true })
		.in('uid', uids)
		.range(offset, limit + offset);

	const { data, error }: DbResult<typeof query> = await query;

	if (error) return new Response(JSON.stringify({ error }), { status: 500 });
	if (!(data.length > 0)) return new Response(null, { status: 204 });

	for (const listingData of data) {
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

		const redisKey = 'listing:' + listing.uid;
		redis.set(redisKey, JSON.stringify(listing), 'EX', getRouteExpiration('listings/listing'));
	}

	setHeaders(headers);

	return new Response(JSON.stringify({ data: listings }), { status: 200 });
};

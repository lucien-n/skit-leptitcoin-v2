import { getRouteExpiration } from '$lib/server/cache';
import { checkUid } from '$lib/server/helper';
import { redis } from '$lib/server/redis';
import { parseListings } from '$lib/server/supabase/listings';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

const getCachedBookmarkedListings = async (uids: string[]) => {
	const listings: TListing[] = [];

	for (const id of uids) {
		const redisKey = 'listing:' + id;
		const cached = await redis.get(redisKey);

		if (cached && (JSON.parse(cached) satisfies TListing)) {
			listings.push(JSON.parse(cached) as TListing);
			uids = uids.filter((_id) => _id != id);
		}
	}

	return { listings, uids };
};

const getSupaBookmarkedListings = async (
	supabase: SupabaseClient,
	uids: string[],
	offset: number = 0,
	limit: number = 10
) => {
	const query = supabase
		.from('listings')
		.select(
			'uid, price, title, description, category, condition, image, created_at, author:profiles(uid:uid, name)'
		)
		.match({ is_validated: true })
		.in('uid', uids)
		.range(offset, limit + offset);

	const { data, error, status }: DbResult<typeof query> = await query;

	if (error) return { error, status };
	if (!(data.length > 0)) return { status };
	return { data };
};

const cacheSupaListings = async (supaListings: TListing[]) => {
	for (const listing of supaListings) {
		const redisKey = 'listing:' + listing.uid;
		redis.set(redisKey, JSON.stringify(listing), 'EX', getRouteExpiration('listings/listing'));
	}
};

export const GET: RequestHandler = async ({ locals: { supabase }, params: { uid } }) => {
	if (!uid) return new Response(null, { status: 422 });

	let uids: string[] = [];

	if (uid.length > 36) uids = uid.split(';');
	else uids.push(uid);
	uids = uids.filter((id) => checkUid(id));

	const offset = 0;
	const limit = 10;

	const { listings: cachedListings, uids: remainingUids } = await getCachedBookmarkedListings(uids);

	if (remainingUids.length == 0)
		return new Response(JSON.stringify({ data: cachedListings }), { status: 200 });

	const { data, error, status } = await getSupaBookmarkedListings(
		supabase,
		remainingUids,
		offset,
		limit
	);
	if (error) return new Response(JSON.stringify({ error }), { status });
	const supaListings = parseListings(data);

	await cacheSupaListings(supaListings);

	return new Response(JSON.stringify({ data: supaListings }), { status: 200 });
};

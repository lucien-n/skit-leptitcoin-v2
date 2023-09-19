import { getHeaders } from '$lib/server/cache';
import { checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	locals: { supabase },
	url: { searchParams },
	setHeaders,
	fetch
}) => {
	const headers = getHeaders('listings/search');

	const params: {
		query?: string;
		offset?: number;
		condition?: number;
		category?: string;
		priceMin?: number;
		priceMax?: number;
		order: 'ASC' | 'DESC';
		orderBy: string;
	} = { order: 'DESC', orderBy: 'created_at' };

	const query = searchParams.get('q');
	if (query) params.query = query;

	const condition = parseInt(searchParams.get('condition') || '-1');
	if (condition >= 0 && condition <= 4) params.condition = condition;

	const category = searchParams.get('category');
	if (category) params.category = category;

	const priceMin = parseInt(searchParams.get('price-min') || '0');
	if (priceMin && priceMin > 0) params.priceMin = priceMin;

	const priceMax = parseInt(searchParams.get('price-min') || '0');
	if (priceMax && priceMax > priceMin) params.priceMax = priceMax;

	const { data, error } = await supabase.functions.invoke('get-listings-search', {
		body: params
	});

	if (error) return new Response(null, { status: 500 });

	if (!data) return new Response(null, { status: 204 });

	const uids = data
		.filter(({ uid }: { uid: string }) => checkUid(uid))
		.map(({ uid }: { uid: string }) => uid);

	if (!uids) return new Response(null, { status: 204 });

	const listings: TListing[] = [];

	for (const uid of uids) {
		const url = `/api/listings/${uid}`;
		const res = await fetch(url);

		if (!res.ok) continue;

		const { data } = await res.json();

		if (!data) continue;

		const listing = data[0];

		if (!(listing satisfies TListing)) continue;

		listings.push(listing);
	}

	setHeaders(headers);

	return new Response(JSON.stringify({ data: listings }), { status: 200 });
};

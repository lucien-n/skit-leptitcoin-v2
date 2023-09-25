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
		search?: string;
		offset?: number;
		condition?: number;
		category?: string;
		priceMin?: number;
		priceMax?: number;
		order: 'asc' | 'desc';
		orderBy: string;
	} = {
		order: 'desc',
		orderBy: 'created_at'
	};

	const query = searchParams.get('q');
	if (query) params.search = query;

	const condition = parseInt(searchParams.get('condition') || '-1');
	if (condition >= 0 && condition <= 4) params.condition = condition;

	const category = searchParams.get('category');
	if (category) params.category = category;

	const priceMin = parseInt(searchParams.get('price_min') || '0');
	if (priceMin && priceMin > 0) params.priceMin = priceMin;

	const priceMax = parseInt(searchParams.get('price_min') || '0');
	if (priceMax && priceMax > priceMin) params.priceMax = priceMax;

	const order = searchParams.get('order') as 'asc' | 'desc';
	if (order !== 'desc') params.order = order;

	const orderBy = searchParams.get('order_by');
	if (orderBy && orderBy !== 'created_at') params.orderBy = orderBy;

	const { data, error } = await supabase.functions.invoke('get-listings-search', {
		body: params
	});

	if (error) return new Response(null, { status: 500 });

	if (!data) return new Response(null, { status: 204 });

	const uids = data
		.filter(({ uid }: { uid: string }) => checkUid(uid))
		.map(({ uid }: { uid: string }) => uid);

	if (!uids) return new Response(null, { status: 204 });

	let listings: TListing[] = [];

	const url = `/api/listings/${uids.join(';')}?ignore-check`;
	const res = await fetch(url);

	if (res.status == 200) {
		try {
			const { data } = await res.json();

			if (!data) return new Response(null, { status: 204 });

			if (data satisfies TListing[]) listings = data;
		} catch (e) {
			/* empty */
		}
	}

	setHeaders(headers);

	return new Response(JSON.stringify({ data: listings }), { status: 200 });
};

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
	const query = searchParams.get('q');

	const { data, error } = await supabase.functions.invoke('get-listings-search', {
		body: { offset: 0, query }
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

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { uid, getSession, supabase } }) => {
	const session = await getSession();
	if (!session) return new Response(null, { status: 401 });

	const query = supabase
		.from('bookmarks')
		.select('created_at')
		.match({ user_uid: session.user.id, listing_uid: uid });
	const { data, error }: DbResult<typeof query> = await query;
	if (error) return new Response(JSON.stringify({ error }), { status: 500 });

	if (!data) return new Response(null, { status: 204 });

	return new Response(JSON.stringify({ data }), { status: 200 });
};

export const POST: RequestHandler = async ({ locals: { uid, getSession, supabase } }) => {
	const session = await getSession();
	if (!session) return new Response(null, { status: 401 });

	const query = supabase.from('bookmarks').insert({ user_uid: session.user.id, listing_uid: uid });
	const { status, error }: DbResult<typeof query> = await query;
	if (error) return new Response(JSON.stringify({ error }), { status: 500 });

	return new Response(null, { status });
};

export const DELETE: RequestHandler = async ({ locals: { uid, getSession, supabase } }) => {
	const session = await getSession();
	if (!session) return new Response(null, { status: 401 });

	const query = supabase
		.from('bookmarks')
		.delete()
		.match({ user_uid: session.user.id, listing_uid: uid });
	const { status, error }: DbResult<typeof query> = await query;
	if (error) return new Response(JSON.stringify({ error }), { status: 500 });

	return new Response(null, { status });
};

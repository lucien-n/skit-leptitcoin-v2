import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { uid, supabase, getSession } }) => {
	const session = await getSession();
	if (!session || session.user.id !== uid) return new Response(null, { status: 401 });

	const query = supabase
		.from('bookmarks')
		.select('listing_uid, created_at')
		.match({ user_uid: uid });
	const { data, error }: DbResult<typeof query> = await query;

	if (error) return new Response(null, { status: 501 });

	if (!data) return new Response(null, { status: 204 });

	const bookmarks: TBookmark[] = [];

	data.forEach((bookmark_data) => {
		const bookmark = {
			user_uid: uid,
			...bookmark_data
		} satisfies TBookmark;
		bookmarks.push(bookmark);
	});

	return new Response(JSON.stringify({ data: bookmarks }), { status: 200 });
};

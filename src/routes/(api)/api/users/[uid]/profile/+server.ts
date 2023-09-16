import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, uid } }) => {
	console.log(`Fetching '${uid}' profile`);
	const { data, error } = await supabase
		.from('profiles')
		.select('name, created_at, avatar_url')
		.match({ uid });

	if (error)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	if (!data?.[0]) return new Response(null, { status: 204 });

	const profile_data = data?.[0];

	const profile = {
		uid,
		name: profile_data.name,
		avatar_url: profile_data.avatar_url,
		created_at: profile_data.created_at
	} satisfies TProfile;

	return new Response(JSON.stringify({ data: [profile] }), { status: 200 });
};

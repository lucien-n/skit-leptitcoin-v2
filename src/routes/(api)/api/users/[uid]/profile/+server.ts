import { getHeaders, getRouteExpiration } from '$lib/server/cache';
import { checkUid } from '$lib/server/helper';
import { redis } from '$lib/server/redis';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase }, params, setHeaders }) => {
	let headers = getHeaders('users/profile');

	const uid_or_username = params.uid as string;

	let uid = '';
	let name = '';

	if (uid_or_username.length === 36) uid = uid_or_username;
	else name = uid_or_username;

	let redisPattern = 'profile:';
	if (uid) redisPattern += uid + '|*';
	if (name) redisPattern += '*|' + name;
	const redisKey = (await redis.keys(redisPattern))[0];
	const cached = await redis.get(redisKey);

	if (cached) {
		const ttl = await redis.ttl(redisKey);
		headers = { 'Cache-Control': `max-age=${ttl}` };
		return new Response(JSON.stringify({ data: JSON.parse(cached) }), { status: 200 });
	}

	const query = supabase
		.from('profiles')
		.select('uid, name, role, avatar_url, created_at')
		.match(uid ? { uid } : { name });

	const { data, error }: DbResult<typeof query> = await query;

	if (error)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	if (!data?.[0]) return new Response(null, { status: 204 });

	const profile_data = data?.[0];

	const profile = {
		uid: profile_data.uid,
		name: profile_data.name,
		avatar_url: profile_data.avatar_url,
		role: profile_data.role,
		created_at: profile_data.created_at
	} satisfies TProfile;

	setHeaders(headers);

	if (profile.name && checkUid(profile.uid))
		redis.set(
			`profile:${profile.uid}|${profile.name}`,
			JSON.stringify(profile),
			'EX',
			getRouteExpiration('users/profile')
		);

	return new Response(JSON.stringify({ data: profile }), { status: 200 });
};

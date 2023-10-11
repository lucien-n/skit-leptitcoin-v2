import { getRouteExpiration } from '$lib/server/cache';
import { checkUid } from '$lib/server/helper';
import { redis } from '$lib/server/redis';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

const getCachedProfile = async ({ uid, name }: { uid?: string; name?: string }) => {
	let redisPattern = 'profile:';
	if (uid) redisPattern += uid + '|*';
	if (name) redisPattern += '*|' + name;
	const redisKey = (await redis.keys(redisPattern))[0];
	const cached = await redis.get(redisKey);

	if (cached) {
		const ttl = await redis.ttl(redisKey);
		return { profile: JSON.parse(cached), ttl };
	}

	return { profile: null };
};

const getSupaProfile = async (
	supabase: SupabaseClient,
	{ uid, name }: { uid?: string; name?: string }
) => {
	const query = supabase
		.from('profiles')
		.select('uid, name, role, avatar_url, created_at')
		.match(uid ? { uid } : { name });

	const { data, error, status }: DbResult<typeof query> = await query;

	if (error) return { error: 'Internal Server Error', status };
	if (!data?.[0]) return { status: 204 };

	const profileData = data?.[0];

	const profile = {
		uid: profileData.uid,
		name: profileData.name,
		avatar_url: profileData.avatar_url,
		role: profileData.role,
		created_at: profileData.created_at
	} satisfies TProfile;

	return { profile, error, status };
};

const cacheSupaProfile = async (supaProfile: TProfile) => {
	if (supaProfile.name && checkUid(supaProfile.uid))
		redis.set(
			`profile:${supaProfile.uid}|${supaProfile.name}`,
			JSON.stringify(supaProfile),
			'EX',
			getRouteExpiration('users/profile')
		);
};

export const GET: RequestHandler = async ({ locals: { supabase }, params }) => {
	const uidOrUsername = params.uid as string;

	let uid = '';
	let name = '';

	if (uidOrUsername.length === 36) uid = uidOrUsername;
	else name = uidOrUsername;

	const { profile: cachedProfile } = await getCachedProfile({ uid, name });
	if (cachedProfile) return new Response(JSON.stringify({ data: cachedProfile }), { status: 200 });

	const { profile: supaProfile, error, status } = await getSupaProfile(supabase, { uid, name });
	if (error) return new Response(JSON.stringify({ error }), { status });
	if (!supaProfile) return new Response(null, { status });

	await cacheSupaProfile(supaProfile);

	return new Response(JSON.stringify({ data: supaProfile }), { status: 200 });
};

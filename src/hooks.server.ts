// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { checkUid } from '$lib/server/helper';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle, RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, params, url }: RequestEvent = event;

	locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	locals.getSession = async () => {
		const {
			data: { session }
		} = await locals.supabase.auth.getSession();
		return session;
	};

	if (url.pathname.startsWith('/api/')) {
		if (params.uid && !url.searchParams.has('ignore-check')) {
			const { uid, response } = checkUid(params.uid);
			if (response)
				return new Response(JSON.stringify({ error: 'Please provide a valid uid' }), {
					status: 422
				});
			locals.uid = uid;
		}
	}

	if (url.pathname.startsWith('/admin')) {
		const session = await locals.getSession();
		if (!session)
			return new Response(null, {
				status: 401
			});

		const { data, error } = await locals.supabase
			.from('profiles')
			.select('role')
			.match({ user_uid: session.user.id });
		if (error || !(data.length > 0) || data[0].role < 8)
			return new Response(null, {
				status: 401
			});
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

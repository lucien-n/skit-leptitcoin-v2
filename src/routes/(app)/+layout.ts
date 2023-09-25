import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import cfetch from '$lib/cfetch.js';
import { profileStore } from '$lib/stores.js';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

inject({ mode: dev ? 'development' : 'production' });

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	let profile: TProfile | null = null;
	if (session) {
		const { data, error } = await cfetch<TProfile>(
			`/api/users/${session?.user.id}/profile`,
			'GET',
			fetch
		);
		if (data || !error) profile = data[0];
	}
	profileStore.set(profile);

	return { supabase, session, profile };
};

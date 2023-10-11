import { parseListings } from '$lib/server/supabase/listings';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
	const { session } = await parent();
	if (!session) return new Response(null, { status: 401 });

	const getListingsWaitingForValidation = async (limit: number, offset: number) => {
		const query = supabase
			.from('listings')
			.select(
				'uid, price, title, description, category, condition, image, created_at, author:profiles(author_uid:uid, name)'
			)
			.match({ is_validated: false })
			.range(offset, limit + offset)
			.order('created_at', { ascending: true });

		const { data, error }: DbResult<typeof query> = await query;
		if (error) return { listings: [], error };

		return { listings: parseListings(data) };
	};

	return await getListingsWaitingForValidation(25, 0);
};

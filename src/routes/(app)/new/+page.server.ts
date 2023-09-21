import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { newSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(newSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { supabase, getSession }
		} = event;

		const form = await superValidate(event, newSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const session = await getSession();
		if (!session) return fail(401, { error: 'You must be signed in' });

		const title = form.data.title;
		const description = form.data.description;
		const category = form.data.category;
		const condition = form.data.condition;
		const price = form.data.price;

		const query = supabase
			.from('listings')
			.insert({
				author_uid: session.user.id,
				title,
				description,
				category,
				condition,
				price
			})
			.select('uid');

		const { data, error }: DbResult<typeof query> = await query;

		if (error)
			return fail(500, {
				error
			});

		const uid = data?.[0].uid;

		if (!uid) return fail(500, { error: 'Error in listing creation. Try again later' });

		await supabase
			.from('lisings')
			.insert({ image_url: `${uid}.wepb` })
			.match({ uid });

		return {
			uid
		};
	}
};

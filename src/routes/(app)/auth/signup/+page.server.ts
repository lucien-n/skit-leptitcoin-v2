import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { signupSchema } from './schema';

export const load: PageServerLoad = () => {
	return {
		form: superValidate(signupSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signupSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return {
			form
		};
	}
};

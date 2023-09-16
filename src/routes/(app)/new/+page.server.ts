import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { newSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(newSchema)
	};
};

export const actions: Actions = {
	default: async () => {
		const error = null;
		if (error)
			return {
				error: ''
			};
	}
};

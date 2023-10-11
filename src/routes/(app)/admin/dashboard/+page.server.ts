import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session) return new Response(null, { status: 401 });

	const getListingsWaitingForValidation = async () => {};

	return {
		listings: getListingsWaitingForValidation()
	};
};

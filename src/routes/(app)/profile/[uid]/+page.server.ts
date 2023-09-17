import cfetch from '$lib/cfetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const uid = params.uid;

	const { data, error } = await cfetch(`/api/users/${uid}/profile?ignore-check`, 'GET', fetch);

	const profile_data = data?.[0];

	if (!profile_data)
		return {
			error: 'No data found for profile'
		};

	const profile = profile_data as TProfile;

	return {
		profile,
		error
	};
};

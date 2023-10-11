import { cfetch } from '$lib/cfetch';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch }) => {
	const uid = params.uid;

	const { data, error } = await cfetch<TProfile[]>(
		`/api/users/${uid}/profile?ignore-check`,
		'GET',
		fetch
	);

	const profileData = data?.[0];

	if (!profileData)
		return {
			error: 'No data found for profile'
		};

	const profile = profileData as TProfile;

	return {
		profile,
		error
	};
};

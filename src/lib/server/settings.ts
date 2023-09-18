import { PRIVATE_MODE } from '$env/static/private';

export const CACHED_ROUTES = {
	listings: {
		listing: {
			max_age: 300,
			enabled: PRIVATE_MODE == 'DEV'
		}
	}
};

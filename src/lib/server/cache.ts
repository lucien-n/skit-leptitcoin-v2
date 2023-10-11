import { PRIVATE_MODE } from '$env/static/private';

const DEV: boolean = PRIVATE_MODE == 'DEV';

const CACHE_SETTINGS = {
	'listings/listing': {
		max_age: 300,
		enabled: DEV
	},
	'listings/search': {
		max_age: 300,
		enabled: DEV
	},
	'users/profile': {
		max_age: 600,
		enabled: DEV
	}
};

type Route = keyof typeof CACHE_SETTINGS;

export const getHeaders = (route: Route) => {
	const route_settings = CACHE_SETTINGS[route];

	const headers: Record<string, string> = {};

	if (route_settings.enabled) headers['Cache-Control'] = `max-age=${route_settings.enabled}`;

	return headers;
};

export const getRouteExpiration = (route: Route) => {
	return DEV ? 30 : CACHE_SETTINGS[route].max_age;
};

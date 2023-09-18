import { PRIVATE_MODE } from '$env/static/private';

const DEV: boolean = PRIVATE_MODE == 'DEV';

const ROUTES_SETTINGS = {
	'listings/listing': {
		max_age: 300,
		enabled: DEV
	},
	'users/profile': {
		max_age: 600,
		enabled: DEV
	}
};

type Route = keyof typeof ROUTES_SETTINGS;

export const getHeaders = (route: Route) => {
	const route_settings = ROUTES_SETTINGS[route];

	const headers: Record<string, string> = {};

	if (route_settings.enabled) headers['Cache-Control'] = `max-age=${route_settings.enabled}`;

	return headers;
};

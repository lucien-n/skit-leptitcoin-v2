import { Metric, getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

type Options = {
	params: Record<string, string> | never[];
	path: string;
	analyticsId: string;
	debug?: boolean;
};

function getConnectionSpeed() {
	return 'connection' in navigator &&
		navigator['connection'] &&
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'effectiveType' in navigator['connection']
		? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
		  // @ts-ignore
		  navigator['connection']['effectiveType']
		: '';
}

/**
 * @param {{ params: { [s: string]: any; } | ArrayLike<any>; path: string; analyticsId: string; debug: boolean; }} options
 */
function sendToAnalytics(metric: Metric, options: Options) {
	const page = Object.entries(options.params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		options.path
	);

	const body = {
		dsn: options.analyticsId,
		id: metric.id,
		page,
		href: location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed()
	};

	if (options.debug) {
		console.log('[Web Vitals]', metric.name, JSON.stringify(body, null, 2));
	}

	const blob = new Blob([new URLSearchParams(body as Record<string, string>).toString()], {
		// This content type is necessary for `sendBeacon`
		type: 'application/x-www-form-urlencoded'
	});
	if (navigator.sendBeacon) {
		navigator.sendBeacon(vitalsUrl, blob);
	} else
		fetch(vitalsUrl, {
			body: blob,
			method: 'POST',
			credentials: 'omit',
			keepalive: true
		});
}

export function webVitals(options: Options) {
	try {
		getFID((metric: Metric) => sendToAnalytics(metric, options));
		getTTFB((metric: Metric) => sendToAnalytics(metric, options));
		getLCP((metric: Metric) => sendToAnalytics(metric, options));
		getCLS((metric: Metric) => sendToAnalytics(metric, options));
		getFCP((metric: Metric) => sendToAnalytics(metric, options));
	} catch (err) {
		console.error('[Web Vitals]', err);
	}
}

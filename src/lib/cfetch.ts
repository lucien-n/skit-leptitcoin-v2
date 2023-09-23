export type Fetch = typeof fetch;

const cfetch = async <T>(
	url: string,
	method: 'GET' | 'POST' | 'UPDATE' | 'DELETE' | 'PUT',
	fetch: Fetch,
	options?: object
): Promise<{
	data: T[];
	error: string;
	status: number;
	statusText: string;
}> => {
	const res = await fetch(url, { method, ...options });

	if (!res.ok) {
		let error;
		try {
			const data = await res.json();
			error = data.error.message;
		} catch (e) {
			/* empty */
		}

		return {
			data: [],
			error: `[${res.status}] <${method}> '${url}'${error ? ' => ' + error : ''}`,
			status: res.status,
			statusText: res.statusText
		};
	}

	try {
		const { data, error } = await res.json();
		return { data, error, status: res.status, statusText: res.statusText };
	} catch (e) {
		/* empty */
	}

	return { data: [], error: '', status: res.status, statusText: res.statusText };
};

export type CFetch = typeof cfetch;
export default cfetch;

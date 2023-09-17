type Fetch = typeof fetch;

const cfetch = async (
	url: string,
	method: 'GET' | 'POST' | 'UPDATE' | 'DELETE' | 'PUT',
	fetch: Fetch,
	options?: object
): Promise<{
	data: Array<object | unknown>;
	error: string;
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
			error: `[${res.status}] <${method}> '${url}'${error ? ' => ' + error : ''}`
		};
	}

	const { data, error } = await res.json();

	return { data, error };
};

export default cfetch;

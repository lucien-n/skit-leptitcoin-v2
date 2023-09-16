type Fetch = typeof fetch;

const cfetch = async (
	url: string,
	method: 'GET' | 'POST' | 'UPDATE' | 'DELETE' | 'PUT',
	fetch: Fetch,
	options?: object
): Promise<{
	data: [];
	error: string;
}> => {
	const res = await fetch(url, { method, ...options });

	if (!res.ok)
		return { data: [], error: `[${res.status}] <${method}> '${url}': ${res.statusText}` };

	const { data, error } = await res.json();

	return { data, error };
};

export default cfetch;

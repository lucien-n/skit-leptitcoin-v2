export function isListing(obj: unknown): obj is TListing {
	if (typeof obj === 'object' && obj !== null) {
		const authorInObj = 'author' in obj && obj.author !== null && typeof obj.author === 'object';
		if (!authorInObj) return false;

		const author: object = obj.author as object;

		return (
			'uid' in obj &&
			'author_uid' in author &&
			'name' in author &&
			'price' in obj &&
			'title' in obj &&
			'description' in obj &&
			'category' in obj &&
			'condition' in obj &&
			'image' in obj &&
			'created_at' in obj
		);
	}
	return false;
}

export const parseListing = (data: unknown): TListing | null => {
	if (!isListing(data)) return null;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const authorData: { author_uid: string; name: string } = data.author;

	const listing = {
		uid: data.uid,
		author: {
			uid: authorData.author_uid,
			name: authorData.name
		},
		price: data.price,
		title: data.title,
		description: data.description,
		category: data.category,
		condition: data.condition,
		created_at: data.created_at,
		image: data.image
	} satisfies TListing;

	return listing;
};

export const parseListings = (data: unknown[] | undefined): TListing[] => {
	if (!data || data.length === 0) return [];

	const listings: TListing[] = [];
	for (const listingData of data) {
		const parsed = parseListing(listingData);
		if (parsed) listings.push(parsed);
	}

	return listings;
};

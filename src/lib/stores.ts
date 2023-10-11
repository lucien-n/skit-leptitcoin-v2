import { writable, type Invalidator, type Subscriber } from 'svelte/store';

export const titleStore = writable<string>('');

export const searchingStore = writable<boolean>(false);

export const shortcutsEnabledStore = writable<boolean>(true);

type currentListingStore = {
	subscribe: (
		this: void,
		run: Subscriber<TListing | null>,
		invalidate?: Invalidator<TListing | null>
	) => () => void;
	set: (value: TListing | null) => void;
	update: (updater: (value: TListing | null) => TListing | null) => void;
	is: (uid: string) => boolean;
	get: () => TListing | null;
};

const createCurrentListingStore = (): currentListingStore => {
	const { subscribe, set, update } = writable<TListing | null>(null);

	const is = (compared_uid: string) => {
		let isSelf = false;

		subscribe((listing) => {
			if (listing) isSelf = listing.uid === compared_uid;
		});

		return isSelf;
	};

	const get = (): TListing | null => {
		let listing = null;

		subscribe((l) => {
			listing = l;
		});

		return listing;
	};

	return {
		subscribe,
		set,
		update,
		is,
		get
	};
};

export const currentListingStore = createCurrentListingStore();

export const currentScrollStore = writable<number>(0);

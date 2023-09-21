<script lang="ts">
	import { page } from '$app/stores';
	import * as Alert from '$components/ui/alert';
	import cfetch from '$lib/cfetch';
	import { SEARCH_COOLDOWN } from '$lib/constants';
	import { searchingStore } from '$lib/stores';
	import ListingSkeleton from './listing-skeleton.svelte';
	import Listing from './listing.svelte';

	export let data;

	let { fetch } = data;

	let getListings: Promise<TListing[]>;

	let timeoutSet: boolean = false;

	const filterListings = async (): Promise<TListing[]> => {
		searchingStore.set(true);

		const searchParams = new URLSearchParams($page.url.search);

		const url = new URL($page.url.origin + '/api/listings/search');

		searchParams.forEach((value, key) => url.searchParams.set(key, value));

		const { data, error } = await cfetch(url.toString(), 'GET', fetch);
		if (error) throw error;

		const listings = data as TListing[];

		searchingStore.set(false);

		return listings;
	};

	page.subscribe(() => {
		if (timeoutSet) return;

		timeoutSet = true;
		setTimeout(() => {
			if (!timeoutSet) return;
			getListings = filterListings();
			timeoutSet = false;
		}, SEARCH_COOLDOWN);
	});
</script>

<section class="flex flex-col h-full gap-2">
	{#await getListings}
		{#each { length: 8 } as i}
			<ListingSkeleton />
		{/each}
	{:then listings}
		{#if listings && listings.length > 0}
			{#each listings as listing}
				<Listing {listing} />
			{/each}
		{:else}
			<div class="h-full flex justify-center items-center">
				<h1 class="text-4xl text-center opacity-80">No listing found</h1>
			</div>
		{/if}
	{:catch error}
		<Alert.Root>
			<Alert.Title class="font-semibold">Error</Alert.Title>
			<Alert.Description>{error}</Alert.Description>
		</Alert.Root>
	{/await}
	<hr />
</section>

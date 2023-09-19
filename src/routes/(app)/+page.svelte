<script lang="ts">
	import { page } from '$app/stores';
	import * as Alert from '$components/ui/alert';
	import cfetch from '$lib/cfetch';
	import { SEARCH_COOLDOWN } from '$lib/constants';
	import { onMount } from 'svelte';
	import ListingSkeleton from './listing-skeleton.svelte';
	import Listing from './listing.svelte';

	export let data;

	let { fetch } = data;

	let getListings: Promise<TListing[]>;

	let timeoutSet: boolean = false;

	const filterListings = async (): Promise<TListing[]> => {
		const query = $page.url.searchParams.get('q');

		const url = `/api/listings/search${query ? '?q=' + query : ''}`;

		const { data, error } = await cfetch(url, 'GET', fetch);
		if (error) throw error;

		const listings = data as TListing[];

		return listings;
	};

	onMount(() => (getListings = filterListings()));

	page.subscribe(() => {
		if (timeoutSet) return;

		timeoutSet = true;
		setTimeout(() => {
			getListings = filterListings();
			timeoutSet = false;
			console.log('Timeout executed');
		}, SEARCH_COOLDOWN);
	});
</script>

<section class="flex flex-col h-full gap-2">
	{#await getListings}
		{#each { length: 8 } as i}
			<span>
				<ListingSkeleton />
			</span>
		{/each}
	{:then listings}
		{#if listings}
			{#each listings as listing}
				<span>
					<Listing {listing} />
				</span>
			{/each}
		{/if}
	{:catch error}
		<Alert.Root>
			<Alert.Title class="font-semibold">Error</Alert.Title>
			<Alert.Description>{error}</Alert.Description>
		</Alert.Root>
	{/await}
	<hr />
</section>

<script lang="ts">
	import { Svroller } from 'svrollbar';
	import * as Alert from '$components/ui/alert';
	import Listing from './listing.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cfetch from '$lib/cfetch';
	import Separator from '$components/ui/separator/separator.svelte';

	export let data;

	let { fetch } = data;

	let getListings: Promise<TListing[]>;

	const filterListings = async (query?: string | null): Promise<TListing[]> => {
		const url = `/api/listings/feed${query ? '?q=' + query : ''}`;

		const { data, error } = await cfetch(url, 'GET', fetch);
		if (error) throw error;

		const listings = data as TListing[];

		return listings;
	};

	onMount(() => (getListings = filterListings()));

	page.subscribe(({ url: { searchParams } }) => {
		getListings = filterListings(searchParams.get('q'));
	});
</script>

<!-- <Svroller width="100%" height="90%"> -->
<section class="flex flex-col h-full gap-2">
	{#await getListings}
		<p>Fetching listings</p>
	{:then listings}
		{#if listings}
			{#each listings as listing}
				<Listing {listing} />
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
<!-- </Svroller> -->

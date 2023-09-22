<script lang="ts">
	import * as Alert from '$components/ui/alert';
	import Listing from '../../../listing.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const {
		streamed: { getBookmarkedListings }
	} = data;
</script>

{#await getBookmarkedListings}
	<p>Fetching bookmarked listings</p>
{:then bookmarkedListings}
	{#if bookmarkedListings.length > 0}
		{#each bookmarkedListings as bookmarkedListing}
			<Listing listing={bookmarkedListing} />
		{/each}
	{:else}
		<Alert.Root>
			<Alert.Title>You didn't bookmark any listing</Alert.Title>
		</Alert.Root>
	{/if}
{/await}

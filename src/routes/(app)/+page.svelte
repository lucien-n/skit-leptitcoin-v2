<script lang="ts">
	import { Svrollbar, Svroller } from 'svrollbar';
	import type { PageData } from './$types';
	import * as Alert from '$components/ui/alert';
	import Listing from './listing.svelte';

	export let data: PageData;

	const {
		streamed: { listingsPromise }
	} = data;
</script>

<Svroller width="100%" height="80%">
	<section class="flex flex-col gap-2">
		{#await listingsPromise}
			<p>Fetching listings</p>
		{:then { data: listings, error }}
			{#if error}
				<Alert.Root>
					<Alert.Title class="font-semibold">Error</Alert.Title>
					<Alert.Description>{error}</Alert.Description>
				</Alert.Root>
			{/if}
			{#if listings}
				{#each listings as listing}
					<Listing {listing} />
				{/each}
			{/if}
		{/await}
	</section>
</Svroller>

<script lang="ts">
	import Bookmark from '$components/lpc/bookmark.svelte';
	import * as Alert from '$components/ui/alert';
	import { profileStore } from '$lib/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const {
		streamed: { listingPromise }
	} = data;
</script>

{#await listingPromise then { data: [listing], error }}
	{#if error}
		<Alert.Root>
			<Alert.Title class="font-semibold">Error</Alert.Title>
			<Alert.Description>{error}</Alert.Description>
		</Alert.Root>
	{/if}
	{#if listing}
		{#each Object.entries(listing) as [key, value]}
			<strong>{key}:</strong> {value} <br />
		{/each}
		{#if $profileStore}
			<div class="self-end">
				<Bookmark {listing} />
			</div>
		{/if}
	{/if}
{/await}

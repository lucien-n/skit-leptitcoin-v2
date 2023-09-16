<script lang="ts">
	import type { PageServerData } from './$types';
	import * as Alert from '$components/ui/alert';

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
	{/if}
{/await}

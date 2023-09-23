<script lang="ts">
	import Bookmark from '$components/lpc/bookmark.svelte';
	import { profileStore } from '$lib/stores';
	import * as Card from '$components/ui/card';
	import ProfileCard from '$components/lpc/profile-card.svelte';

	export let listing: TCompleteListing;
</script>

<Card.Root>
	<Card.Header>
		<div />
		{#if listing.author}
			<ProfileCard profile={listing.author} />
		{/if}
	</Card.Header>
	<Card.Content>
		{#each Object.entries(listing) as [key, value]}
			<strong>{key}:</strong> {value} <br />
		{/each}
	</Card.Content>
</Card.Root>

{#if $profileStore}
	<div class="self-end">
		<Bookmark {listing} />
	</div>
{/if}

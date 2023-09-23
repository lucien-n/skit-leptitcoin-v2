<script lang="ts">
	import Bookmark from '$components/lpc/bookmark.svelte';
	import * as Avatar from '$components/ui/avatar';
	import * as Card from '$components/ui/card';
	import { formatDate } from '$lib/helper';
	import { profileStore } from '$lib/stores';

	export let listing: TCompleteListing;
</script>

<article class="flex h-full flex-col gap-5">
	<div class="flex flex-col md:flex-row gap-5">
		<Card.Root class="w-full">
			<Card.Header>
				{#if !listing.image_url.endsWith('null')}
					<img class="mx-auto h-[50%] object-contain" src={listing.image_url} alt={listing.title} />
				{:else}
					<img
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						alt={listing.title}
					/>
				{/if}
			</Card.Header>
		</Card.Root>

		<Card.Root class="whitespace-nowrap h-fit">
			<Card.Header class="px-3 py-2">
				<div class="flex gap-2">
					<Avatar.Root class="w-16 h-16">
						<Avatar.Image src={listing.author.avatar_url} alt="@{listing.author.name}" />
						<Avatar.Fallback>{listing.author.name[0].toUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex flex-col p-2 w-full">
						<p class="font-semibold">{listing.author.name}</p>
						<p class="text-sm">Joined {formatDate(listing.author.created_at)}</p>
					</div>
				</div>
			</Card.Header>
		</Card.Root>
	</div>

	<Card.Root class="h-full mb-2 ">
		<Card.Header>
			<h1 class="font-semibold text-xl">
				{listing.title}
			</h1>
		</Card.Header>
		<Card.Content>
			{#each Object.entries(listing) as [key, value]}
				<strong>{key}:</strong> {value} <br />
			{/each}
		</Card.Content>
	</Card.Root>
</article>

{#if $profileStore}
	<div class="self-end">
		<Bookmark {listing} />
	</div>
{/if}

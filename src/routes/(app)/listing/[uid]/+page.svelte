<script lang="ts">
	import Bookmark from '$components/lpc/bookmark.svelte';
	import ConditionBadge from '$components/lpc/condition-badge.svelte';
	import * as Avatar from '$components/ui/avatar';
	import Badge from '$components/ui/badge/badge.svelte';
	import * as Card from '$components/ui/card';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { formatCategory, formatDate } from '$lib/helper';
	import { profileStore } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	const {
		listing,
		streamed: { authorPromise }
	} = data;

	$: imageUrl = listing.image
		? `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/listings/${listing.uid}.webp`
		: null;
</script>

<article class="h-full gap-5 grid grid-rows-3">
	<div class="flex flex-col md:flex-row gap-5 row-span-2">
		<Card.Root class="w-full">
			<Card.Header class="p-0 h-full">
				{#if imageUrl}
					<img
						class="mx-auto object-contain rounded-md h-full"
						src={imageUrl}
						alt={listing.title}
					/>
				{:else}
					<img
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						class="rounded-md h-full"
						alt={listing.title}
					/>
				{/if}
			</Card.Header>
		</Card.Root>

		<Card.Root class="whitespace-nowrap h-fit">
			<Card.Header class="px-3 py-2">
				{#await authorPromise}
					<p>Fetching author</p>
				{:then { data: [author] }}
					{#if author}
						<div class="flex gap-2">
							<Avatar.Root class="w-16 h-16">
								<Avatar.Image src={author.avatar_url} alt="@{author.name}" />
								<Avatar.Fallback>{author.name[0].toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
							<div class="flex flex-col p-2 w-full">
								<p class="font-semibold">{author.name}</p>
								<p class="text-sm">Joined {formatDate(author.created_at)}</p>
							</div>
						</div>
					{/if}
				{/await}
			</Card.Header>
		</Card.Root>
	</div>

	<Card.Root class="h-fit">
		<Card.Header>
			<div class="flex justify-between">
				<div class="flex flex-col gap-3">
					<div class="flex gap-3 text-xl items-center">
						<h1 class="font-semibold">
							{listing.title}
						</h1>
						<span class="border px-2 py-1 rounded-md text-lg">
							{listing.price}€
						</span>
					</div>
					<div class="flex flex-col md:flex-initial gap-2 md:items-center italic">
						<ConditionBadge condition={listing.condition} />
						<div class="flex flex-col md:flex-initial gap-2 md:items-center italic opacity-70">
							<span class="hidden md:flex">●</span>
							<p>in {formatCategory(listing.category)}</p>
							<span class="hidden md:flex">●</span>
							<p>Created {formatDate(listing.created_at)}</p>
						</div>
					</div>
				</div>
				{#if $profileStore}
					<div>
						<Bookmark {listing} />
					</div>
				{/if}
			</div>
		</Card.Header>
		<Card.Content>
			{#each listing.description.split('<br/>') as descriptionLine}
				{descriptionLine}<br />
			{/each}
		</Card.Content>
	</Card.Root>
</article>

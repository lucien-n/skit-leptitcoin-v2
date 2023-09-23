<script lang="ts">
	import ConditionBadge from '$components/lpc/condition-badge.svelte';
	import * as Card from '$components/ui/card';
	import * as Dialog from '$components/ui/dialog';
	import { formatCategory, formatDate } from '$lib/helper';

	export let listing: TListing;

	$: isImageNull = listing.image_url.endsWith('null');
</script>

<Card.Root class="grid grid-cols-5 h-40 md:h-64">
	<Card.Header class="p-0 col-span-2">
		{#if !isImageNull}
			<Dialog.Root>
				<Dialog.Trigger class="w-full">
					<img
						src={listing.image_url}
						alt="listing {listing.title}"
						class="rounded-l-md object-cover h-40 md:h-64 w-full"
						loading="lazy"
					/>
				</Dialog.Trigger>
				<Dialog.Content class="p-0">
					<img
						src={listing.image_url}
						alt="listing {listing.title}"
						class="rounded-l-md object-cover w-full"
						loading="lazy"
					/>
				</Dialog.Content>
			</Dialog.Root>
		{:else}
			<img
				src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
				alt=""
				class="rounded-l-md object-cover h-40 md:h-64 w-full"
				loading="lazy"
			/>
		{/if}
	</Card.Header>
	<Card.Content class="col-span-3 pl-2 p-3 flex-col flex justify-between h-full">
		<a class="flex flex-col w-full h-full group hover:cursor-pointer" href="/listing/{listing.uid}">
			<h1 class="flex group-hover:text-primary font-semibold text-xl">
				{listing.title}
			</h1>
			<p class="text-lg">{listing.price}€</p>
			<span>
				<ConditionBadge condition={listing.condition} />
			</span>
		</a>
		<div class="flex justify-between">
			<div class="flex flex-col">
				<p>
					{formatCategory(listing.category)}
				</p>
				<p>
					<a
						class="font-semibold hover:underline hover:text-primary w-fit"
						href="/profile/{listing.author.name}">{listing.author.name}</a
					>
				</p>
				<p>
					{formatDate(listing.created_at)}
				</p>
			</div>
		</div>
	</Card.Content>
</Card.Root>

<script lang="ts">
	import ConditionBadge from '$components/lpc/condition-badge.svelte';
	import * as Card from '$components/ui/card';
	import { formatDate } from '$lib/helper';

	export let listing: TListing;
</script>

<Card.Root class="grid grid-cols-5 group h-40 md:h-64">
	<Card.Header class="p-0 col-span-2">
		<div class="bg-muted h-full">
			<img
				src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
				alt="Gray by Drew Beamer"
				class="rounded-l-md object-cover h-40 md:h-64 w-full"
			/>
		</div>
	</Card.Header>
	<Card.Content
		class="col-span-3 pl-2 p-3 flex-col flex justify-between h-full group-hover:cursor-pointer"
	>
		<a class="flex flex-col w-full h-full" href="/listing/{listing.uid}">
			<h1 class="flex group-hover:text-primary font-semibold text-xl">
				{listing.title}
			</h1>
			<p class="text-lg">{listing.price}€</p>
			<span>
				<ConditionBadge condition={listing.condition} />
			</span>
		</a>
		<div class="flex flex-col">
			<a
				class="font-semibold hover:underline hover:text-primary w-fit"
				href="/profile/{listing.author.name}">{listing.author.name}</a
			>
			<p>
				{formatDate(listing.created_at)}
			</p>
		</div>
	</Card.Content>
</Card.Root>

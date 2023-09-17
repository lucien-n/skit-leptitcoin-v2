<script lang="ts">
	import * as Card from '$components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { formatDate } from '$lib/helper';
	import { CONDITIONS } from '$lib/types';

	export let listing: TListing;

	const getConditionText = () => {
		let text = '';
		text = CONDITIONS.filter((condition) => condition.value == listing.condition)[0].label;
		return text;
	};
</script>

<Card.Root class="grid grid-cols-5 group">
	<Card.Header class="h-full w-full p-0 col-span-2">
		<AspectRatio ratio={2 / 1} class="bg-muted">
			<img
				src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
				alt="Gray by Drew Beamer"
				class="rounded-l-md object-cover h-full w-full"
			/>
		</AspectRatio>
	</Card.Header>
	<Card.Content class="col-span-3 pl-2 h-full group-hover:cursor-pointer">
		<a class="block h-full text-xl" href="/listing/{listing.uid}">
			<div class="flex group-hover:text-primary font-semibold">
				{listing.title}
			</div>
		</a>
		<div class="block">
			<a class="font-bold underline" href="/profile/{listing.author.name}">{listing.author.name}</a>
			-
			{getConditionText()}
			{formatDate(listing.created_at)}
		</div>
	</Card.Content>
</Card.Root>

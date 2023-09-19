<script lang="ts">
	import ConditionBadge from '$components/lpc/condition-badge.svelte';
	import * as Card from '$components/ui/card';
	import Skeleton from '$components/ui/skeleton/skeleton.svelte';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
</script>

<Card.Root class="grid grid-cols-5 group">
	<Card.Header class="h-full w-full p-0 col-span-2">
		<AspectRatio ratio={2 / 1} class="bg-muted">
			<Skeleton class="rounded-l-md object-cover h-full w-full" />
		</AspectRatio>
	</Card.Header>
	<Card.Content
		class="col-span-3 pl-2 p-3 flex-col flex justify-between h-full group-hover:cursor-pointer"
	>
		<div class="flex flex-col w-full h-full gap-4">
			<Skeleton class="text-xl h-7 w-72" />
			<div class="flex flex-col gap-2">
				<Skeleton class="text-lg h-6 w-24" />
				<Skeleton class="w-16 h-5 rounded-full" />
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<Skeleton class="h-5 w-24" />
			<Skeleton class="h-5 w-32" />
		</div>
	</Card.Content>
</Card.Root>

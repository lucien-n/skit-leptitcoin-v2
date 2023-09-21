<script lang="ts">
	import cfetch from '$lib/cfetch';
	import { Bookmark, BookmarkCheck, BookmarkMinus } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let listing: TListing;

	const url = `/api/listings/${listing.uid}/bookmark`;

	let isBookmarked: boolean = false;
	let isHovered: boolean = false;
	let createdAt: number;

	onMount(async () => {
		const { data } = await cfetch(url, 'GET', fetch);
		isBookmarked = data.length > 0;
		createdAt = data?.[0];
	});

	export const handleClick = async () => {
		if (isBookmarked) {
			const { status } = await cfetch(url, 'DELETE', fetch);
			isBookmarked = status == 204;
		} else {
			const { status } = await cfetch(url, 'POST', fetch);
			isBookmarked = status == 201;
		}
	};
</script>

<button
	class="scale-110"
	on:click={handleClick}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	{#if isBookmarked}
		{#if isHovered}
			<BookmarkMinus />
		{:else}
			<BookmarkCheck />
		{/if}
	{:else}
		<Bookmark />
	{/if}
</button>

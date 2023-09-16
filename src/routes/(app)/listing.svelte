<script lang="ts">
	import { formatDate } from '$lib/helper';

	export let listing: TListing;
</script>

<div>
	<a class="font-bold underline" href="/listing/{listing.uid}">{listing.title}</a> -
	<a class="font-bold underline" href="/profile/{listing.author_uid}">{listing.author_uid}</a> -
	{formatDate(listing.created_at)}
</div>

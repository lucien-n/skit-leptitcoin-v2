<script lang="ts">
	import { formatDate } from '$lib/helper';
	import { CONDITIONS } from '$lib/types';

	export let listing: TListing;

	const getConditionText = () => {
		let text = '';
		text = CONDITIONS.filter((condition) => condition.value == listing.condition)[0].label;
		return text;
	};
</script>

<div>
	<a class="font-bold underline" href="/listing/{listing.uid}">{listing.title}</a> -
	<a class="font-bold underline" href="/profile/{listing.author_uid}">{listing.author_uid}</a> -
	{getConditionText()}
	{formatDate(listing.created_at)}
</div>

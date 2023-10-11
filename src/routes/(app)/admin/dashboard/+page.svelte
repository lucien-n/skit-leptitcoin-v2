<script lang="ts">
	import Button from '$components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
	import { fly } from 'svelte/transition';
	import type { PageData, PageServerData } from './$types';

	export let data: PageServerData & PageData;

	const { listings, error, supabase } = data;

	let getListings: TListing[] = [];
	let validatedUids: string[] = [];

	const validateListing = async (uid: string) => {
		const { data: success } = await supabase.rpc('validate_listing', { listing_uid: uid });
		if (success) validatedUids.push(uid);
		getListings = filterListings();
	};

	const filterListings = () => {
		return listings?.filter(({ uid }) => !validatedUids.includes(uid)) || [];
	};

	getListings = filterListings();
</script>

{#if error || !listings}
	<h1 class="text-xl">{error}</h1>
{:else}
	<Table.Root>
		<Table.Caption>Listings in wait of validation.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Author</Table.Head>
				<Table.Head>Title</Table.Head>
				<Table.Head>Description</Table.Head>
				<Table.Head>Price</Table.Head>
				<Table.Head>Category</Table.Head>
				<Table.Head>Condition</Table.Head>
				<Table.Head>Action</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each getListings as listing}
				<Table.Row>
					<Table.Cell class="font-medium">
						<Button variant="link" href="/profile/{listing.author.name}">
							{listing.author.name}
						</Button>
					</Table.Cell>
					<Table.Cell class="font-medium">{listing.title}</Table.Cell>
					<Table.Cell class="font-medium">{listing.description}</Table.Cell>
					<Table.Cell class="font-medium">{listing.price}</Table.Cell>
					<Table.Cell class="font-medium">{listing.category}</Table.Cell>
					<Table.Cell class="font-medium">{listing.condition}</Table.Cell>
					<Table.Cell class="font-medium">
						<Button variant="default" on:click={() => validateListing(listing.uid)}>Validate</Button
						>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/if}

<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Alert from '$components/ui/alert';
	import * as Card from '$components/ui/card';
	import type { PageData } from './$types';
	import NewForm from './new-form.svelte';

	export let data: PageData;
	export let form: any;

	const gotoListing = (event: any) => {
		if (event.detail && event.detail.data && event.detail.data.uid)
			goto(`/listing/${event.detail.data.uid}`);
	};
</script>

<section class="w-full h-full flex justify-center items-center">
	<div class="w-full md:w-4/5 xl:w-3/5 gap-2 flex flex-col">
		{#if form?.error}
			<Alert.Root>
				<Alert.Title class="font-semibold">Auth error</Alert.Title>
				<Alert.Description>{form.error.message || form.error}</Alert.Description>
			</Alert.Root>
		{/if}
		<Card.Root class="w-full">
			<Card.Content>
				<NewForm form={data.form} on:success={gotoListing} />
			</Card.Content>
		</Card.Root>
	</div>
</section>

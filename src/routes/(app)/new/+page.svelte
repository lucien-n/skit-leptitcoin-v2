<script lang="ts">
	import * as Alert from '$components/ui/alert';
	import type { PageData } from './$types';
	import NewForm from './new-form.svelte';

	export let data: PageData;
	export let form: any;
</script>

<section class="w-full h-full flex justify-center items-center">
	<div class="w-full md:w-4/5 xl:w-3/5 gap-2 flex flex-col">
		{#if form?.error}
			<Alert.Root>
				<Alert.Title class="font-semibold">Auth error</Alert.Title>
				<Alert.Description>{form.error.message || form.error}</Alert.Description>
			</Alert.Root>
		{/if}
		<NewForm form={data.form} />
	</div>
</section>

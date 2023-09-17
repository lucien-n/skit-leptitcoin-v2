<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Input from '$components/ui/input/input.svelte';
	import { Loader2Icon, Search } from 'lucide-svelte';
	import type { FormEventHandler } from 'svelte/elements';

	let searching = false;

	const executeSearch = () => {
		searching = true;
		setTimeout(() => (searching = false), 2_000);
	};

	let last_input_time: number = new Date().getTime();

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;

		$page.url.searchParams.set('q', value);

		const now = new Date().getTime();
		console.log(now - last_input_time);
		if (!value || value == '' || now - last_input_time < 2_000) last_input_time = now;
		else goto($page.url);

		console.log($page.url.searchParams);
	};
</script>

<div class="w-[70%] mx-auto flex items-center gap-2">
	<Input
		type="text"
		disabled={searching}
		placeholder={searching ? 'Searching...' : 'Search'}
		class="w-full"
		on:input={handleInput}
		on:focus={() => (last_input_time = new Date().getTime())}
	/>
	<button on:click={executeSearch}>
		{#if searching}
			<div class="animate-spin">
				<Loader2Icon />
			</div>
		{:else}
			<Search />
		{/if}
	</button>
</div>

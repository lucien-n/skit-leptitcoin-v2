<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Input from '$components/ui/input/input.svelte';
	import { Loader2Icon, Search } from 'lucide-svelte';
	import type { EventHandler, FormEventHandler } from 'svelte/elements';

	let searching = false;
	let value: string = $page.url.searchParams.get('q') || '';

	const executeSearch = () => {
		searching = true;
		setTimeout(() => (searching = false), 2_000);
		goto($page.url, { replaceState: true, invalidateAll: true });
	};

	const updateQuery = (query?: string | null) => {
		if (query) $page.url.searchParams.set('q', query);
		else $page.url.searchParams.delete('q');
		goto(`?${$page.url.searchParams}`, { keepFocus: true });
	};

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		updateQuery(value);
	};

	const handleKeypress: EventHandler<KeyboardEvent> = (event) => {
		const key = event.key;
		if (key === 'Enter') executeSearch();
	};
</script>

<div class="w-[70%] mx-auto flex items-center gap-2">
	<Input
		type="text"
		placeholder={searching ? 'Searching...' : 'Search'}
		class="w-full"
		bind:value
		on:input={handleInput}
		on:keypress={handleKeypress}
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

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Shortcut from '$components/lpc/shortcut.svelte';
	import Input from '$components/ui/input/input.svelte';
	import { searchingStore } from '$lib/stores';
	import { Loader2Icon, Search } from 'lucide-svelte';
	import type { EventHandler, FormEventHandler } from 'svelte/elements';

	let value: string = $page.url.searchParams.get('q') || '';

	let input: { focus: () => void };

	const executeSearch = () => {
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
	<div class="relative w-full">
		<Input
			type="text"
			placeholder={$searchingStore ? 'Searching...' : 'Search'}
			class="w-full"
			bind:value
			on:input={handleInput}
			on:keypress={handleKeypress}
			bind:I={input}
		/>
		<span class="absolute right-2 top-2">
			<Shortcut shortcut={{ key: '/' }} on:shortcut={() => input.focus()} />
		</span>
	</div>
	<button on:click={executeSearch}>
		{#if $searchingStore}
			<div class="animate-spin">
				<Loader2Icon />
			</div>
		{:else}
			<Search />
		{/if}
	</button>
</div>

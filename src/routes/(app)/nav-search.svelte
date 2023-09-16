<script>
	import Input from '$components/ui/input/input.svelte';
	import { Loader2Icon, LoaderIcon, Search } from 'lucide-svelte';

	let searching = false;

	const executeSearch = () => {
		searching = true;
		setTimeout(() => (searching = false), 2_000);
	};
</script>

<div class="w-[70%] mx-auto flex items-center gap-2">
	<Input
		type="text"
		disabled={searching}
		placeholder={searching ? 'Searching...' : 'Search'}
		class="w-full"
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

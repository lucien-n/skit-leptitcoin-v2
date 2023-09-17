<script>
	import '../../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import MainNav from './main-nav.svelte';
	import { navigating } from '$app/stores';
	import Loading from './loading.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

{#if $navigating}
	<Loading />
{/if}

<main class="w-full h-full overflow-hidden flex flex-col gap-y-2">
	<MainNav {session} />
	<section class="container h-max">
		<slot />
	</section>
</main>

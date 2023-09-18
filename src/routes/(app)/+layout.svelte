<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import '../../app.postcss';
	import type { PageData } from './$types';
	import Loading from './loading.svelte';
	import MainNav from './main-nav.svelte';

	export let data: PageData;

	let { supabase, session, profile } = data;
	$: ({ supabase, session, profile } = data);

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
	<MainNav {session} {profile} />
	<section class="container h-full overflow-y-scroll">
		<slot />
	</section>
</main>

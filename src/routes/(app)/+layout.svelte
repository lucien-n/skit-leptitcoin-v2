<script lang="ts">
	import '../../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import MainNav from './main-nav.svelte';
	import { navigating, page } from '$app/stores';
	import Loading from './loading.svelte';
	import type { PageData } from './$types';
	import { PUBLIC_VERCEL_PROJECT_ID } from '$env/static/public';
	import { browser } from '$app/environment';
	import { webVitals } from '$lib/vitals';

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
	<section class="container h-max">
		<slot />
	</section>
</main>

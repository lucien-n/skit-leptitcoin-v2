<script lang="ts">
	import { beforeNavigate, invalidate } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../../app.postcss';
	import type { PageData } from './$types';
	import Loading from './loading.svelte';
	import MainNav from './main-nav.svelte';
	import {
		currentScrollStore,
		searchingStore,
		shortcutsEnabledStore,
		titleStore
	} from '$lib/stores';
	import { setTitle } from '$lib/helper';
	import { PREFIX as SITE_NAME } from '$lib/constants';

	export let data: PageData;

	let { supabase, session, profile } = data;
	$: ({ supabase, session, profile } = data);

	let oldPath = '';

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	const setupShortcuts = () => {
		const refreshInputs = () => {
			const elements = document.querySelectorAll('input, textarea');
			elements.forEach((element) => {
				element.addEventListener('focusin', () => shortcutsEnabledStore.set(false));
				element.addEventListener('focusout', () => shortcutsEnabledStore.set(true));
			});
		};

		page.subscribe(({ url: { pathname } }) => {
			if (oldPath == pathname) return;
			refreshInputs();
			oldPath = pathname;
		});
	};

	onMount(() => {
		setTitle('LePtitCoin');
		setupShortcuts();
	});
</script>

<svelte:head>
	<title>{$titleStore || SITE_NAME}</title>
</svelte:head>

{#if $navigating || $searchingStore}
	<Loading />
{/if}

<main class="w-full h-full overflow-hidden flex flex-col gap-y-2">
	<MainNav {session} {profile} />
	<section class="container h-full">
		<slot />
	</section>
</main>

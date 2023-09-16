<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import { HomeIcon, LogInIcon } from 'lucide-svelte';
	import NavLink from './nav-link.svelte';
	import NavSearch from './nav-search.svelte';
	import NavUserDropdown from './nav-user-dropdown.svelte';

	export let session: Session | null;
</script>

<div class="border-b p-3 shadow-md sticky">
	<nav class="flex items-center w-[60%] mx-auto space-x-6 text-lg font-medium justify-between">
		<div class="flex items-center">
			<NavLink href="/">
				<svelte:fragment slot="icon">
					<HomeIcon />
				</svelte:fragment>
				<strong> Home </strong>
			</NavLink>
		</div>
		<NavSearch />
		<div class="flex items-center">
			{#if session}
				<NavUserDropdown user={session.user} />
			{:else}
				<NavLink href="/auth">
					<svelte:fragment slot="icon">
						<LogInIcon />
					</svelte:fragment>
					Sign In
				</NavLink>
			{/if}
		</div>
	</nav>
</div>

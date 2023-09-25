<script lang="ts">
	import { Separator } from '$components/ui/separator';
	import type { Session } from '@supabase/supabase-js';
	import { HomeIcon, LogInIcon, PlusIcon } from 'lucide-svelte';
	import NavLink from './nav-link.svelte';
	import NavSearch from './nav-search.svelte';
	import NavUserDropdown from './nav-user-dropdown.svelte';

	export let session: Session | null;
	export let profile: TProfile | null;
</script>

<div class="border-b p-3 shadow-md sticky top-0 bg-white">
	<nav
		class="flex items-center w-full lg:w-[80%] xl:w-[70%] 3xl:w-[60%] mx-auto md:space-x-6 text-lg font-medium justify-between"
	>
		<div class="flex items-center">
			<NavLink href="/">
				<svelte:fragment slot="icon">
					<HomeIcon />
				</svelte:fragment>
				<strong class="hidden md:flex"> Home </strong>
			</NavLink>
		</div>
		<NavSearch />
		<div class="flex items-center space-x-1 md:space-x-2">
			{#if session && profile}
				<NavLink href="/new" variant="primary">
					<svelte:fragment slot="icon">
						<PlusIcon />
					</svelte:fragment>
					<span class="hidden md:flex">New</span>
				</NavLink>
				<Separator orientation="vertical" />
				<NavUserDropdown {profile} />
			{:else}
				<NavLink href="/auth" variant="primary">
					<svelte:fragment slot="icon">
						<LogInIcon />
					</svelte:fragment>
					<span class="hidden md:flex"> Sign In </span>
				</NavLink>
			{/if}
		</div>
	</nav>
</div>

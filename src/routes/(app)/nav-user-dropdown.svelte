<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { LogOutIcon, UserIcon } from 'lucide-svelte';

	export let profile: TProfile;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center gap-1"
		><UserIcon /> <span class="hidden md:flex">Profile</span></DropdownMenu.Trigger
	>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>{profile.name}</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item class="p-0">
				<a href="/profile/{profile.name}" class="w-full px-3 py-2">Profile</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="p-0">
				<a href="/profile/{profile.name}/bookmarks" class="w-full px-3 py-2">Bookmarks</a>
			</DropdownMenu.Item>
			{#if profile.role >= 8}
				<DropdownMenu.Item class="p-0">
					<a href="/admin/dashboard" class="w-full px-3 py-2">Dashboard</a>
				</DropdownMenu.Item>
			{/if}
			<DropdownMenu.Item class="p-0">
				<a
					href="/auth/signout"
					class="flex gap-1 items-center px-3 py-2 w-full"
					data-sveltekit-reload
				>
					<LogOutIcon /> Sign Out
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

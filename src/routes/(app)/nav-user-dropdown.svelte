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
			<DropdownMenu.Item>
				<a href="/profile/{profile.name}" class="w-full">Profile</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<a href="/auth/signout" class="flex gap-1 items-center w-full" data-sveltekit-reload>
					<LogOutIcon /> Sign Out
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

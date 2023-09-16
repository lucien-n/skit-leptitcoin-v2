<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Session, User } from '@supabase/supabase-js';
	import { LogOutIcon, UserIcon } from 'lucide-svelte';

	export let user: User;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center gap-1"><UserIcon /> Profile</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>{user.id}</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<a href="/profile/{user.id}" class="w-full">Profile</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<a href="/auth/signout" class="flex gap-1 items-center w-full" data-sveltekit-reload>
					<LogOutIcon /> Sign Out
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

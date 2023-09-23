<script lang="ts">
	import * as Card from '$components/ui/card';
	import * as Avatar from '$components/ui/avatar';
	import { formatDate } from '$lib/helper';

	export let profile: TProfile;
</script>

<Card.Root class="w-72">
	<Card.Header class="px-3 py-2">
		<div class="flex gap-2">
			<Avatar.Root class="w-16 h-16">
				<Avatar.Image src={profile.avatar_url} alt="@{profile.name}" />
				<Avatar.Fallback>{profile.name[0].toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col p-2">
				<p class="font-semibold">{profile.name}</p>
				<p class="text-sm">Joined {formatDate(profile.created_at)}</p>
			</div>
		</div>
	</Card.Header>
</Card.Root>

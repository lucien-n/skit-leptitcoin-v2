<script lang="ts">
	import * as Alert from '$components/ui/alert';
	import * as Card from '$components/ui/card';
	import type { PageData } from './$types';

	export let data: PageData;

	const { profile, error } = data;
</script>

{#if error}
	<Alert.Root>
		<Alert.Title>{error}</Alert.Title>
	</Alert.Root>
{/if}

{#if profile}
	<Card.Root>
		<Card.Header>
			<Card.Title>{profile.name}</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>Avatar Url: <a href={profile.avatar_url}>{profile.avatar_url}</a></p>
			<p>Created At: {profile.created_at}</p>
		</Card.Content>
	</Card.Root>
{/if}

<script lang="ts">
	import { CONDITIONS } from '$lib/constants';
	import { Badge } from '$lib/components/ui/badge';

	export let condition: number;

	let text = CONDITIONS.filter((el) => el.value == condition.toString())[0].label;
</script>

{#if condition >= 3}
	<Badge variant="default">{text}</Badge>
{:else if condition >= 1}
	<Badge variant="secondary">{text}</Badge>
{:else}
	<Badge variant="destructive">{text}</Badge>
{/if}

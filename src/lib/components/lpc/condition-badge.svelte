<script lang="ts">
	import { CONDITIONS } from '$lib/constants';
	import { Badge } from '$lib/components/ui/badge';

	export let condition: number;

	let text = CONDITIONS.filter((el) => el.value == condition)[0].label;
</script>

<div>
	{#if condition >= 3}
		<Badge variant="default">{text}</Badge>
	{:else if condition >= 1}
		<Badge variant="secondary">{text}</Badge>
	{:else}
		<Badge variant="destructive">{text}</Badge>
	{/if}
</div>

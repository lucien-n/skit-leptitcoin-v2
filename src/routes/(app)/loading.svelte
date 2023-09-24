<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<div transition:slide={{ duration: 200 }} class="w-full h-2 bg-primary overflow-x-hidden">
	<div id="indeterminate-progress" class="h-full w-full bg-white rounded-full" />
</div>

<style>
	#indeterminate-progress {
		animation: progress-animation 2s linear infinite;
		filter: blur(16px);
	}

	@keyframes progress-animation {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>

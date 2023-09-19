<script lang="ts">
	import Kbd from '$components/lpc/kbd.svelte';
	import type { Shortcut } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import type { KeyboardEventHandler } from 'svelte/elements';

	export let shortcut: Shortcut;

	const dispatch = createEventDispatcher();

	const getShortcutKeys = () => {
		const keys: string[] = [];

		if (shortcut.ctrlRequired === true) keys.push('CTRL');
		if (shortcut.shiftRequired === true) keys.push('ALT');
		if (shortcut.altRequired === true) keys.push('SHIFT');
		keys.push(shortcut.key.toUpperCase());

		return keys;
	};

	const handleKeypress: KeyboardEventHandler<Window> = (event) => {
		if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) return;
		if (shortcut.ctrlRequired && !event.ctrlKey) return;
		if (shortcut.shiftRequired && !event.shiftKey) return;
		if (shortcut.altRequired && !event.altKey) return;

		event.preventDefault();

		dispatch('shortcut', event);
	};
</script>

<svelte:window on:keypress={handleKeypress} />

<span class="flex items-center gap-1">
	{#each getShortcutKeys() as key, index}
		<Kbd>{key}</Kbd>
		{#if index < getShortcutKeys().length - 1}
			+
		{/if}
	{/each}
</span>

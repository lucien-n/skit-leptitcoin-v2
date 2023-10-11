<script lang="ts">
	import { uploadListingPicture } from '$lib/storage';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { Loader2, Upload } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let supabase: SupabaseClient;
	export let selected: boolean = false;

	let isUploading = false;
	let files: FileList;
	let url: string | undefined;
	let isFocused: boolean = false;

	$: selected = files && files.length === 1;

	const dispatch = createEventDispatcher();

	export const upload = async (listingUid: string) => {
		try {
			isUploading = true;
			url = await uploadListingPicture(supabase, files, listingUid);
			setTimeout(() => {
				dispatch('upload');
			}, 1000);
		} catch (error) {
			console.warn(error);
		} finally {
			isUploading = false;
		}
	};
</script>

<div
	class="border rounded-md hover:bg-primary-foreground outline-primary outline-offset-2"
	class:outline={isFocused}
>
	<input type="hidden" name="listingPictureUrl" value={url} />
	<div class="w-full h-full">
		{#if isUploading}
			<span class="animate-spin">
				<Loader2 />
			</span>
		{:else}
			<label for="single" class="h-full w-full p-3 hover:cursor-pointer flex justify-center gap-4">
				<Upload /> Upload {files ? files[0].name : 'picture'}
			</label>
			<input
				on:focusin={() => (isFocused = true)}
				on:focusout={() => (isFocused = false)}
				style="opacity: 0%; position:absolute;"
				type="file"
				id="single"
				accept="image/*"
				bind:files
				disabled={isUploading}
			/>
		{/if}
	</div>
</div>

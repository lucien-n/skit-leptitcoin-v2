<script lang="ts">
	import { uploadListingPicture } from '$lib/storage';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { Loader2, Upload } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let supabase: SupabaseClient;

	let isUploading = false;
	let files: FileList;
	let url: string | undefined;

	const dispatch = createEventDispatcher();

	const upload = async () => {
		try {
			isUploading = true;
			url = await uploadListingPicture(supabase, files);
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

<div>
	<input type="hidden" name="listingPictureUrl" value={url} />
	<div>
		{#if isUploading}
			<span class="animate-spin">
				<Loader2 />
			</span>
		{:else}
			<label for="single" class="h-full w-full p-3 hover:cursor-pointer">
				<Upload />
			</label>
			<input
				style="visibility: hidden; position:absolute;"
				type="file"
				id="single"
				accept="image/*"
				bind:files
				on:change={upload}
				disabled={isUploading}
			/>
		{/if}
	</div>
</div>

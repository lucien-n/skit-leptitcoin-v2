<script lang="ts">
	import { enhance } from '$app/forms';
	import ListingPictureUpload from '$components/lpc/listing-picture-upload.svelte';
	import * as Form from '$components/ui/form';
	import * as Select from '$components/ui/select';
	import { CATEGORIES, CONDITIONS } from '$lib/constants';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { newSchema, type NewSchema } from './schema';

	export let form: SuperValidated<NewSchema>;
	export let supabase: SupabaseClient;

	const dispatch = createEventDispatcher();

	let selectedCategoryLabel: string = 'Category';
	let selectedConditionLabel: string = 'Condition';

	let uploadPictureComp: ListingPictureUpload;

	let loading: boolean = false;
	let created: boolean = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			dispatch(result.type, result);
			created = true;
			if (result.type == 'success' && result.data?.uid) uploadPicture(result.data.uid);
		};
	};

	const uploadPicture = (listingUid: string) => {
		if (created && listingUid) uploadPictureComp.upload(listingUid);
	};

	const onCategorySelectedChange = ({ label }: { label: string } & any) =>
		(selectedCategoryLabel = label);

	const onConditionSelectedChange = ({ label }: { label: string } & any) =>
		(selectedConditionLabel = label);
</script>

<Form.Root schema={newSchema} {form} let:config debug>
	<form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-2">
		<Form.Field {config} name="title">
			<Form.Item>
				<Form.Label>Title</Form.Label>
				<Form.Input
					type="text"
					placeholder="Brown 3 seated leather couch"
					minlength={3}
					maxlength={80}
					required
				/>
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="description">
			<Form.Item>
				<Form.Label>Description</Form.Label>
				<Form.Description>Describe your listing in details</Form.Description>
				<Form.Textarea
					placeholder="Authentic leather
Easily fits 3 people
Armrests
One little scratch on the left side"
					minlength={3}
					maxlength={500}
					rows={6}
					required
					class="resize-none"
				/>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="price">
			<Form.Item>
				<Form.Label>Price</Form.Label>
				<Form.InputNumber placeholder="€" min={0} max={99999} required />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="category">
			<Form.Item>
				<Form.Label>Category</Form.Label>
				<Form.Select onSelectedChange={onCategorySelectedChange}>
					<Select.Trigger>{selectedCategoryLabel}</Select.Trigger>
					<Select.Content>
						<Select.Item value="category" label="Category">Category</Select.Item>
						{#each CATEGORIES as category}
							<Select.Group>
								<Select.Label>{category.name}</Select.Label>
								{#each category.subcategories as subcategory}
									<Select.Item
										value={category.name.toLowerCase() + '/' + subcategory.value}
										label={subcategory.label}>{subcategory.label}</Select.Item
									>
								{/each}
							</Select.Group>
						{/each}
					</Select.Content>
				</Form.Select>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="condition">
			<Form.Item>
				<Form.Label>Condition</Form.Label>
				<Form.Select onSelectedChange={onConditionSelectedChange}>
					<Select.Trigger>{selectedConditionLabel}</Select.Trigger>
					<Select.Content>
						<Select.Item value={-1} label="Condition">Condition</Select.Item>
						{#each CONDITIONS as condition}
							<Select.Item value={condition.value}>{condition.label}</Select.Item>
						{/each}
					</Select.Content>
				</Form.Select>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<ListingPictureUpload bind:this={uploadPictureComp} {supabase} />
		<Form.Button class="pt-2" disabled={loading}>{loading ? 'Creating' : 'Create'}</Form.Button>
	</form>
</Form.Root>

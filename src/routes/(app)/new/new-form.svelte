<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { newSchema, type NewSchema } from './schema';
	import { createEventDispatcher } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import * as Form from '$components/ui/form';
	import { enhance } from '$app/forms';
	import * as Select from '$components/ui/select';
	import { CATEGORIES, CONDITIONS } from '$lib/types';

	export let form: SuperValidated<NewSchema>;

	const dispatch = createEventDispatcher();

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			dispatch(result.type, result);
		};
	};
</script>

<Form.Root schema={newSchema} {form} let:config>
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
		<Form.Field {config} name="category">
			<Form.Item>
				<Form.Label>Category</Form.Label>
				<Form.Select>
					<Select.Trigger>Category</Select.Trigger>
					<Select.Content>
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
				<Form.Select>
					<Select.Trigger>State</Select.Trigger>
					<Select.Content>
						{#each CONDITIONS as condition}
							<Select.Item value={condition.value.toString()}>{condition.label}</Select.Item>
						{/each}
					</Select.Content>
				</Form.Select>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button disabled={loading}>{loading ? 'Creating' : 'Create'}</Form.Button>
	</form>
</Form.Root>

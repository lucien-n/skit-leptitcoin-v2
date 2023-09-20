<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$components/ui/button/button.svelte';
	import Input from '$components/ui/input/input.svelte';
	import Label from '$components/ui/label/label.svelte';
	import * as Select from '$components/ui/select';
	import Separator from '$components/ui/separator/separator.svelte';
	import * as Sheet from '$components/ui/sheet';
	import { CATEGORIES, CONDITIONS, type Condition } from '$lib/types';
	import { Settings2 } from 'lucide-svelte';

	let selectedCategory: { value: string; label: string } = { value: 'any', label: 'Any' };
	let selectedCondition: Condition = { value: 'any', label: 'Any' };

	let priceMinimum = 0;
	let priceMaximum = 0;

	const executeFilteredSearch = () => {
		const url = new URL($page.url.origin);

		if (selectedCategory.value !== 'any') url.searchParams.set('category', selectedCategory.value);
		if (selectedCondition.value !== 'any')
			url.searchParams.set('condition', selectedCondition.value);
		if (priceMinimum > 0) url.searchParams.set('price-min', priceMinimum.toString());
		if (priceMaximum > priceMinimum) url.searchParams.set('price-max', priceMaximum.toString());

		goto(url, { keepFocus: true });
	};
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="p-1 md:px-2"><Settings2 /></Button>
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Filters</Sheet.Title>
			<Sheet.Description>Modify your search filters</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-4 py-4">
			<Separator orientation="horizontal" />
			<div class="flex flex-col gap-4">
				<h1 class="text-lg font-semibold">Category</h1>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="category" class="text-right">Category</Label>
					<div class="col-span-3">
						<Select.Root bind:selected={selectedCategory}>
							<Select.Trigger>{selectedCategory.label}</Select.Trigger>
							<Select.Content>
								<Select.Item value="any" label="Any">Any</Select.Item>
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
						</Select.Root>
					</div>
				</div>
			</div>
			<Separator orientation="horizontal" />
			<div class="flex flex-col gap-4">
				<h1 class="text-lg font-semibold">Condition</h1>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="category" class="text-right">Condition</Label>
					<div class="col-span-3">
						<Select.Root bind:selected={selectedCondition}>
							<Select.Trigger>{selectedCondition.label}</Select.Trigger>
							<Select.Content>
								<Select.Item value="any" label="Any">Any</Select.Item>
								{#each CONDITIONS as condition}
									<Select.Item value={condition.value} label={condition.label}
										>{condition.label}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
			</div>
			<Separator orientation="horizontal" />
			<div class="flex flex-col gap-4">
				<h1 class="text-lg font-semibold">Price (€)</h1>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="category" class="text-right">Minimum</Label>
					<div class="col-span-3">
						<Input
							type="number"
							name="price-minimum"
							step="5"
							bind:value={priceMinimum}
							min="0"
							max="99999"
						/>
					</div>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="category" class="text-right">Maximum</Label>
					<div class="col-span-3">
						<Input
							type="number"
							name="price-maximum"
							step="5"
							bind:value={priceMaximum}
							min="0"
							max="99999"
						/>
					</div>
				</div>
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button
					builders={[builder]}
					type="submit"
					class="w-full"
					on:keydown={({ key }) => key === 'Enter' && executeFilteredSearch()}
					on:click={executeFilteredSearch}>Search</Button
				>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>

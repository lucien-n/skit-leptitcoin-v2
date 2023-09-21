<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { getFormField } from 'formsnap';
	import type { Select as SelectPrimitive } from 'bits-ui';

	type $$Props = SelectPrimitive.Props;
	const { setValue, name, value } = getFormField();
	export let onSelectedChange: $$Props['onSelectedChange'];
	export let selected: $$Props['selected'];
</script>

<Select.Root
	onSelectedChange={(v) => {
		onSelectedChange?.(v);
		setValue(v ? v.value : undefined);
	}}
	bind:selected
	{...$$restProps}
>
	<slot />
	<input hidden {name} value={$value} />
</Select.Root>

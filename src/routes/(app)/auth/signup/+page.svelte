<script lang="ts">
	import type { PageServerData } from './$types';
	import SignupForm from './signup-form.svelte';

	export let data: PageServerData;
</script>

<SignupForm form={data.form} />

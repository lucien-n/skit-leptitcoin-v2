<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import * as Alert from '$components/ui/alert';
	import * as Card from '$components/ui/card';
	import * as Tabs from '$components/ui/tabs';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import SigninForm from './signin-form.svelte';
	import SignupForm from './signup-form.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	export let form: any;

	let value: string = 'signup';

	const gotoHome = () => {
		if (browser) goto('/', { invalidateAll: true, replaceState: true });
	};

	onMount(() => (value = $page.url.searchParams.get('mode') || 'signup'));

	const onValueChange = (val: any) => {
		$page.url.searchParams.set('mode', val);
		if (browser) goto($page.url);
	};
</script>

<section class="w-full h-full flex justify-center items-center">
	<div class="w-full md:w-2/3 lg:w-3/5 xl:w-2/5 gap-2 flex flex-col">
		{#if form?.error}
			<Alert.Root>
				<Alert.Title class="font-semibold">Auth error</Alert.Title>
				<Alert.Description>{form.error.message || form.error}</Alert.Description>
			</Alert.Root>
		{/if}

		<Tabs.Root bind:value {onValueChange}>
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
				<Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="signup">
				<Card.Root class="w-full">
					<Card.Content>
						<SignupForm form={data.signupForm} on:success={gotoHome} />
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="signin">
				<Card.Root class="w-full">
					<Card.Content>
						<SigninForm form={data.signinForm} on:success={gotoHome} />
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</section>

<script lang="ts">
	import * as Form from '$components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { signinSchema, type SigninSchema } from './schema';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	import Button from '$components/ui/button/button.svelte';
	import { Eye, EyeOff } from 'lucide-svelte';

	export let form: SuperValidated<SigninSchema>;

	const dispatch = createEventDispatcher();

	let loading = false;

	let showPassword: boolean = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result }) => {
			loading = false;
			dispatch(result.type);
		};
	};
</script>

<Form.Root schema={signinSchema} {form} let:config>
	<form method="POST" action="?/signin" use:enhance={handleSubmit} class="flex flex-col gap-2">
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Input type="email" placeholder="jhon.doe@mail.com" />
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<div class="relative">
					<Form.Input
						type={showPassword ? 'text' : 'password'}
						minlength={8}
						maxlength={255}
						placeholder="●●●●●●●●"
					/>
					<Button
						class="absolute top-0 right-0"
						variant="ghost"
						type="button"
						aria-label="toggle show password"
						on:click={() => (showPassword = !showPassword)}
					>
						{#if showPassword}
							<EyeOff />
						{:else}
							<Eye />
						{/if}
					</Button>
				</div>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button disabled={loading}>{loading ? 'Signing In' : 'Sign In'}</Form.Button>
	</form>
</Form.Root>

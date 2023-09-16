<script lang="ts">
	import * as Form from '$components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { signupSchema, type SignupSchema } from './schema';
	import { enhance } from '$app/forms';

	export let form: SuperValidated<SignupSchema>;

	let loading = false;

	const handleSubmit = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<Form.Root schema={signupSchema} {form} let:config>
	<form method="POST" action="?/signup" use:enhance={handleSubmit} class="flex flex-col gap-2">
		<Form.Field {config} name="name">
			<Form.Item>
				<Form.Label>Name</Form.Label>
				<Form.Input type="text" placeholder="John Doe" />
				<Form.Description>You don't have to enter your legal name</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
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
				<Form.Input type="password" minlength={8} maxlength={255} placeholder="●●●●●●●●" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button disabled={loading}>{loading ? 'Signing Up' : 'Sign Up'}</Form.Button>
	</form>
</Form.Root>

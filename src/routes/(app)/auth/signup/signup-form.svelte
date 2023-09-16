<script lang="ts">
	import * as Form from '$components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { signupSchema, type SignupSchema } from './schema';

	export let form: SuperValidated<SignupSchema>;
</script>

<Form.Root schema={signupSchema} {form} let:config debug>
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label />
			<Form.Input />
			<Form.Description>You don't have to enter your legal name</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="email">
		<Form.Item>
			<Form.Label />
			<Form.Input />
			<Form.Description />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>

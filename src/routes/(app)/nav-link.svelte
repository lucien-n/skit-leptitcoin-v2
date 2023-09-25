<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$utils';

	export let href: string;
	export let external: boolean = false;
	export let variant: 'default' | 'primary' = 'default';

	let className: string | undefined | null = '';
	export { className as class };
</script>

<a
	{href}
	class={cn(
		'transition-colors hover:text-foreground/80 flex gap-x-1 items-center',
		$page.url.pathname === href ? 'text-foreground' : 'text-foreground/60 no-underline',
		variant === 'primary' ? 'px-3 py-2 rounded-md bg-primary' : '',
		className
	)}
	target={external ? '_blank' : undefined}
	rel={external ? 'noreferrer' : undefined}
>
	<span class={cn(variant === 'primary' ? 'text-white' : '')}>
		<slot name="icon" />
	</span>
	<span class={cn(variant === 'primary' ? 'text-white' : '')}>
		<slot />
	</span>
</a>

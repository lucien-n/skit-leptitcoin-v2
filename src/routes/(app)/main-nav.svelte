<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$utils';

	type Link = { href: string; title: string; external: boolean; class?: string };

	const links: Link[] = [
		{
			href: '/',
			title: 'Home',
			external: false,
			class: 'font-bold'
		}
	];
</script>

<div class="border-b p-3 shadow-md">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<!-- <Icons.logo class="h-6 w-6" /> -->
		<span class="hidden font-bold sm:inline-block"> LePtitCoin </span>
	</a>
	<nav class="flex items-center w-[60%] mx-auto space-x-6 text-lg font-medium">
		{#each links as link}
			<a
				href={link.href}
				class={cn(
					'transition-colors hover:text-foreground/80',
					$page.url.pathname === link.href ? 'text-foreground underline' : 'text-foreground/60',
					link.class
				)}
				target={link.external ? '_blank' : undefined}
				rel={link.external ? 'noreferrer' : undefined}
			>
				{link.title}
			</a>
		{/each}
	</nav>
</div>

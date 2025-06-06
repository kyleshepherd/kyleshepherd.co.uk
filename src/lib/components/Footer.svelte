<script lang="ts">
	const links: {
		href: string;
		label: string;
	}[] = [
		{
			href: "https://github.com/kyleshepherd",
			label: "Github",
		},
		{
			href: "https://www.linkedin.com/in/kyleshepherddev/",
			label: "LinkedIn",
		},
	];
</script>

<footer class="xxs:p-3 flex items-center gap-4 p-2 sm:px-5">
	{#each links as link}
		<a
			href={link.href}
			target="_blank"
			rel="noopener noreferrer"
			class="link font-mono text-xl sm:text-2xl"
		>
			{link.label}
		</a>
	{/each}
</footer>

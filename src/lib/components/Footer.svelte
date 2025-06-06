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

<footer class="xxs:p-3 p-2 sm:px-5">
	<div class="flex items-center gap-4 border-t border-white/50 pt-3">
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
	</div>
</footer>

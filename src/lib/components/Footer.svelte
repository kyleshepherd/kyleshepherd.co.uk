<script lang="ts">
	import PinIcon from "./PinIcon.svelte";

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
	<div class="flex items-center justify-between gap-4 border-t border-white/50 pt-3">
		<div class="flex items-center gap-4">
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
		<p class="font-mono text-xl sm:text-2xl">
			<PinIcon classes="inline size-[20px] sm:size-[24px] align-text-top" />
			London, UK
		</p>
	</div>
</footer>

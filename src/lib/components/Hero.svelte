<script lang="ts">
	import HandIcon from "$lib/components/HandIcon.svelte";
</script>

<div class="component-padding xxs:pt-3 relative pt-2 sm:pt-5">
	<h1
		class="xs:text-4xl leading-chill relative z-10 max-w-6xl font-serif text-3xl tracking-wide text-balance uppercase sm:text-5xl md:text-6xl lg:text-7xl 2xl:max-w-[1780px] 2xl:text-8xl"
	>
		<HandIcon
			classes="inline size-[30px] xs:size-[36px] sm:size-[48px] md:size-[60px] lg:size-[72px] 2xl:size-[96px] align-bottom mr-1 sm:mr-2"
		/>I'm a Senior Software Engineer specialising in Svelte and Go, currently building e-commerce
		websites and products at
		<a
			href="https://thisissoon.com/"
			class="link decoration-from-font underline-offset-[1rem]"
			target="_blank"
			rel="noopener noreferrer">SOON_</a
		>.
	</h1>
	<enhanced:img
		alt="A picture of me, Kyle Shepherd"
		src="/src/lib/assets/Kyle.jpeg"
		sizes="min(1134px, 100vw)"
		class="-z-10 -mt-8 opacity-35 grayscale sm:mr-0 sm:ml-auto md:-mt-24 md:max-w-[65%] xl:-mt-32 xl:max-w-[min(1000px,_45vw)]"
	/>
</div>

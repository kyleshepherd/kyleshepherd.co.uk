<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import "../app.css";

	let { children } = $props();
</script>

<div
	class="pointer-events-none fixed inset-0 z-30 bg-[url(/imgs/noise.png)] bg-repeat-round opacity-5 bg-blend-soft-light"
></div>
<div class="mx-auto max-w-[2560px]">
	<Header />
	{@render children()}
	<Footer />
</div>

<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import "../app.css";

	let { children } = $props();
</script>

<div
	class="pointer-events-none fixed inset-0 z-30 bg-[url(/imgs/noise.svg)] opacity-5 bg-blend-soft-light"
></div>
<Header />
{@render children()}
<Footer />

<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import { onMount } from "svelte";
	import "../app.css";
	import Lenis from "lenis";

	let { children } = $props();

	onMount(() => {
		const lenis = new Lenis({
			autoRaf: true,
		});
	});
</script>

<div
	class="pointer-events-none fixed inset-0 z-30 bg-[url(/imgs/noise.png)] bg-repeat-round opacity-5 bg-blend-soft-light"
></div>
<div class="mx-auto max-w-[2560px]">
	<Header />
	{@render children()}
	<Footer />
</div>

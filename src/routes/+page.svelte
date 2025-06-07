<script lang="ts">
	import About from "$lib/components/About.svelte";
	import Contact from "$lib/components/Contact.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import Projects from "$lib/components/Projects.svelte";
	import { projects } from "$lib/data/projects";
</script>

<Hero />
<About />
<Projects {projects} />
<Contact />

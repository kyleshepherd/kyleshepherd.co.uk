<script lang="ts">
	import type { Project } from "$lib/data/projects";
	import TDImg from "$lib/assets/projects/tomdixon.png?enhanced";
	import BelstaffImg from "$lib/assets/projects/belstaff.png?enhanced";
	import BDImg from "$lib/assets/projects/beddowsdesign.png?enhanced";
	import AYImg from "$lib/assets/projects/appare.png?enhanced";

	let { projects }: { projects: Project[] } = $props();

	const getImg = (i: number) => {
		switch (i) {
			case 0:
			default:
				return TDImg;
			case 1:
				return BelstaffImg;
			case 2:
				return BDImg;
			case 3:
				return AYImg;
		}
	};
</script>

<div class="component-padding mt-8 sm:mt-12">
	<h2 class="xs:text-3xl font-serif text-2xl sm:text-4xl">Projects</h2>
	<div class="mt-2 flex flex-col gap-8 sm:mt-6 md:gap-12">
		{#each projects as project, i}
			<div
				class="group flex flex-wrap justify-between gap-4 border-b border-white/50 pb-8 md:flex-nowrap md:gap-6 md:pb-12"
			>
				<div class="basis-full md:basis-1/2">
					<h3 class="mb-2 font-mono text-2xl sm:text-3xl 2xl:text-4xl">{project.name}</h3>
					<a
						href={project.projectUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Link to {project.name} website"
					>
						<enhanced:img
							alt="Screenshot of the {project.name} website"
							src={getImg(i)}
							sizes="min(1280px, 100vw)"
							class="opacity-60 grayscale-100 transition-all group-hover:opacity-100 group-hover:grayscale-0"
						/>
					</a>
				</div>
				<div class="flex basis-full flex-col items-start justify-between md:basis-1/2">
					<p class="text-lg md:mt-9 2xl:mt-10 2xl:text-xl">{@html project.body}</p>
					<a
						href={project.projectUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="link mt-4 font-serif text-xl"
					>
						View Site
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>

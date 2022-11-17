<script lang="ts">
  import WorkBlock from "../../components/WorkBlock/WorkBlock.svelte";
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ projects } = data);
</script>

<div class="flex-grow basis-full mb-8 flex flex-col justify-center">
  <PageHeader header="Work" />
  {#each projects as project}
    <WorkBlock
      title={project.name}
      image={project.imageUrl}
      body={project.description}
      repoLink={project.repo || ""}
      projectLink={project.project || ""}
    />
  {/each}
</div>

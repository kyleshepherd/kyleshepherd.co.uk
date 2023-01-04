<script lang="ts">
  import WorkBlock from "../../components/WorkBlock/WorkBlock.svelte";
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ projects, guildCount } = data);
</script>

<div class="flex flex-col justify-center flex-grow mb-8 basis-full">
  <PageHeader header="Work" />
  {#each projects as project}
    <WorkBlock
      title={project.name}
      image={project.imageUrl}
      body={project.description}
      repoLink={project.repo || ""}
      projectLink={project.project || ""}
      guildCount={project.showServerCount ? guildCount : undefined}
    />
  {/each}
</div>

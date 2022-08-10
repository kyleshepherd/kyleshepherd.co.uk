<script lang="ts">
  import WorkBlock from "../../components/WorkBlock/WorkBlock.svelte";
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
  import { workData } from "../../data/work.data";
</script>

<div class="flex-grow basis-full mb-8 flex flex-col justify-center">
  <PageHeader header="Work" />
  {#each workData as project}
    <WorkBlock
      title={project.title}
      image={project.image}
      body={project.body}
      repoLink={project.repoLink || ""}
      projectLink={project.projectLink || ""}
    />
  {/each}
</div>

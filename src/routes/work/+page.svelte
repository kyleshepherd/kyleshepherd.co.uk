<script lang="ts">
  import WorkBlock from "../../components/WorkBlock/WorkBlock.svelte";
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  export let data: PageData;

  let guildCount: number;

  $: ({ projects } = data);

  onMount(async () => {
    const res = await fetch(
      "https://tarkov-tk-server-count-d55njyagta-ew.a.run.app/count",
    );
    const data = await res.json();

    guildCount = data?.count ? data.count : 0;
  });
</script>

<div class="mb-8 flex flex-grow basis-full flex-col justify-center">
  <PageHeader header="Work" />
  {#each projects as project}
    <WorkBlock
      title={project.name}
      image={project.imageUrl + "?w=752&auto=format"}
      body={project.description}
      repoLink={project.repo || ""}
      projectLink={project.project || ""}
      guildCount={project.showServerCount ? guildCount : undefined}
    />
  {/each}
</div>

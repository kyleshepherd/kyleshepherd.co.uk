<script lang="ts">
  import WorkBlock from "../../components/WorkBlock/WorkBlock.svelte";
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
  import { workData } from "../../data/work.data";
</script>

<style lang="scss">
  .work {
    flex-grow: 1;
    flex-basis: 100%;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--intro {
      margin-bottom: 1.5rem;
    }
  }
</style>

<div class="work">
  <PageHeader header="Work" />
  <p class="work--intro">
    Below is a selection of projects I've worked on across work, personal
    projects, freelance and university.
  </p>
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

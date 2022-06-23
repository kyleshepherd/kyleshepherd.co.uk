<script lang="ts">
  import WorkBlock from "../../components/WorkBlock/WorkBlock.svelte";
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
</script>

<style lang="scss">
  .work {
    flex-grow: 1;
    flex-basis: 100%;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

<div class="work">
  <PageHeader header="Work" />
  <p>
    Below is a selection of projects I've worked on across work, personal
    projects, freelance and university.
  </p>
  <WorkBlock title="Belstaff" />
</div>

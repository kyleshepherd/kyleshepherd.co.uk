<script>
  import PageHeader from "../components/PageHeader/PageHeader.svelte";
  import DetailBlock from "../components/DetailBlock/DetailBlock.svelte";
</script>

<style lang="scss">
  .home {
    flex-grow: 1;
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--detail {
      margin-bottom: 2rem;
    }
  }
</style>

<div class="home">
  <PageHeader header="Frontend Engineer" />
  <div class="home--detail">
    <DetailBlock header="Currently" content="Frontend Engineer @ SOON_" />
  </div>
  <div class="home--detail">
    <DetailBlock header="Building with" content="Svelte, React & Go" />
  </div>
  <div class="home--detail">
    <DetailBlock header="Based in" content="London, UK" />
  </div>
</div>

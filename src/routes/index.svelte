<script>
  import PageHeader from "../components/PageHeader/PageHeader.svelte";
  import DetailBlock from "../components/DetailBlock/DetailBlock.svelte";
</script>

<style lang="scss">
  .home {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--title {
      margin-bottom: 3rem;
      font-size: 3.5rem;

      @include breakpoint(sm) {
        font-size: 4.5rem;
        margin-bottom: 4rem;
      }

      @include breakpoint(md) {
        font-size: 5rem;
      }

      @include breakpoint(lg) {
        font-size: 6rem;
      }
    }

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

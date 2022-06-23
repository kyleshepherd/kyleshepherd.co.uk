<script lang="ts">
  export let header: string;
</script>

<style lang="scss">
  .page-header {
    font-size: 3.5rem;
    margin-bottom: 3rem;

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
</style>

<h1 class="page-header">{header}</h1>

<script lang="ts">
  export let header: string;
  export let content: string;
</script>

<style lang="scss">
  .detail-block {
    &--header {
      font-size: 1.75rem;
      @include breakpoint(sm) {
        font-size: 2rem;
      }
      @include breakpoint(md) {
        font-size: 2.25rem;
      }
    }
    &--content {
      font-size: 1.75rem;
      @include breakpoint(sm) {
        font-size: 2rem;
      }
      @include breakpoint(md) {
        font-size: 2.25rem;
      }
    }
  }
</style>

<div class="detail-block">
  <h2 class="detail-block--header">{header}</h2>
  <p class="detail-block--content">{content}</p>
</div>

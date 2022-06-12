<style lang="scss">
  :global {
    @import "../styles/global.scss";
  }

  main {
    max-width: $lg;
    padding: 1em;
    margin: 0 auto;
  }
</style>

<main>
  <slot />
</main>

<script lang="ts">
  import Footer from "../components/Footer/Footer.svelte";
  import Header from "../components/Header/Header.svelte";
</script>

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
  <Header />
  <slot />
  <Footer />
</main>

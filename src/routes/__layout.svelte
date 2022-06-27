<script lang="ts">
  import Footer from "../components/Footer/Footer.svelte";
  import Header from "../components/Header/Header.svelte";
</script>

<style lang="scss">
  :global {
    @import "../styles/global.scss";
  }

  main {
    max-width: $xl;
    min-height: 100vh;
    padding: 1rem 1.5rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
</style>

<main>
  <Header />
  <slot />
  <Footer />
</main>

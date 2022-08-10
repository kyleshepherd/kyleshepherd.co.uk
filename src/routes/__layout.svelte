<script lang="ts">
  import "../styles/app.css";
  import Footer from "../components/Footer/Footer.svelte";
  import Header from "../components/Header/Header.svelte";
</script>

<main
  class="bg-green text-light py-4 flex flex-col min-h-screen selection:bg-orange"
>
  <div class="container flex flex-col flex-grow">
    <Header />
    <slot />
    <Footer />
  </div>
</main>

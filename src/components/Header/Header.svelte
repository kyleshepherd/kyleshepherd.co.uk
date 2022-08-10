<script lang="ts">
  import Menu from "../Menu/Menu.svelte";

  let showMenu = false;

  const toggleMenu = (open: boolean) => {
    showMenu = open;
  };

  $: if (typeof document !== "undefined") {
    if (showMenu) {
      document.querySelector("html")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("html")?.classList.remove("overflow-hidden");
    }
  }
</script>

<div class="flex justify-between items-start mb-8">
  <h1 class="m-0 font-serif text-4xl sm:text-5xl">
    <a class="no-underline" href="/">Kyle Shepherd</a>
  </h1>
  <button
    type="button"
    title="Toggle Menu"
    class="text-light transition-colors hover:text-orange"
    on:click={() => toggleMenu(true)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
      ><path
        fill="currentColor"
        d="M22.5 38V25.5H10V22.5H22.5V10H25.5V22.5H38V25.5H25.5V38Z"
      /></svg
    >
  </button>
</div>

{#if showMenu}
  <Menu on:closeMenu={() => toggleMenu(false)} />
{/if}

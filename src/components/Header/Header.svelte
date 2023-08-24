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

<div class="mb-8 flex items-start justify-between">
  <h1 class="m-0 font-display text-4xl font-bold tracking-wide sm:text-5xl">
    <a class="no-underline" href="/">Kyle Shepherd</a>
  </h1>
  <button
    type="button"
    title="Toggle Menu"
    class="text-light transition-colors hover:text-orange"
    on:click={() => toggleMenu(true)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
      ><path
        d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"
        fill="currentColor"
      />
    </svg>
  </button>
</div>

{#if showMenu}
  <Menu on:closeMenu={() => toggleMenu(false)} />
{/if}

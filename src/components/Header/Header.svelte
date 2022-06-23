<script lang="ts">
  import Menu from "../Menu/Menu.svelte";

  let showMenu = false;

  const toggleMenu = (open: boolean) => {
    showMenu = open;
  };
</script>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    &--open-menu {
      border: none;
      padding: 0;
      background: none;
      color: $light;
      transition: color 0.2s;
      position: relative;

      @include breakpoint(sm) {
      }

      &:hover {
        color: $orange;
      }
    }
    &--logo {
      margin: 0;
      @include breakpoint(sm) {
        font-size: 3rem;
      }
      &__link {
        text-decoration: none;
      }
    }
  }
</style>

<div class="header">
  <h1 class="header--logo">
    <a class="header--logo__link" href="/">Kyle Shepherd</a>
  </h1>
  <button
    type="button"
    title="Toggle Menu"
    class="header--open-menu"
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

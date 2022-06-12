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
    &--open-menu {
      border: none;
      padding: 0;
      margin: 0.5rem 0 0;
      background: none;
      color: $light;
      font-size: 3.5rem;
      transition: color 0.2s;
      line-height: 0.5;
      position: relative;
      &:hover {
        color: $orange;
      }
    }
    &--logo {
      margin: 0;
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
    +
  </button>
</div>

{#if showMenu}
  <Menu on:closeMenu={() => toggleMenu(false)} />
{/if}

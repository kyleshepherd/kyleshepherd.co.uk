<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { circInOut } from "svelte/easing";
  import MenuList from "../MenuList/MenuList.svelte";

  const dispatch = createEventDispatcher();

  const closeMenu = () => {
    dispatch("closeMenu");
  };
</script>

<style lang="scss">
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $orange;
    display: flex;
    flex-direction: column;
    &--top-wrapper {
      max-width: $lg;
      padding: 1em;
      margin: 0 auto;
      display: flex;
      width: 100%;
      flex-direction: column;
      flex: 1 1 0;
    }
    &--header {
      display: flex;
      justify-content: flex-end;
    }
    &--close-menu {
      border: none;
      padding: 0;
      margin: 0.5rem 0 0;
      transform: rotateZ(45deg);
      background: none;
      color: $light;
      font-size: 3.5rem;
      transition: color 0.2s;
      line-height: 0.5;
      position: relative;
      &:hover {
        color: $green;
      }
    }
    &--content {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>

<div class="menu" transition:slide={{ duration: 300, easing: circInOut }}>
  <div class="menu--top-wrapper">
    <div class="menu--header">
      <button
        type="button"
        title="Toggle Menu"
        class="menu--close-menu"
        on:click={closeMenu}
      >
        +
      </button>
    </div>
    <div class="menu--content">
      <MenuList on:clickItem={closeMenu} />
    </div>
  </div>
  <div class="menu--footer">Social Links</div>
</div>

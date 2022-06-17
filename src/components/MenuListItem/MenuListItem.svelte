<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { MenuItem } from "../MenuList/MenuList.svelte";

  export let item: MenuItem;

  const dispatch = createEventDispatcher();

  const clickItem = () => {
    dispatch("clickItem");
  };
</script>

<style lang="scss">
  .menu-list-item {
    font-family: "DM Serif Display", serif;
    text-decoration: none;
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: 0.05rem;

    @include breakpoint(sm) {
      font-size: 3.5rem;
    }

    &:hover {
      color: $green;
    }
  }
</style>

<a on:click={clickItem} href={item.href} class="menu-list-item">{item.title}</a>

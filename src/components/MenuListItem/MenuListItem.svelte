<script lang="ts">
  import type { MenuItem } from "../MenuList/MenuList.svelte";

  export let item: MenuItem;
</script>

<style lang="scss">
  .menu-list-item {
    font-family: "DM Serif Display", serif;
    text-decoration: none;
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    &:hover {
      color: $green;
    }
  }
</style>

<a href={item.href} class="menu-list-item">{item.title}</a>

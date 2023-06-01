<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { MenuItem } from "../MenuList/MenuList.svelte";

  export let item: MenuItem;

  const dispatch = createEventDispatcher();

  const clickItem = () => {
    dispatch("clickItem");
  };
</script>

<a
  on:click={clickItem}
  href={item.href}
  class="font-display text-5xl font-bold tracking-wide transition-colors hover:text-green sm:text-6xl"
>
  {item.title}
</a>

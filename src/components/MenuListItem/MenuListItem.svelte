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
  class="font-serif text-5xl transition-colors sm:text-6xl hover:text-green"
>
  {item.title}
</a>

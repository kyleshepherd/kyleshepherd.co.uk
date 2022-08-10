<script lang="ts" context="module">
  export type MenuItem = {
    title: string;
    href: string;
  };
</script>

<script lang="ts">
  import MenuListItem from "../MenuListItem/MenuListItem.svelte";

  let items: MenuItem[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Work",
      href: "/work",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];
</script>

<ul class="list-none text-right m-0">
  {#each items as item}
    <li class="mb-6 last:mb-0">
      <MenuListItem on:clickItem {item} />
    </li>
  {/each}
</ul>

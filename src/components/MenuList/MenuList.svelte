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

<style lang="scss">
  .menu-list {
    list-style-type: none;
    text-align: right;
    margin: 0;
  }
</style>

<ul class="menu-list">
  {#each items as item}
    <li class="menu-list--item">
      <MenuListItem {item} />
    </li>
  {/each}
</ul>

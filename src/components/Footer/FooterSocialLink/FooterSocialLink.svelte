<script lang="ts">
  export let url: string;
  export let hoverGreen = false;
</script>

<a
  href={url}
  target="_blank"
  class="text-light text-3xl transition-colors sm:text-4xl {hoverGreen
    ? 'hover:text-green'
    : 'hover:text-orange'}"
>
  <slot />
</a>

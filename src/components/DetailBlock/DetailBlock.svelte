<script lang="ts">
  export let header: string;
  export let content: string;
</script>

<div>
  <h2 class="mb-2 font-display text-3xl font-bold tracking-wide md:text-4xl">
    {header}
  </h2>
  <p class="text-2xl md:text-3xl">{content}</p>
</div>

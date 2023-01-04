<script lang="ts">
  export let title: string;
  export let image: string;
  export let body: string;
  export let repoLink: string;
  export let projectLink: string;
  export let guildCount: number | undefined;
</script>

<div class="flex flex-wrap gap-12 mb-12 sm:flex-nowrap">
  <div class="items-start basis-full sm:basis-1/2">
    <h2 class="mb-1 font-serif text-3xl md:text-4xl">{title}</h2>
    <img class="w-full" src={image} alt={title} />
  </div>
  <div class="items-start basis-full sm:basis-1/2">
    <p class="mb-4 text-lg sm:text-xl md:mt-8">{@html body}</p>
    {#if guildCount}
      <p class="mb-4 text-lg font-bold sm:text-xl">
        Currently installed on {guildCount} servers!
      </p>
    {/if}
    <div class="flex flex-wrap md:flex-nowrap md:gap-4">
      {#if projectLink}
        <a
          href={projectLink}
          target="_blank"
          rel="noreferrer"
          class="px-4 py-3 mb-3 font-serif text-xl text-center transition-colors border-2 rounded-lg border-orange basis-full md:text-2xl md:basis-1/2 hover:bg-orange hover:text-light"
        >
          View Project
        </a>
      {/if}
      {#if repoLink}
        <a
          href={repoLink}
          target="_blank"
          rel="noreferrer"
          class="px-4 py-3 mb-3 font-serif text-xl text-center transition-colors border-2 rounded-lg border-orange basis-full md:text-2xl md:basis-1/2 hover:bg-orange hover:text-light"
        >
          View Repo
        </a>
      {/if}
    </div>
  </div>
</div>

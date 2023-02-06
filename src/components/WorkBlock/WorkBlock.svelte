<script lang="ts">
  export let title: string;
  export let image: string;
  export let body: string;
  export let repoLink: string;
  export let projectLink: string;
  export let guildCount: number | undefined;
</script>

<div class="mb-12 flex flex-wrap gap-12 sm:flex-nowrap">
  <div class="basis-full items-start sm:basis-1/2">
    <h2 class="mb-1 font-serif text-3xl md:text-4xl">{title}</h2>
    <img class="w-full" src={image} alt={title} loading="lazy" />
  </div>
  <div class="basis-full items-start sm:basis-1/2">
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
          class="mb-3 basis-full rounded-lg border-2 border-orange px-4 py-3 text-center font-serif text-xl transition-colors hover:bg-orange hover:text-light md:basis-1/2 md:text-2xl"
        >
          View Project
        </a>
      {/if}
      {#if repoLink}
        <a
          href={repoLink}
          target="_blank"
          rel="noreferrer"
          class="mb-3 basis-full rounded-lg border-2 border-orange px-4 py-3 text-center font-serif text-xl transition-colors hover:bg-orange hover:text-light md:basis-1/2 md:text-2xl"
        >
          View Repo
        </a>
      {/if}
    </div>
  </div>
</div>

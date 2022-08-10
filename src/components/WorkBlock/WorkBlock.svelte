<script lang="ts">
  export let title: string;
  export let image: string;
  export let body: string;
  export let repoLink: string;
  export let projectLink: string;
</script>

<style lang="scss">
  .work-block {
    &--button {
      border: 2px solid $orange;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      text-decoration: none;
      font-family: "DM Serif Display", serif;
      font-size: 1.25rem;
      transition: all 0.2s;
      text-align: center;
      flex-basis: 100%;
      margin-bottom: 0.75rem;

      @include breakpoint(md) {
        font-size: 1.5rem;
        flex-basis: 50%;
      }

      &:hover {
        background: $orange;
        color: white;
      }
    }
  }
</style>

<div class="flex flex-wrap mb-12 sm:flex-nowrap gap-12">
  <div class="basis-full items-start sm:basis-1/2">
    <h2 class="font-serif text-3xl mb-1 md:text-4xl">{title}</h2>
    <img class="w-full" src="imgs/{image}" alt={title} />
  </div>
  <div class="basis-full items-start sm:basis-1/2">
    <p class="text-lg mb-4 sm:text-xl md:mt-8">{@html body}</p>
    <div class="flex flex-wrap md:flex-nowrap md:gap-4">
      {#if projectLink}
        <a
          href={projectLink}
          target="_blank"
          class=" border-orange border-2 rounded-lg px-4 py-3 font-serif text-xl transition-colors text-center basis-full mb-3 md:text-2xl md:basis-1/2 hover:bg-orange hover:text-light"
        >
          View Project
        </a>
      {/if}
      {#if repoLink}
        <a
          href={repoLink}
          target="_blank"
          class=" border-orange border-2 rounded-lg px-4 py-3 font-serif text-xl transition-colors text-center basis-full mb-3 md:text-2xl md:basis-1/2 hover:bg-orange hover:text-light"
        >
          View Repo
        </a>
      {/if}
    </div>
  </div>
</div>

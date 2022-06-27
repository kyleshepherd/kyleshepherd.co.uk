<script lang="ts">
  export let title: string;
  export let image: string;
  export let body: string;
  export let repoLink: string;
  export let projectLink: string;
</script>

<style lang="scss">
  .work-block {
    display: flex;
    gap: 0rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;

    &--left,
    &--right {
      flex-basis: 100%;
      align-items: flex-start;
    }

    @include breakpoint(sm) {
      flex-wrap: nowrap;
      gap: 3rem;

      &--left,
      &--right {
        flex-basis: 50%;
      }
    }

    &--title {
      font-size: 2rem;
      margin-bottom: 0.25rem;

      @include breakpoint(md) {
        font-size: 2.5rem;
      }
    }

    &--image {
      width: 100%;
    }

    &--body {
      margin-bottom: 1rem;

      @include breakpoint(sm) {
        margin-top: 2rem;
      }
    }

    &--buttons {
      display: flex;
      flex-wrap: wrap;

      @include breakpoint(md) {
        flex-wrap: nowrap;
        gap: 1rem;
      }
    }

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

<div class="work-block">
  <div class="work-block--left">
    <h2 class="work-block--title">{title}</h2>
    <img class="work-block--image" src="imgs/{image}" alt={title} />
  </div>
  <div class="work-block--right">
    <p class="work-block--body">{@html body}</p>
    <div class="work-block--buttons">
      {#if projectLink}
        <a href={projectLink} target="_blank" class="work-block--button">
          View Project
        </a>
      {/if}
      {#if repoLink}
        <a href={repoLink} target="_blank" class="work-block--button">
          View Repo
        </a>
      {/if}
    </div>
  </div>
</div>

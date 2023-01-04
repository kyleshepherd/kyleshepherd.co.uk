<script lang="ts">
  import PageHeader from "../components/PageHeader/PageHeader.svelte";
  import DetailBlock from "../components/DetailBlock/DetailBlock.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ track } = data);
</script>

<div class="flex flex-col justify-center flex-grow basis-full">
  <PageHeader header="Frontend Engineer" />
  <div class="mb-8">
    <DetailBlock
      header="Currently"
      content="Senior Software Engineer @ SOON_"
    />
  </div>
  <div class="mb-8">
    <DetailBlock header="Building with" content="Svelte, React & Go" />
  </div>
  <div class="mb-8">
    <DetailBlock header="Based in" content="London, UK" />
  </div>
  {#if track}
    <div class="mb-8">
      <DetailBlock
        header={track.nowPlaying ? "Listening to" : "Last listened to"}
        content={track.title + " by " + track.artist}
      />
    </div>
  {/if}
</div>

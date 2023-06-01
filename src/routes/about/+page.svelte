<script lang="ts">
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ about } = data);
</script>

<div class="mb-8 flex flex-grow basis-full flex-col justify-center">
  <PageHeader header="About" />
  <div class="flex flex-wrap justify-start gap-8 sm:flex-nowrap">
    <div class="basis-full sm:basis-1/2">
      <p class="text-lg sm:text-xl">
        {@html about.aboutBody}
      </p>
    </div>
    <div class="basis-full sm:basis-1/2">
      <img
        class="mx-auto w-full max-w-lg rounded-full drop-shadow-lg"
        src="/imgs/Kyle.jpg"
        alt="Lil piccy of me innit"
      />
    </div>
  </div>
</div>

<script lang="ts">
  import PageHeader from "../components/PageHeader/PageHeader.svelte";
  import DetailBlock from "../components/DetailBlock/DetailBlock.svelte";
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
    <DetailBlock header="Building with" content="Svelte & Go" />
  </div>
  <div class="mb-8">
    <DetailBlock header="Based in" content="London, UK" />
  </div>
</div>

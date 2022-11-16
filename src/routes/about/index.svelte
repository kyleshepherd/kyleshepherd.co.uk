<script lang="ts">
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
</script>

<div class="flex-grow basis-full mb-8 flex flex-col justify-center">
  <PageHeader header="About" />
  <div class="flex flex-wrap justify-start gap-8 sm:flex-nowrap">
    <div class="basis-full sm:basis-1/2">
      <p class="text-lg sm:text-xl">
        <br />
        I'm Kyle, a Frontend Engineer based in London, specialising in Svelte and
        React.
        <br /><br />
        I graduated from Falmouth University in 2019 with a 2:1 in Games Development:
        Programming. During my final year of university, I moved into web development,
        using online courses and tutorials to learn HTML, CSS, JavaScript & PHP.
        <br /><br />
        Since graduating I have worked at three different agencies, where I have
        used a variety of frameworks and languages to create both websites and mobile
        apps. Alongside this, I have worked on freelance and personal projects such
        as an NFT iOS game and a Discord bot that has over 650 server installs.
        <br /><br />
        I'm currently working at London-based digital agency SOON_ as a Senior Software
        Engineer. Focusing on large-scale eCommerce projects using Svelte and React
        as our main frameworks for creating web-apps.
      </p>
    </div>
    <div class="basis-full sm:basis-1/2">
      <img
        class="w-full max-w-lg rounded-full mx-auto"
        src="/imgs/Kyle.jpg"
        alt="Lil piccy of me innit"
      />
    </div>
  </div>
</div>

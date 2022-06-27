<script lang="ts">
  import PageHeader from "../../components/PageHeader/PageHeader.svelte";
</script>

<style lang="scss">
  .about {
    flex-grow: 1;
    flex-basis: 100%;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &--content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 2rem;

      @include breakpoint(sm) {
        flex-wrap: nowrap;
      }
    }

    &--text {
      flex-basis: 100%;

      @include breakpoint(sm) {
        flex-basis: 50%;
      }
    }

    &--img {
      flex-basis: 100%;
      text-align: center;

      @include breakpoint(sm) {
        flex-basis: 50%;
      }

      > img {
        width: 100%;
        max-width: 500px;
        border-radius: 100%;
      }
    }
  }
</style>

<div class="about">
  <PageHeader header="About" />
  <div class="about--content">
    <div class="about--text">
      <p>
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
        I'm currently working at London-based digital agency SOON_ as a Frontend
        Engineer. Focusing on large-scale eCommerce projects using Svelte and React
        as our main frameworks for creating web-apps.
      </p>
    </div>
    <div class="about--img">
      <img src="/imgs/Kyle.jpg" alt="Lil piccy of me innit" />
    </div>
  </div>
</div>

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
        I'm Kyle, a Frontend Engineer based in London, UK specialising in Svelte
        and React.
        <br /><br />
        I studied Games Development at Falmouth University, specialising in Programming
        and graduating in 2019. During my final year of university, I moved into
        web development, using online courses and tutorials to learn the basics before
        starting an internship at a local agency. From here I learnt various JavaScript
        frameworks via my day-to-day work or personal projects.
        <br /><br />
        I'm currently working at London-based digital agency SOON_, working on large-scale
        eCommerce projects using Svelte and React as our main frontend frameworks
        whilst also creating dev tools using Go.
      </p>
    </div>
    <div class="about--img">
      <img src="/imgs/Kyle.jpg" alt="Lil piccy of me innit" />
    </div>
  </div>
</div>

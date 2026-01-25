<script lang="ts">
  import Button from "$lib/button.svelte";
  import Icon from "$lib/icon.svelte";
</script>

<header>
  <Button href="/">
    <Icon name="arrow_back" />
  </Button>
  <div class="h1-wrapper">
    <h1>Info</h1>
  </div>
  <div class="placeholder"></div>
</header>
<main>
  <h2>How to play?</h2>
  <p>
    <span>
      You must determine which squares in a grid are light and which are dark.
    </span>
    <span>
      Each numbered cell indicates how many light squares are in its 3x3
      neighbourhood.
    </span>
  </p>
  <h2>Credits:</h2>
  <p>
    <span>
      Made by:
      <a target="_blank" href="https://github.com/glem-fumeno/mosaic">
        glem-fumeno
      </a>
    </span>
    <span>
      Original idea by:
      <a target="_blank" href="https://en.wikipedia.org/wiki/Trevor_Truran">
        Trevor Truran
      </a>
    </span>
  </p>
</main>

<style>
  header {
    display: flex;
    background-color: var(--color-bac);
    padding: 4rem 0.5rem 0.25rem 0.5rem;
    box-sizing: border-box;
    margin-bottom: 2rem;
    align-items: center;

    .h1-wrapper {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    h1 {
      text-align: center;
      margin: 0;
      view-transition-name: header;
      margin-right: 56px;
    }
  }
  main {
    padding: 0.5rem;
    text-align: justify;
    display: grid;
    gap: 1rem;
    p {
      margin-top: 0;
      display: grid;
      margin-inline: 4px;
      gap: 8px;
    }
    h2 {
      margin: 0;
    }
    a {
      display: inline;
      color: var(--color-for);
    }
  }
</style>

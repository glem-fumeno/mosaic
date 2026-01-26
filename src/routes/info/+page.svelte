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
      You must determine which squares in a grid are
      <strong class="active">active</strong> and which are
      <strong class="inactive">inactive</strong>.
    </span>
    <span>
      Each numbered cell indicates how many
      <strong class="active">active</strong> squares are in its 3x3 neighbourhood.
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
    <span>
      Font:
      <a target="_blank" href="https://fonts.google.com/specimen/Lexend">
        Lexend
      </a>
    </span>
    <span>
      Icons:
      <a target="_blank" href="https://fonts.google.com/icons">
         Material Icons
      </a>
    </span>
    <span class="no-ai">
      No AI was used when making this app
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
    strong.active {
      color: var(--color-bas);
      background-color: var(--color-acc);
      padding: 0px 6px;
      border-radius: 100vw;
    }
    strong.inactive {
      color: var(--color-for);
      background-color: var(--color-sec);
      padding: 0px 6px;
      border-radius: 100vw;
    }
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
    .no-ai {
      margin-top: 1rem;
      text-align: center;
    }
  }
</style>

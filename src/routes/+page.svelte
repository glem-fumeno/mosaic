<script lang="ts">
  import Button from "$lib/button.svelte";
  import game from "$lib/game.svelte";
  import settings from "$lib/settings.svelte";
  import { onMount } from "svelte";

  let gameNotStarted = $state<boolean>(false);

  onMount(async () => {
    game.setGameState("running");
    gameNotStarted =
      window.localStorage.getItem(`tiles ${settings.boardSize}`) === null;
    settings.loadSettings();
  });
</script>

<main>
  <h1>Mosaic</h1>
  <div class="buttons">
    {#if settings.tutorialFinished}
      <Button size="1.5rem" href="/game" disabled={gameNotStarted}>
        Continue
      </Button>
      <Button size="1.5rem" href="/game?reset">New Game</Button>
    {:else}
      <Button size="1.5rem" href="/game?tutorial">Tutorial</Button>
    {/if}
    <Button size="1.5rem" href="/settings">Settings</Button>
    <Button size="1.5rem" href="/info">Info</Button>
  </div>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .buttons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      flex: 1;
    }
    h1 {
      margin-top: 30vh;
      font-size: 3rem;
      view-transition-name: header;
    }
  }
</style>

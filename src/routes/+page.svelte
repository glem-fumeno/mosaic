<script>
  import { preloadData } from "$app/navigation";
  import Button from "$lib/button.svelte";

  preloadData('/game');
  preloadData('/settings');
</script>

<main>
  <h1>Mosaic</h1>
  <div class="buttons">
    <Button size="1.5rem" href="/game">Continue</Button>
    <Button size="1.5rem" href="/game?reset">New Game</Button>
    <Button size="1.5rem" href="/settings">Settings</Button>
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

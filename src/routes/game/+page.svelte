<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "$lib/icon.svelte";
  import { page } from "$app/state";
  import { replaceState } from "$app/navigation";
  import Toolbar from "./toolbar.svelte";
  import Button from "$lib/button.svelte";
  import Board from "./board.svelte";
  import game from "$lib/game.svelte";

  let dialogText = $state("");
  let dialog = $state<HTMLDialogElement>()!;

  $effect(() => {
    if (game.gameState === "won") {
      openModal("You win!");
    }
  });

  function openModal(text: string) {
    dialogText = text;
    dialog.showModal();
  }
  function closeModal() {
    dialog.close();
  }
  onMount(async () => {
    if (page.url.searchParams.get("reset") === "") {
      game.resetGrid();
      replaceState("/game", {});
      return;
    }
    game.loadTiles();
  });
</script>

<div class="page">
  <dialog bind:this={dialog} closedby="any">
    <div class="dialog-wrapper">
      <h2>{dialogText}</h2>
      <Button size="1.25rem" href="/">
        <Icon name="arrow_back" size={24} />
        <span>Menu</span>
      </Button>
      <Button
        size="1.25rem"
        onclick={() => {
          closeModal();
          game.resetGrid();
        }}
      >
        <Icon name="autorenew" size={24} />
        <span>Restart</span>
      </Button>
    </div>
  </dialog>
  <header>
    <Button href="/">
      <Icon name="arrow_back" />
    </Button>
    <div class="h1-wrapper">
      <h1>Mosaic</h1>
    </div>
    <Button
      onclick={() => {
        game.resetGrid();
      }}
    >
      <Icon name="autorenew" />
    </Button>
  </header>
  <main>
    <Board />
  </main>
  <footer>
    <Toolbar />
  </footer>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    touch-action: none;
  }
  header {
    display: flex;
    align-items: center;
    background-color: var(--color-bac);
    padding: 4rem 0.5rem 0.25rem 0.5rem;
    box-sizing: border-box;
    margin-bottom: 2rem;

    .h1-wrapper {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    h1 {
      text-align: center;
      margin: 0;
      view-transition-name: header;
    }
  }
  footer {
    display: grid;
    place-items: center;
  }
  main {
    flex: 1;
    max-width: 100%;
    display: grid;
    align-items: center;
    aspect-ratio: 1;
    margin: auto;
  }

  dialog:open {
    opacity: 1;
  }

  dialog {
    opacity: 0;
    transition:
      opacity 200ms ease-out,
      overlay 200ms ease-out allow-discrete,
      display 200ms ease-out allow-discrete;
  }

  @starting-style {
    dialog:open {
      opacity: 0;
    }
  }

  dialog::backdrop {
    background-color: transparent;
    transition:
      display 200ms allow-discrete,
      overlay 200ms allow-discrete,
      background-color 200ms;
  }

  dialog:open::backdrop {
    background-color: oklch(from var(--color-bas) l c h / 0.3);
  }

  @starting-style {
    dialog:open::backdrop {
      background-color: transparent;
    }
  }

  dialog {
    border: none;
    background-color: var(--color-bas);
    color: var(--color-for);
    border-radius: 1rem;

    .dialog-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    h2 {
      font-size: 1.5rem;
      margin: 0;
      grid-column: 1 / 3;
    }
  }
</style>

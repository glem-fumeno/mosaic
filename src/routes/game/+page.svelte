<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "$lib/icon.svelte";
  import { page } from "$app/state";
  import { goto, replaceState } from "$app/navigation";
  import Toolbar from "./toolbar.svelte";
  import Button from "$lib/button.svelte";
  import Board from "./board.svelte";
  import game from "$lib/game.svelte";
  import { sleep } from "$lib/utils";
  import settings from "$lib/settings.svelte";

  let dialogText = $state("");
  let dialog = $state<HTMLDialogElement>()!;

  let tutorialStage = $state(0);
  let inTutorial = $state(false);

  $effect(() => {
    if (game.gameState === "won" && !inTutorial) {
      openModal("You win!");
    }
  });

  function openModal(text: string) {
    sleep(10).then(() => {
      dialogText = text;
      dialog.showModal();
    });
  }
  function closeModal() {
    dialog.close();
  }
  function finishTutorial() {
    settings.setTutorialFinished(true);
    goto("/");
  }
  function nextTutorialStage() {
    tutorialStage++;
    game.loadTutorialStage(tutorialStage);
  }
  onMount(async () => {
    settings.loadSettings();
    if (
      page.url.searchParams.get("tutorial") === "" ||
      !settings.tutorialFinished
    ) {
      game.loadTutorialStage(tutorialStage);
      replaceState("/game", {});
      inTutorial = true;
      return;
    }
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
    <Button onclick={() => history.back()}>
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
    {#if inTutorial}
      <div class="tutorial">
        <p>
          {#if tutorialStage === 0}
            The goal of the game is to fill all the squares with appropreate
            colors.
          {:else if tutorialStage === 1}
            The 4 in the corner indicates that all of its neighbours including
            itself are&nbsp<strong class="active">active</strong>. Fill them in!
          {:else if tutorialStage === 2}
            Now the 2 has all&nbsp<strong class="active">active</strong> tiles
            satisfied so the rest of the neighbouring tiles are&nbsp<strong
              class="inactive"
            >
              inactive
            </strong>.
          {:else if tutorialStage === 3}
            Fill in the rest of the squares and finish the puzzle.
          {/if}
        </p>
        <div class="buttons">
          <Button onclick={finishTutorial}>Skip the Tutorial</Button>
          {#if tutorialStage >= 3}
            <Button
              disabled={!game.isTutorialStageSolved(tutorialStage)}
              onclick={finishTutorial}
            >
              Finish
            </Button>
          {:else}
            <Button
              disabled={!game.isTutorialStageSolved(tutorialStage)}
              onclick={nextTutorialStage}
            >
              Continue
            </Button>
          {/if}
        </div>
      </div>
    {/if}
    <Board />
  </main>
  <footer>
    <Toolbar />
  </footer>
</div>

<style>
  .tutorial {
    display: grid;
    padding: 0.5rem;
    p {
      text-align: justify;
      font-size: 1.25rem;
      height: 3lh;
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
    }
    .buttons {
      display: flex;
      justify-content: space-between;
    }
  }
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

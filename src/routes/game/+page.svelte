<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "$lib/components/icon.svelte";
  import { page } from "$app/state";
  import { replaceState } from "$app/navigation";
  import Toolbar from "./toolbar.svelte";
  import Button from "$lib/components/button.svelte";
  import Board from "./board.svelte";
  import game from "$lib/state/game.svelte";
  import { sleep } from "$lib/utils";
  import settings from "$lib/state/settings.svelte";
  import t from "$lib/translations/language.svelte";
  import Titlebar from "$lib/components/titlebar.svelte";
  import Tutorial from "./tutorial.svelte";

  let dialog = $state<HTMLDialogElement>()!;

  let inTutorial = $state(false);

  $effect(() => {
    if (game.gameState === "won" && !inTutorial) {
      finishGame();
    }
  });

  function finishGame() {
    game.stopTimer();
    sleep(10).then(() => {
      dialog.showModal();
    });
  }
  function closeModal() {
    dialog.close();
  }
  onMount(() => {
    game.setTimer();
    settings.loadSettings();
    if (
      page.url.searchParams.get("tutorial") === "" ||
      !settings.tutorialFinished
    ) {
      replaceState("/game", {});
      inTutorial = true;
      return game.stopTimer;
    }
    if (page.url.searchParams.get("reset") === "") {
      game.resetGrid();
      replaceState("/game", {});
      return game.stopTimer;
    }
    game.loadTiles();
    return game.stopTimer;
  });
</script>

<div class="page">
  <dialog bind:this={dialog} closedby="any">
    <div class="dialog-wrapper">
      <div>
        <h2>{t("game.win")}</h2>
        <div><span>{t("game.mistakes")}</span><strong>{game.errors}</strong></div>
        <div><span>{t("game.time")}</span><strong>{game.timer}</strong></div>
      </div>
      <Button size="1.25rem" href="/">
        <Icon name="arrow_back" size={24} />
        <span>{t("game.menu")}</span>
      </Button>
      <Button
        size="1.25rem"
        onclick={() => {
          closeModal();
          game.resetGrid();
        }}
      >
        <Icon name="autorenew" size={24} />
        <span>{t("game.restart")}</span>
      </Button>
    </div>
  </dialog>
  <Titlebar title="Mosaic">
    {#snippet additionalAction()}
      <Button
        onclick={() => {
          game.resetGrid();
        }}
      >
        <Icon name="autorenew" />
      </Button>
    {/snippet}
  </Titlebar>
  <main>
    {#if inTutorial}
      <Tutorial />
    {:else if settings.timerShown}
      <div class="timer-wrapper">
        <span class="timer">
          <span>{game.timer.split(":")[0]}</span>
          <span>:</span>
          <span>{game.timer.split(":")[1]}</span>
        </span>
      </div>
    {/if}
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

    .timer-wrapper {
      display: flex;
      justify-content: center;
      .timer {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        font-size: 2rem;

        :first-child {
          justify-self: end;
        }
      }
    }
  }

  dialog {
    border: none;
    background-color: var(--color-bas);
    color: var(--color-for);
    border-radius: 1rem;
    opacity: 0;
    transition:
      opacity 200ms ease-out,
      overlay 200ms ease-out allow-discrete,
      display 200ms ease-out allow-discrete;

    &:open {
      opacity: 1;
    }
    &::backdrop {
      background-color: transparent;
      transition:
        display 200ms allow-discrete,
        overlay 200ms allow-discrete,
        background-color 200ms;
    }
    &:open::backdrop {
      background-color: oklch(from var(--color-bas) l c h / 0.3);
    }

    > .dialog-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      > div {
        grid-column: 1 / 3;
        > div {
          margin-block: 0.5rem;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    h2 {
      font-size: 1.5rem;
      margin: 0;
      margin-bottom: 1rem;
    }
  }

  @starting-style {
    dialog:open {
      opacity: 0;
    }
  }

  @starting-style {
    dialog:open::backdrop {
      background-color: transparent;
    }
  }
</style>

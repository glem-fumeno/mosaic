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

  let dialogText = $state("");
  let dialog = $state<HTMLDialogElement>()!;

  let inTutorial = $state(false);

  $effect(() => {
    if (game.gameState === "won" && !inTutorial) {
      openModal(t("game.win"));
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
  onMount(async () => {
    settings.loadSettings();
    if (
      page.url.searchParams.get("tutorial") === "" ||
      !settings.tutorialFinished
    ) {
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

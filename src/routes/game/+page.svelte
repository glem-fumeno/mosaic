<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "$lib/icon.svelte";
  import { page } from "$app/state";
  import { reset, type Tile, type TileState } from "./mosaic";
  import { replaceState } from "$app/navigation";
  import Toolbar from "./toolbar.svelte";
  import Button from "$lib/button.svelte";

  let width = $state(10);
  let dialogText = $state("");
  let debugClass = $state<"debug" | "">("");
  let currentTool = $state<TileState>("active");
  let tiles = $state<Tile[][]>([]);
  let dialog = $state<HTMLDialogElement>()!;

  function saveTiles() {
    window.localStorage.setItem("tiles", JSON.stringify(tiles));
  }
  function toggleDebug() {
    debugClass = debugClass === "" ? "debug" : "";
  }
  function resetGrid() {
    tiles = reset(width);
    saveTiles();
    dialogText = "";
  }

  function tileOnClick(x: number, y: number) {
    let tile = tiles[y][x];
    if (tile.state === currentTool) return;
    tile.state = currentTool;
    saveTiles();
  }
  function checkWin() {
    if (tiles.flat().every((tile) => tile.innerState === tile.state)) {
      if (dialogText !== "You win!") {
        openModal("You win!");
      }
    }
  }

  function getTileStatus(tile: Tile): "error" | "solved" | "none" {
    const active = tile.neighbours.filter(
      ({ x, y }) => tiles[y][x].state === "active",
    );
    const inactive = tile.neighbours.filter(
      ({ x, y }) => tiles[y][x].state === "inactive",
    );
    const disabled = tile.neighbours.filter(
      ({ x, y }) => tiles[y][x].state === "disabled",
    );

    if (tile.num === undefined) return "none";
    if (active.length > tile.num) return "error";
    if (inactive.length > tile.neighbours.length - tile.num) return "error";
    if (disabled.length === 0) return "solved";

    return "none";
  }

  function touchMove(e: TouchEvent) {
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches.item(i)!;
      let elem = document.elementsFromPoint(touch.clientX, touch.clientY);
      elem
        .filter((el) => el.classList.contains("tile"))
        .forEach((el) => {
          (el as HTMLButtonElement).click();
        });
    }
  }

  function openModal(text: string) {
    dialogText = text;
    dialog.showModal();
  }
  function closeModal() {
    dialog.close();
  }
  onMount(() => {
    const tileLoad = window.localStorage.getItem("tiles");
    if (tileLoad === null || page.url.searchParams.get("reset") === "") {
      resetGrid();
      replaceState("/game", {});
      return;
    }
    tiles = JSON.parse(tileLoad);
  });
</script>

<div class="page">
  <dialog bind:this={dialog} closedby="any">
    <div class="dialog-wrapper">
      <h2 ondblclick={toggleDebug}>
        {dialogText}
      </h2>
      <Button size="1.25rem" onclick={closeModal}>
        <Icon name="close" size={24} />
        <span>Close</span>
      </Button>
      <Button
        size="1.25rem"
        onclick={() => {
          closeModal();
          resetGrid();
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
        openModal("Options");
      }}
    >
      <Icon name="settings" />
    </Button>
  </header>
  <main>
    <div
      class="grid"
      style:grid-template-columns={`repeat(${width}, 1fr)`}
      ontouchmove={touchMove}
      ontouchstart={touchMove}
      ontouchend={checkWin}
    >
      {#each tiles.flat() as tile}
        <button
          class={`tile ${tile.state} status-${getTileStatus(tile)} ${debugClass ? "debug" : ""} inner-${tile.innerState}`}
          onclick={() => tileOnClick(tile.position.x, tile.position.y)}
        >
          <span>
            {tile.num}
          </span>
        </button>
      {/each}
    </div>
  </main>
  <footer>
    <Toolbar bind:currentTool />
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
    background-color: var(--color-background);
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
  .grid {
    background-color: var(--color-background);
    display: grid;
    gap: 3px;
    padding: 1rem;
  }
  .tile {
    --tile-color: var(--color-surface);
    --tile-hover: 0.02;
    --tile-text-color: var(--color-foreground);
    border: none;
    border-radius: 2px;
    aspect-ratio: 1;
    background-color: var(--tile-color) !important;
    color: var(--tile-text-color);
    cursor: pointer;
    font: inherit;
    container-type: inline-size;
    padding: 0;

    &.debug {
      border: 1px solid var(--inner-color);
    }

    &.inner-active {
      --inner-color: var(--color-accent);
    }
    &.inner-inactive {
      --inner-color: var(--color-foreground);
    }

    &.active {
      --tile-color: var(--color-accent);
    }
    &.inactive {
      --tile-color: var(--color-foreground);
      --tile-text-color: var(--color-surface);
      --tile-hover: -0.02;
    }

    &.status-solved {
      color: oklch(
        from var(--tile-text-color) calc(l - 8 * var(--tile-hover)) c h
      );
    }
    &.status-error {
      --tile-text-color: var(--color-error);
    }

    &:hover {
      background-color: oklch(
        from var(--tile-color) calc(l + var(--tile-hover)) c h
      );
    }
  }
  .tile > span {
    font-size: 2.5rem;

    @media (max-width: 700px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
    }
    @media (max-width: 300px) {
      font-size: 1rem;
    }
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
    background-color: oklch(from var(--color-base) l c h / 0.3);
  }

  @starting-style {
    dialog:open::backdrop {
      background-color: transparent;
    }
  }

  dialog {
    border: none;
    background-color: var(--color-base);
    color: var(--color-foreground);
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

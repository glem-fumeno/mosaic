<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "../lib/icon.svelte";
  import { isSolvable, reset, type Tile, type TileState } from "./mosaic";

  let width = $state(10);
  let dialogText = $state("");
  let debugClass = $state<"debug" | "">("");
  let currentState = $state<TileState>("active");
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
  function changeState(state: TileState) {
    currentState = state;
  }

  function tileOnClick(x: number, y: number) {
    let tile = tiles[y][x];
    if (tile.state === currentState) return;
    tile.state = currentState;
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
    if (tileLoad === null) {
      resetGrid();
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
      <button onclick={closeModal}>
        <Icon name="close" size={24} />
        <span>Close</span>
      </button>
      <button
        onclick={() => {
          closeModal();
          resetGrid();
        }}
      >
        <Icon name="autorenew" size={24} />
        <span>Restart</span>
      </button>
    </div>
  </dialog>
  <header>
    <button onclick={() => isSolvable($state.snapshot(tiles))}>
      <Icon name="arrow_back" />
    </button>
    <h1>Mosaic</h1>
    <button
      onclick={() => {
        openModal("Options");
      }}
    >
      <Icon name="settings" />
    </button>
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
    <div class="buttons">
      <button
        ontouchstart={() => changeState("active")}
        onclick={() => changeState("active")}
        class={currentState === "active" ? "active" : ""}
      >
        <Icon name="square" color="var(--color-accent)" />
      </button>
      <button
        ontouchstart={() => changeState("inactive")}
        onclick={() => changeState("inactive")}
        class={currentState === "inactive" ? "active" : ""}
      >
        <Icon name="square" color="var(--color-foreground)" />
      </button>
      <button
        ontouchstart={() => changeState("disabled")}
        onclick={() => changeState("disabled")}
        class={currentState === "disabled" ? "active" : ""}
      >
        <Icon name="close" />
      </button>
    </div>
  </footer>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    touch-action: none;
  }
  dialog {
    border: none;
    background-color: var(--color-base);
    color: var(--color-foreground);
    border-radius: 1rem;

    &::backdrop {
      background-color: oklch(from var(--color-base) l c h / 0.3);
      transition:
        display 0.7s allow-discrete,
        overlay 0.7s allow-discrete,
        background-color 0.7s;
    }

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

    button {
      border: none;
      background-color: var(--color-background);
      color: var(--color-foreground);
      padding: 1rem;
      height: 100%;
      border-radius: 100vw;
      font: inherit;
      font-size: 1rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover,
      &:active {
        background-color: var(--color-surface);
      }
    }
  }
  header {
    display: flex;
    background-color: var(--color-background);
    padding: 4rem 0.5rem 0.25rem 0.5rem;
    box-sizing: border-box;
    margin-bottom: 2rem;

    button {
      border: none;
      background-color: var(--color-background);
      color: var(--color-foreground);
      padding: 0.5rem;
      aspect-ratio: 1;
      height: 100%;
      border-radius: 100vw;

      &:hover,
      &:active {
        background-color: var(--color-surface);
      }
    }

    h1 {
      flex: 1;
      text-align: center;
      margin: 0;
    }
  }
  footer {
    display: grid;
    place-items: center;

    .buttons {
      background-color: var(--color-background);
      border-radius: 100vw;
      padding: 0.5rem 0.5rem;
      margin-block: 2rem;
    }

    button {
      --button-color: var(--color-background);
      border: none;
      background-color: var(--button-color);
      color: var(--color-foreground);
      padding: 0.5rem;
      aspect-ratio: 1;
      height: 100%;
      border-radius: 100vw;
      cursor: pointer;

      &:hover,
      &:active {
        background-color: var(--button-color);
      }
      &.active {
        --button-color: var(--color-surface);
      }
    }
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
</style>

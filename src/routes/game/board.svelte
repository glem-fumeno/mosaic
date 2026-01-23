<script lang="ts">
  import game, { getNeighbouringTiles } from "$lib/game.svelte";
  import type { Tile } from "$lib/types";

  let width = $derived<number>(game.board.length);

  function touchMove(e: TouchEvent) {
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches.item(i)!;
      let elem = document.elementsFromPoint(touch.clientX, touch.clientY);
      elem
        .filter((el) => el.classList.contains("tile"))
        .forEach((el) => {
          game.updateTile(
            +(el as HTMLElement).dataset.x!,
            +(el as HTMLElement).dataset.y!,
          );
        });
    }
  }

  function getTileStatus(tile: Tile): "error" | "solved" | "none" {
    const { active, inactive, disabled } = getNeighbouringTiles(
      game.board,
      tile,
    );

    if (tile.num === undefined) return "none";
    if (active.length > tile.num) return "error";
    if (inactive.length > tile.neighbours.length - tile.num) return "error";
    if (disabled.length === 0) return "solved";

    return "none";
  }
</script>

<div
  class="grid"
  style:grid-template-columns={`repeat(${width}, 1fr)`}
  ontouchmove={touchMove}
  ontouchstart={touchMove}
  ontouchend={game.updateGameState}
>
  {#each game.board.flat() as tile}
    <button
      class={`
        tile ${tile.state}
        old-${tile.oldState}
        status-${getTileStatus(tile)}
        ${game.debugMode ? "debug" : ""}
        inner-${tile.innerState}
      `}
      data-x={tile.position.x}
      data-y={tile.position.y}
      onmouseup={() => {
        game.updateTile(tile.position.x, tile.position.y);
        game.updateGameState();
      }}
    >
      <span>
        {tile.num}
      </span>
    </button>
  {/each}
</div>

<style>
  .grid {
    background-color: var(--color-background);
    display: grid;
    gap: 3px;
    padding: 1rem;
  }

  @property --fill-level {
    syntax: "<percentage>";
    inherits: true;
    initial-value: 0%;
  }

  @keyframes size-off {
    100% {
      --fill-level: 0%;
    }
    0% {
      --fill-level: 100%;
    }
  }
  @keyframes size-active {
    0% {
      --fill-level: 0%;
    }
    100% {
      --fill-level: 100%;
    }
  }
  @keyframes size-inactive {
    0% {
      --fill-level: 0%;
    }
    100% {
      --fill-level: 100%;
    }
  }

  .tile {
    --tile-color: var(--color-surface);
    --tile-old-color: var(--color-surface);
    --tile-hover: 0.02;
    --tile-text-color: var(--color-foreground);
    border: none;
    border-radius: 2px;
    aspect-ratio: 1;
    color: var(--tile-text-color);
    cursor: pointer;
    font: inherit;
    container-type: inline-size;
    padding: 0;
    animation: 100ms size-off forwards;
    background-image: radial-gradient(
      var(--tile-old-color) var(--fill-level) var(--fill-level),
      var(--tile-color) var(--fill-level) var(--fill-level)
    );

    &.debug {
      border: 1px solid var(--inner-color);
    }

    &.inner-active {
      --inner-color: var(--color-accent);
    }
    &.inner-inactive {
      --inner-color: var(--color-foreground);
    }
    &.old-active {
      --tile-old-color: var(--color-accent);
    }
    &.old-inactive {
      --tile-old-color: var(--color-foreground);
    }

    &.active {
      --tile-color: var(--color-accent);
      background-image: radial-gradient(
        var(--tile-color) var(--fill-level) var(--fill-level),
        var(--tile-old-color) var(--fill-level) var(--fill-level)
      );
      animation: 100ms size-active forwards;
    }
    &.inactive {
      --tile-color: var(--color-foreground);
      --tile-text-color: var(--color-surface);
      --tile-hover: -0.02;
      background-image: radial-gradient(
        var(--tile-color) var(--fill-level) var(--fill-level),
        var(--tile-old-color) var(--fill-level) var(--fill-level)
      );
      animation: 100ms size-inactive forwards;
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

<script lang="ts">
  import Icon from "$lib/icon.svelte";
  import type { TileState } from "./mosaic";

  let { currentTool = $bindable() } = $props<{ currentTool: TileState }>();
  function changeTool(tool: TileState) {
    currentTool = tool;
  }
</script>

<div class="buttons">
  <div class="highlight"></div>
  <button
    ontouchstart={() => changeTool("active")}
    onclick={() => changeTool("active")}
    class={currentTool === "active" ? "active" : ""}
  >
    <Icon name="square" color="var(--color-accent)" />
  </button>
  <button
    ontouchstart={() => changeTool("inactive")}
    onclick={() => changeTool("inactive")}
    class={currentTool === "inactive" ? "active" : ""}
  >
    <Icon name="square" color="var(--color-foreground)" />
  </button>
  <button
    ontouchstart={() => changeTool("disabled")}
    onclick={() => changeTool("disabled")}
    class={currentTool === "disabled" ? "active" : ""}
  >
    <Icon name="close" />
  </button>
</div>

<style>
  .buttons {
    background-color: var(--color-background);
    border-radius: 100vw;
    padding: 0.5rem 0.5rem;
    margin-block: 2rem;
    position: relative;
  }

  button {
    border: none;
    color: var(--color-foreground);
    padding: 0.5rem;
    aspect-ratio: 1;
    height: 100%;
    border-radius: 100vw;
    cursor: pointer;
    position: relative;
    z-index: 2;
    background-color: transparent;

    &.active {
      anchor-name: --highlight-anchor;
    }
  }

  .highlight {
    background-color: var(--color-surface);
    width: calc(32px + 1rem);
    height: calc(32px + 1rem);
    border-radius: 100vw;
    position: absolute;
    position-anchor: --highlight-anchor;
    bottom: anchor(bottom);
    left: anchor(left);
    transition: 200ms cubic-bezier(0.16, 1, 0.3, 1) left;
    z-index: 1;
  }
</style>

<script lang="ts">
  import Icon from "$lib/icon.svelte";
  import type { TileState } from "./mosaic";

  let { currentTool = $bindable() } = $props<{ currentTool: TileState }>();
  function changeTool(tool: TileState) {
    currentTool = tool;
  }
</script>

<div class="buttons">
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
</style>

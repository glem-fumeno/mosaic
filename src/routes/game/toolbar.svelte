<script lang="ts">
  import game from "$lib/game.svelte";
  import Icon from "$lib/icon.svelte";
</script>

<div class="buttons">
  <div class="highlight"></div>
  <button
    ontouchstart={() => game.setTool("active")}
    onclick={() => game.setTool("active")}
    class={game.currentTool === "active" ? "active" : ""}
  >
    <Icon name="square" color="var(--color-accent)" />
  </button>
  <button
    ontouchstart={() => game.setTool("inactive")}
    onclick={() => game.setTool("inactive")}
    class={game.currentTool === "inactive" ? "active" : ""}
  >
    <Icon name="square" color="var(--color-foreground)" />
  </button>
  <button
    ontouchstart={() => game.setTool("disabled")}
    onclick={() => game.setTool("disabled")}
    class={game.currentTool === "disabled" ? "active" : ""}
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

  @supports not (position-anchor: --highlight-anchor) {
    .highlight {
      visibility: hidden;
    }
    button.active {
      background-color: var(--color-surface);
    }
  }
</style>

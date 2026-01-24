<script lang="ts">
  import Button from "$lib/button.svelte";
  import Icon from "$lib/icon.svelte";
  import settings from "$lib/settings.svelte";
  import type { Color, Theme } from "$lib/types";
</script>

<header>
  <Button href="/">
    <Icon name="arrow_back" />
  </Button>
  <div class="h1-wrapper">
    <h1>Settings</h1>
  </div>
  <div class="placeholder"></div>
</header>
<main>
  <span>Theme:</span>
  <div class="buttons">
    {#each ["light", "dark"] as Theme[] as theme}
      <Button
        active={settings.theme === theme}
        onclick={() => settings.setTheme(theme)}
        size=".75rem"
      >
        <Icon name="square" color="var(--color-{theme})" />
      </Button>
    {/each}
  </div>
  <span>Color:</span>
  <div class="buttons">
    {#each ["red", "orange", "yellow", "green", "blue", "purple", "pink"] as Color[] as color}
      <Button
        active={settings.color === color}
        onclick={() => settings.setColor(color)}
        size=".75rem"
      >
        <Icon name="square" color="var(--color-{color})" />
      </Button>
    {/each}
  </div>
  <span>Grid Size:</span>
  <div class="buttons">
    {#each [6, 8, 10, 12] as size}
      <Button
        active={settings.boardSize === size}
        onclick={() => settings.setBoardSize(size)}
      >
        {size}x{size}
      </Button>
    {/each}
  </div>
</main>

<style>
  header {
    display: flex;
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
      margin-right: 56px;
    }
  }
  main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    .buttons {
      display: flex;
      gap: 0.2rem;
      margin-bottom: 0.5rem;
    }
  }
</style>

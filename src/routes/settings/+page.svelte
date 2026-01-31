<script lang="ts">
  import Button from "$lib/button.svelte";
  import Icon from "$lib/icon.svelte";
  import settings from "$lib/settings.svelte";
  import t from "$lib/translations/language.svelte";
  import type { Color, Language, Theme } from "$lib/types";
</script>

<header>
  <Button onclick={() => history.back()}>
    <Icon name="arrow_back" />
  </Button>
  <div class="h1-wrapper">
    <h1>{t("settings.title")}</h1>
  </div>
  <div class="placeholder"></div>
</header>
<main>
  <span>{t("settings.theme")}</span>
  <div class="buttons">
    {#each ["light", "dark"] as Theme[] as theme}
      <button
        class:active={settings.theme === theme}
        onclick={() => settings.setTheme(theme)}
        style:background-color="var(--color-{theme})"
        aria-label={theme}
      >
      </button>
    {/each}
  </div>
  <span>{t("settings.language")}</span>
  <div class="buttons">
    {#each ["English", "Polski"] as Language[] as language}
      <button
        class:active={settings.language === language}
        onclick={() => settings.setLanguage(language)}
        aria-label={language}
      >
        {language}
      </button>
    {/each}
  </div>
  <span>{t("settings.color")}</span>
  <div class="buttons">
    {#each ["red", "orange", "yellow", "green", "blue", "purple", "pink"] as Color[] as color}
      <button
        class:active={settings.color === color}
        onclick={() => settings.setColor(color)}
        style:background-color="var(--color-{color})"
        aria-label={color}
      >
      </button>
    {/each}
  </div>
  <span>{t("settings.gridSize")}</span>
  <div class="buttons">
    {#each [6, 8, 10, 12] as size}
      <button
        class:active={settings.boardSize === size}
        onclick={() => settings.setBoardSize(size)}
      >
        {size}x{size}
      </button>
    {/each}
  </div>
</main>

<style>
  header {
    display: flex;
    background-color: var(--color-bac);
    padding: 4rem 0.5rem 0.25rem 0.5rem;
    box-sizing: border-box;
    margin-bottom: 1.5rem;
    align-items: center;

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
      gap: 4px;
      margin-bottom: 0.5rem;
      max-width: 100vw;
      button {
        min-width: 2.5rem;
        min-height: 2.5rem;
        border: none;
        background-color: var(--color-bac);
        border: 2px solid var(--color-bac);
        font: inherit;
        display: grid;
        place-items: center;
        color: inherit;
        border-radius: 100vw;
        padding: 0.5rem;
        &.active {
          outline: 2px solid var(--color-for);
        }
      }
    }
  }
</style>

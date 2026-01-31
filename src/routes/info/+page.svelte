<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/button.svelte";
  import Icon from "$lib/icon.svelte";
  import settings from "$lib/settings.svelte";
  import t from "$lib/translations/language.svelte";
</script>

<header>
  <Button onclick={() => history.back()}>
    <Icon name="arrow_back" />
  </Button>
  <div class="h1-wrapper">
    <h1>{t("info.title")}</h1>
  </div>
  <div class="placeholder"></div>
</header>
<main>
  <h2>{t("info.howToPlay.title")}</h2>
  <p>
    <span>
      {@html t("info.howToPlay.p1")}
    </span>
    <span>
      {@html t("info.howToPlay.p2")}
    </span>
    <Button
      onclick={() => {
        settings.setTutorialFinished(false);
        goto("/game");
      }}
    >
      {t("info.howToPlay.tutorial")}
    </Button>
  </p>
  <h2>{t("info.credits.title")}</h2>
  <p>
    <span>
      {t("info.credits.madeBy")}
      <a target="_blank" href="https://github.com/glem-fumeno/mosaic">
        glem-fumeno
      </a>
    </span>
    <span>
      {t("info.credits.originalIdeaBy")}
      <a target="_blank" href="https://en.wikipedia.org/wiki/Trevor_Truran">
        Trevor Truran
      </a>
    </span>
    <span>
      {t("info.credits.font")}
      <a target="_blank" href="https://fonts.google.com/specimen/Lexend">
        Lexend
      </a>
    </span>
    <span>
      {t("info.credits.icons")}
      <a target="_blank" href="https://fonts.google.com/icons">
        Material Icons
      </a>
    </span>
    <span class="no-ai">{t("info.credits.noAi")}</span>
  </p>
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
    padding: 0.5rem;
    text-align: justify;
    display: grid;
    gap: 1rem;
    p {
      margin-top: 0;
      display: grid;
      margin-inline: 4px;
      gap: 8px;
    }
    h2 {
      margin: 0;
    }
    a {
      display: inline;
      color: var(--color-for);
    }
    .no-ai {
      margin-top: 1rem;
      text-align: center;
    }
  }
</style>

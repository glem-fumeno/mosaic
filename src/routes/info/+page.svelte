<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/button.svelte";
  import settings from "$lib/state/settings.svelte";
  import Titlebar from "$lib/components/titlebar.svelte";
  import t from "$lib/translations/language.svelte";
</script>

<Titlebar title={t("info.title")} />
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

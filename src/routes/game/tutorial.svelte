<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/button.svelte";
  import game from "$lib/state/game.svelte";
  import settings from "$lib/state/settings.svelte";
  import t from "$lib/translations/language.svelte";
  import { onMount } from "svelte";

  let tutorialStage = $state(0);
  function finishTutorial() {
    settings.setTutorialFinished(true);
    goto("/", { replaceState: true });
  }
  function nextTutorialStage() {
    tutorialStage++;
    game.loadTutorialStage(tutorialStage);
  }
  onMount(() => {
    game.loadTutorialStage(tutorialStage);
  });
</script>

<div class="tutorial">
  <p>
    {#if tutorialStage === 0}
      {t("game.tutorial.stage1")}
    {:else if tutorialStage === 1}
      {@html t("game.tutorial.stage2")}
    {:else if tutorialStage === 2}
      {@html t("game.tutorial.stage3")}
    {:else if tutorialStage === 3}
      {t("game.tutorial.stage4")}
    {/if}
  </p>
  <div class="buttons">
    <Button onclick={finishTutorial}>{t("game.tutorial.skip")}</Button>
    {#if tutorialStage >= 3}
      <Button
        disabled={!game.isTutorialStageSolved(tutorialStage)}
        onclick={finishTutorial}
      >
        {t("game.tutorial.finish")}
      </Button>
    {:else}
      <Button
        disabled={!game.isTutorialStageSolved(tutorialStage)}
        onclick={nextTutorialStage}
      >
        {t("game.tutorial.continue")}
      </Button>
    {/if}
  </div>
</div>

<style>
  .tutorial {
    display: grid;
    padding: 0.5rem;
    p {
      margin: 0;
      margin-bottom: 0.5rem;
      text-align: justify;
      font-size: 1rem;
      height: 4lh;
    }
    .buttons {
      display: flex;
      justify-content: space-between;
    }
  }
</style>

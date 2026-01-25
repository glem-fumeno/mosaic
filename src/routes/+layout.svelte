<script lang="ts">
  import "./app.css";
  let { children } = $props();
  import { afterNavigate, goto, onNavigate } from "$app/navigation";
  import settings from "$lib/settings.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { sleep } from "$lib/utils";

  let loading = $state<boolean>(true);
  onMount(async () => {
    settings.loadSettings();
    await preload();
  });
  afterNavigate(preload);

  async function preload() {
    loading = true;
    if (settings.preloadedPages.length >= 4) {
      loading = false;
      return;
    }
    await sleep(100);
    const pageId = page.route.id;
    if (pageId === null) {
      return;
    }
    if (!settings.preloadedPages.includes(pageId)) {
      settings.addPreloadedPage(pageId);
      await goto(settings.nextPage(pageId));
      return;
    }
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

{#if loading}
  <div class="loader">
    <h1>Loading...</h1>
  </div>
{/if}
<div
  style:visibility={loading ? "hidden" : "visible"}
  class="root"
  data-theme={settings.theme}
  data-color={settings.color}
>
  {@render children()}
</div>

<style>
  .root {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .loader {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    background-color: var(--color-bas);
    z-index: 999;
  }
</style>

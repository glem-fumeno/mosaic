<script>
  import "./app.css";
  let { children } = $props();
  import { onNavigate } from "$app/navigation";
  import settings from "$lib/settings.svelte";

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

<div class="root" data-theme={settings.theme} data-color={settings.color}>
  {@render children()}
</div>

<style>
  .root {
    width: 100vw;
    height: 100vh;
  }
</style>

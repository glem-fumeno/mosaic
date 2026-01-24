<script lang="ts">
  import Button from "$lib/button.svelte";
  import Icon from "$lib/icon.svelte";
  import settings from "$lib/settings.svelte";
</script>

<header>
  <Button href="/">
    <Icon name="arrow_back" />
  </Button>
  <div class="h1-wrapper">
    <h1>Mosaic</h1>
  </div>
  <div class="placeholder"></div>
</header>
<main>
  <span>Theme:</span>
  <div class="buttons">
    <Button onclick={() => settings.setTheme("dark")} size=".75rem">
      <Icon name="square" color="var(--color-dark)" />
    </Button>
    <Button onclick={() => settings.setTheme("light")} size=".75rem">
      <Icon name="square" color="var(--color-light)" />
    </Button>
  </div>
  <span>Color:</span>
  <div class="buttons">
    <Button onclick={() => settings.setColor("red")} size=".75rem">
      <Icon name="square" color="var(--color-red)" />
    </Button>
    <Button onclick={() => settings.setColor("orange")} size=".75rem">
      <Icon name="square" color="var(--color-orange)" />
    </Button>
    <Button onclick={() => settings.setColor("yellow")} size=".75rem">
      <Icon name="square" color="var(--color-yellow)" />
    </Button>
    <Button onclick={() => settings.setColor("green")} size=".75rem">
      <Icon name="square" color="var(--color-green)" />
    </Button>
    <Button onclick={() => settings.setColor("blue")} size=".75rem">
      <Icon name="square" color="var(--color-blue)" />
    </Button>
    <Button onclick={() => settings.setColor("purple")} size=".75rem">
      <Icon name="square" color="var(--color-purple)" />
    </Button>
    <Button onclick={() => settings.setColor("pink")} size=".75rem">
      <Icon name="square" color="var(--color-pink)" />
    </Button>
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

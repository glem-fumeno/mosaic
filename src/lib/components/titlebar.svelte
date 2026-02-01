<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "./button.svelte";
  import Icon from "./icon.svelte";

  const { title, additionalAction } = $props<{
    title: string;
    additionalAction?: Snippet;
  }>();
</script>

<header>
  <Button onclick={() => history.back()}>
    <Icon name="arrow_back" />
  </Button>
  <div class="h1-wrapper">
    <h1>{title}</h1>
  </div>
  {#if additionalAction !== undefined}
    {@render additionalAction()}
  {/if}
</header>

<style>
  header {
    display: grid;
    grid-template-columns: 60px 1fr 60px;
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
    }
  }
</style>

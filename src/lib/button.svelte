<script lang="ts">
  let {
    children,
    onclick = undefined,
    href = undefined,
    size = "1rem",
  } = $props();
</script>

{#if href !== undefined}
  <a {href} style:font-size={size}>
    {@render children()}
  </a>
{:else}
  <button {onclick} style:font-size={size}>
    {@render children()}
  </button>
{/if}

<style>
  button,
  a {
    border: none;
    text-decoration: none;
    background-color: var(--color-bac);
    color: var(--color-for);
    padding: 0.75em;
    border-radius: 100vw;
    font: inherit;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover,
    &:active {
      background-color: var(--color-sur);
    }
  }
</style>

<script lang="ts">
  let {
    children,
    onclick = undefined,
    href = undefined,
    size = "1rem",
    active = false,
    disabled = false,
  } = $props();
</script>

{#if href !== undefined}
  <a
    href={disabled ? undefined : href}
    class="{active ? 'active' : ''} {disabled ? 'disabled' : ''}"
    style:font-size={size}
  >
    {@render children()}
  </a>
{:else}
  <button
    {onclick}
    {disabled}
    class="{active ? 'active' : ''} {disabled ? 'disabled' : ''}"
    style:font-size={size}
  >
    {@render children()}
  </button>
{/if}

<style>
  button,
  a {
    border: none;
    text-decoration: none;
    border: 2px solid var(--color-bac);
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

    &.active {
      background-color: var(--color-sur);
      border: 2px solid var(--color-for);
    }
    &:hover,
    &:active {
      background-color: var(--color-sur);
    }
    &.disabled {
      border: 2px solid var(--color-bac);
      color: var(--color-sur);
      cursor: not-allowed;
      background-color: var(--color-bas);
    }
  }
</style>

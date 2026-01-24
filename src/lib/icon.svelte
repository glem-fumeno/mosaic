<script lang="ts">
  export let name: string;
  export let size: number = 32;
  export let color: string = "inherit";
</script>

<span
  class="material-symbols-rounded"
  style:font-size={size + "px"}
  style:color
>
  {name}
</span>

<style>
  .material-symbols-rounded {
    display: grid;
    place-items: center;
    width: fit-content;

    font-family: "Material Symbols Rounded";
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    font-variation-settings: "FILL" 1;
  }
</style>

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
}
</style>

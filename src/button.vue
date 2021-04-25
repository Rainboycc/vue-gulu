<template>
  <button class="g-button">hi</button>
</template>

<script>
export default {
  name: 'g-button'
}

</script>

<style lang="scss">
  .g-button {
    font-size: var(--font-size);
    height: var(--button-height);
    &:hover {
      color: red;
    }
  }
</style>
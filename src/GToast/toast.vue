<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GuluToast'
}
</script>

<style lang="scss" scoped>
  $font-size: 14px;
  $toast-height: 40px;
  $toast-bg: rgba($color: #000000, $alpha: 0.75);
  .toast {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: $font-size;
    line-height: 1.8;
    height: $toast-height;
    display: flex;
    align-items: center;
    color: #fff;
    background: $toast-bg;
    border-radius: 4px;
    box-shadow: 0px 0px 3px 0px rgba($color: #000000, $alpha: 0.5);
    padding: 0 16px;
  }
</style>
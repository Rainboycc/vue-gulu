<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'GuluTabsHead'
}
</script>

<style lang="scss" scoped>
  .tabs-head{
    display: flex;
    > .actions{
      margin-left: auto;
    }
  }
</style>
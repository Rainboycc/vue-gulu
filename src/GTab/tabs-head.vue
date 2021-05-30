<template>
  <div class="tabs-head">
    <slot></slot>
    <div ref="line" class="line"></div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuluTabsHead',
  inject: ['eventBus'],
  created () {
    this.eventBus.$on('updated:selected', (value, vm) => {
      const { width, left } = vm.$el.getBoundingClientRect()
      this.$refs.line.style.width = `${width}px`
      this.$refs.line.style.transform = `translate3d(${left}px, 0, 0)`
    })
  },
}
</script>

<style lang="scss" scoped>
  .tabs-head{
    display: flex;
    border-bottom: 1px solid #ddd;
    position: relative;
    > .actions{
      margin-left: auto;
      display: flex;
      align-items: center;
      padding-right: 1em;
    }
    .line {
      position: absolute;
      bottom: 0;
      border-bottom: 2px solid blue;
      transition: all .3s;
    }
  }
</style>
<template>
  <div class="tab-pane" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GuluTabsPane',
  inject: ['eventBus'],
  props: {
    name: {
      type: String | Number,
      require: true
    }
  },
  data () {
    return {
      active: false
    }
  },
  created () {
    this.eventBus.$on('updated:selected', (value) => {
      this.active = this.name === value
    })
  },
}
</script>

<style lang="scss" scoped>
  .tab-pane{
    padding: 1em;
  }
</style>
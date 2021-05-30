<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'GuluTabs',
  props: {
    selected: {
      type: String,
      require: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0
      }
    }
  },
  data () {
    return {
      eventBus: new Vue()
    }
  },
  provide () {
    return  {
      eventBus: this.eventBus
    }
  },
  mounted () {
    this.eventBus.$emit('updated:selected', this.selected)
  }
}
</script>

<style lang="scss" scoped>
  .tab{
    
  }
</style>
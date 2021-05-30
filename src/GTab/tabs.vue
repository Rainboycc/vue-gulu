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
    this.$children.forEach(child => {
      if (child.$options.name === 'GuluTabsHead') {
        child.$children.forEach(vm => {
          if (vm.name === this.selected) {
            this.eventBus.$emit('updated:selected', this.selected, vm)
          }
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .tab{
    
  }
</style>
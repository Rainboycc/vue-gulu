<template>
  <div class="tab-item" @click="handleClickItem" :class="{ active }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GuluTabsItem',
  inject: ['eventBus'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
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
  methods: {
    handleClickItem () {
      this.eventBus.$emit('updated:selected', this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-item{
    cursor: pointer;
    padding: 0 1em;
    flex-shrink: 0;
    &.active {
      background: red;
    }
  }
</style>
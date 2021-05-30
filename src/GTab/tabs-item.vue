<template>
  <div class="tab-item" @click="handleClickItem" :class="{ active, disabled}">
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
    },
    disabled: {
      type: Boolean,
      default: false
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
      if (this.disabled) return false
      this.eventBus.$emit('updated:selected', this.name, this)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-item{
    cursor: pointer;
    padding: 1em 2em;
    flex-shrink: 0;
    &.active {
      color: blue;
      // background: red;
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
</style>
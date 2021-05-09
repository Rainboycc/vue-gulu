<template>
  <button class="g-button" :class="{ [`icon-${iconPosition==='right'?'right':'left'}`]: true }" 
    @click="$emit('click')">
    <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>
    <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import Icon from './icon.vue'
export default {
  components: {
    'g-icon': Icon
  },
  name: 'g-button',
  props: {
    icon: {},
    loading: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value) => { // 属性检查器
        return value === 'left' || value === 'right'
      }
    }
  },
  methods: {
  }
}

</script>

<style lang="scss" scoped>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .g-button {
    font-size: var(--font-size);
    line-height: var(--font-size);
    height: var(--button-height);
    padding: 0 1em;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--button-bg);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    &:hover {
      border-color: var(--border-color-hover);
    }
    &:active {
      background-color: var(--button-active-bg);
    }
    &:focus {
      outline: none;
    }
    &.icon-left {
       > .icon {
        order: 1;
        margin-right: .1em;
      }
      > .content {
        order: 2;
      }
    }
    &.icon-right {
      > .content {
        order: 1;
      }
      > .icon {
        order: 2;
        margin-left: .1em;
      }
    }
    > .loading {
      animation: spin linear 2s infinite;
    }
  }
</style>
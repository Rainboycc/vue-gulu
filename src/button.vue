<template>
  <button class="g-button" :class="{ [`icon-${iconPosition==='right'?'right':'left'}`]: true }">
    <svg v-if="icon" class="icon">
      <use :xlink:href="`#i-${icon}`"></use>
    </svg>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'g-button',
  // props: ['icon', 'iconPosition']
  props: {
    icon: {},
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value) => { // 属性检查器
        return value === 'left' || value === 'right'
      }
    }
  }
}

</script>

<style lang="scss">
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
  }
</style>
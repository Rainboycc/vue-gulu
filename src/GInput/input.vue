<template>
  <div class="wrapper" :class="{ error }">
    <input type="text" :value="value" :disabled="disabled" :readonly="readonly"
    @change="$emit('change', $event)"
    @input="$emit('input', $event.target.value)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)">
    <template v-if="error">
      <g-icon name="error" class="icon-error"></g-icon>
      <span class="error-message">{{error}}</span>
    </template>
  </div>
</template>

<script>
import Icon from '../GIcon/icon.vue'
export default {
  components: {
    [Icon.name]: Icon
  },
  name: 'g-input',
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
//        --button-height: 32px;
//       --font-size: 14px;
//       --button-bg: white;
//       --button-active-bg: #eee;
//       --border-radius: 4px;
//       --color: #333;
//       --border-color: #999;
//       --border-color-hover: #666;
  $height: 32px;
  $border-color: #999;
  $border-color-hover: #666;
  $border-radius: 4px;
  $font-size: 12px;
  $box-shadow-color: rgb(0, 0, 0, 0.5);
  $red: #F1453D;
  .wrapper {
    font-size: $font-size;
    display: inline-flex;
    align-items: center;
    > *:not(:last-child) {
      margin-right: .5em;
    }
    >input {
      height: $height;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      padding: 0 8px;
      &:hover {
        border-color: $border-color-hover;
      }
      &:focus {
        outline: none;
        box-shadow: inset 0 1px 3px $box-shadow-color;
      }
      &[disabled], &[readonly] {
        border-color: #ccc;
        color: #ccc;
        cursor: not-allowed;
      }
    }
     &.error {
      > input {
        border-color: $red;
      }
    }
    .icon-error {
      fill: $red;
    }
    .error-message {
      color: $red;
    }
  }

</style>7
<template>
  <div class="toast" ref="toast">
    <div class="message">
      <div v-if="enableHTML" v-html="$slots.default[0]"></div>
      <slot v-else></slot>
    </div>
    <!-- <slot></slot> -->
    <div class="line" ref="line"></div>
    <span class="close" v-if="closeButton" @click="onClickClose">
      {{closeButton.text}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GuluToast',
  props: {
    autoClose: {
      type: Boolean,
      default: false
    },
    autoCloseDelay: {
      type: Number,
      default: 3
    },
    closeButton: {
      type: Object,
      default: () => ({
        text: '关闭',
        callback: (toast) => {}
      })
    },
    enableHTML: {
      type: Boolean,
      default: false
    }
  }, 
  mounted () {
    this.updateStyles()
    this.executeAutoClose()
  },
  methods: {
    updateStyles () {
      this.$nextTick(() => {
        this.$refs.line.style.height = 
        `${this.$refs.toast.getBoundingClientRect().height}px`
      })
    },
    executeAutoClose () {
      if (this.autoClose) {
        setTimeout(() => {
          this.close()
        }, this.autoCloseDelay * 1000)
      }
    },
    close () {
      this.$el.remove()
      this.$destroy()
    },
    onClickClose () {
      this.close()
      if (this.closeButton && typeof this.closeButton.callback === 'function') {
        this.closeButton.callback(this)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $font-size: 14px;
  $toast-min-height: 40px;
  $toast-bg: rgba($color: #000000, $alpha: 0.75);
  .toast {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: $font-size;
    line-height: 1.8;
    min-height: $toast-min-height;
    display: flex;
    align-items: center;
    color: #fff;
    background: $toast-bg;
    border-radius: 4px;
    box-shadow: 0px 0px 3px 0px rgba($color: #000000, $alpha: 0.5);
    padding: 0px 16px;
    .message {
      padding: 4px 0;
    }
    .close {
      padding-left: 16px;
      flex-shrink: 0;
    }
    .line {
      margin-left: 16px;
      border: 1px solid  #666;
    }
  }
</style>
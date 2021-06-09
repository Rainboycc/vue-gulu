<template>
  <div class="popover" @click="onClick">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <div ref="trigger">
      <slot></slot> 
    </div>
  </div>
</template>

<script>
export default {
  name: "GuluPopover",
  data () {
    return {
      visible: false
    }
  },
  methods: {
    open () {
      this.visible = true
      setTimeout(() => {
        this.setContentPosition()
        document.addEventListener('click', this.onClickDocument)
      })
    },
    close () {
      this.visible = false
      document.removeEventListener('click', this.onClickDocument)
    },
    setContentPosition () {
      const { top, left } = this.$refs.trigger.getBoundingClientRect()
      document.body.appendChild(this.$refs.contentWrapper)
      this.$refs.contentWrapper.style.top = (window.scrollY + top) + 'px'
      this.$refs.contentWrapper.style.left = (window.scrollX + left) + 'px'
    },
    onClickDocument (e) {
      if (this.$refs.contentWrapper.contains(e.target)) return 
      this.close()
    },
    onClick (e) {
      // 确定点击的是什么
      if (this.$refs.trigger.contains(e.target)) {
        this.visible ? this.close() : this.open()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .popover{
    display: inline-block;
    vertical-align: top; 
    position: relative;
  }
  .content-wrapper {
    position: absolute;
    border: 1px solid red;
    transform: translateY(-100%);
  }  
</style>
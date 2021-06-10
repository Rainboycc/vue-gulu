<template>
  <div class="popover" @click="onClick">
    <transition name="fade">
      <div ref="contentWrapper" class="content-wrapper" style="opacity: 0;display:none" :class="[`position-${realPosition}`, `icon-${iconPosition}`]" v-if="visible">
        <slot name="content"></slot>
      </div>
    </transition>
    <div ref="trigger">
      <slot></slot> 
    </div>
  </div>
</template>

<script>
export default {
  name: "GuluPopover",
  props: {
    position: {
      type: String,
      default: () => 'auto',
      validator: (value) => ['top', 'left', 'right', 'bottom', 'auto'].indexOf(value) > -1
    }
  },
  data () {
    return {
      visible: false,
      realPosition: 'top',
      iconPosition: 'left'
    }
  },
  created () {
    this.realPosition = this.position
  },
  methods: {
    open () {
      this.visible = true
      // 为什么不用$nextTick呢？
      // 因为$nextTick优先使用微任务队列，而事件是宏任务，所以当open执行完毕，立刻执行微队列中的绑定事件操作
      // 然后触发宏队列中的点击事件，导致直接触发document上的click事件，直接关闭popover
      setTimeout(() => {
        this.setContentPosition()
        document.addEventListener('click', this.onClickDocument)
      })
    },
    close () {
      this.visible = false
      this.$refs.contentWrapper.style.opacity = 0
      document.removeEventListener('click', this.onClickDocument)
    },
    setContentPosition () {
      const { contentWrapper, trigger } = this.$refs
      document.body.appendChild(this.$refs.contentWrapper)
      this.$refs.contentWrapper.style.display = 'block'
      const { top, left, height, width } = trigger.getBoundingClientRect()
      const { height: contentWrapperHeight, width: contentWrapperWidth } = contentWrapper.getBoundingClientRect()
      let position = this.position
      // 根据当前位置自动选择popover弹出位置
      if (this.position === 'auto') {
        const no = []
        if (top - contentWrapperHeight < 0) { no.push('top') }
        if (left - contentWrapperWidth < 0) { no.push('left') }
        if (document.body.clientWidth - left - width - contentWrapperWidth < 0) { no.push('right') }
        if (top - ((contentWrapperHeight - height) / 2) < 0) { no.push('left'); no.push('right')}
        if ((document.body.clientHeight - top - height) - ((contentWrapperHeight - height) / 2) < 0) { no.push('left'); no.push('right')}
        if (document.body.clientHeight - top - height - contentWrapperHeight < 0) { no.push('bottom') }
        const tmp = ['top', 'right',  'bottom', 'left'].filter(item => no.indexOf(item) === -1)
        console.log(no);
        position = tmp.length > 0 ? tmp[0] : 'bottom'
      }
      // 记录当前位置
      this.realPosition = position
      // 设置popover的位置
      if (position === 'top') {
        if (document.body.clientWidth - left - width - left > 0) {
          // 如果触发器靠左，则弹出窗朝向右
          contentWrapper.style.top = (window.scrollY + top) + 'px'
          contentWrapper.style.left = (window.scrollX + left) + 'px'
        } else {
          // 如果触发器靠右，则弹出窗朝向左
          this.iconPosition = 'right'
          contentWrapper.style.top = (window.scrollY + top) + 'px'
          contentWrapper.style.left = (window.scrollX + left - contentWrapperWidth + width) + 'px'
        }
      } else if (position === 'bottom') {
        if (document.body.clientWidth - left - width - left > 0) {
          // 如果触发器靠左，则弹出窗朝向右
          contentWrapper.style.top = (window.scrollY + top + height) + 'px'
          contentWrapper.style.left = (window.scrollX + left) + 'px'
        } else {
          // 如果触发器靠右，则弹出窗朝向左
          this.iconPosition = 'right'
          contentWrapper.style.top = (window.scrollY + top + height) + 'px'
          contentWrapper.style.left = (window.scrollX + left - contentWrapperWidth + width) + 'px'
        }
      } else if (position === 'left') {
        // 居中
        contentWrapper.style.top = (window.scrollY + top + (height - contentWrapperHeight) / 2) + 'px'
        contentWrapper.style.left = (window.scrollX + left - contentWrapperWidth) + 'px'
      } else if (position === 'right') {
        // 居中
        contentWrapper.style.top = (window.scrollY + top + (height - contentWrapperHeight) / 2) + 'px'
        contentWrapper.style.left = (window.scrollX + left + width) + 'px'
      }
      contentWrapper.style.opacity = 1
    },
    onClickDocument (e) {
      if (this.$refs.contentWrapper.contains(e.target) || this.$refs.contentWrapper === e.target) return 
      this.close()
    },
    onClick (e) { 
      // 确定点击的是什么
      if (this.$refs.trigger.contains(e.target) || this.$refs.trigger === e.target) {
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
    top: 0;
    border-radius: 4px;
    position: absolute;
    padding: .5em 1em;
    border: 1px solid #333;
    max-width: 20em;
    word-break: break-all;
    background: white;
    filter: drop-shadow(0 1px 1px rgba($color: #000000, $alpha: 0.5)); // 解决小图标填充阴影
    // box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.5);
    transition: opacity .3s;
    &::before, &::after  {
      content: '';
      display: block;
      height: 0;
      width: 0;
      border: 10px solid transparent;
      border-top-color: #333;
      position: absolute;
    }
    &::after {
      border-top-color: white;
    }
  }
  .position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before, &::after {
      border: 10px solid transparent;
      border-top-color: #333;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }
  .position-bottom {
    transform: translateY(0);
    margin-top: 10px;
    &::before, &::after {
      border: 10px solid transparent;
      border-bottom-color: #333;
      bottom: 100%;
    }
    &::after {
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  } 
  .position-top,.position-bottom {
    &.icon-right {
       &::before, &::after {
        right: 1em;
      }
    }
  }
  
  .position-left {
    margin-left: -10px;
    &::before, &::after {
      border: 10px solid transparent;
      border-left-color: #333;
      top: 50%;
      transform: translateY(-50%);
      left: 100%;
    }
    &::after {
      border-left-color: white;
      left: calc(100% - 1px);
    }
  } 
  .position-right {
    margin-left: 10px;
    &::before, &::after {
      border: 10px solid transparent;
      border-right-color: #333;
      top: 50%;
      transform: translateY(-50%);
      right: 100%;
    }
    &::after {
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }
</style>
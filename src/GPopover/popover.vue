<template>
  <div ref="popover" class="popover">
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
    },
    trigger: {
      type: String,
      default: () => 'click',
      validator: (value) => ['click', 'hover'].indexOf(value) > -1
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
  mounted () {
    const popover = this.$refs.popover
    if (this.trigger === 'click') {
      popover.addEventListener('click', this.onClick)
    } else {
      popover.addEventListener('mouseenter', this.open)
      popover.addEventListener('mouseleave', this.close)
    }
  },
  destroyed () {
    const popover = this.$refs.popover
    if (this.trigger === 'click') {
      popover.removeEventListener('click', this.onClick)
    } else {
      popover.removeEventListener('mouseenter', this.open)
      popover.removeEventListener('mouseleave', this.close)
    }
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
    getPosition ({ top, left, height, width }, { contentWrapperHeight, contentWrapperWidth }) {
      let position = this.position
      const no = []
      // 判断是否被上边界遮挡
      if (top - contentWrapperHeight < 0) { no.push('top') }
      // 判断是否被左边界遮挡
      if (left - contentWrapperWidth < 0) { no.push('left') }
      // 判断左右是否出现被下边界遮挡
      if ((document.body.clientHeight - top - height) - ((contentWrapperHeight - height) / 2) < 0) { no.push('left'); no.push('right')}
      // 判断是否被下边界遮挡
      if (document.body.clientHeight - top - height - contentWrapperHeight < 0) { no.push('bottom') }
      // 判断是否被右边界遮挡
      if (document.body.clientWidth - left - width - contentWrapperWidth < 0) { no.push('right') }
      // 判断左右是否出现被上边界遮挡
      if (top - ((contentWrapperHeight - height) / 2) < 0) { no.push('left'); no.push('right')}
      const tmp = ['top', 'right',  'bottom', 'left'].filter(item => no.indexOf(item) === -1)
      // console.log(no);
      position = tmp.length > 0 ? tmp[0] : 'bottom'
      return position
    },
    setContentPosition () {
      const { contentWrapper, trigger } = this.$refs
      document.body.appendChild(contentWrapper)
      contentWrapper.style.display = 'block'  // 解决出现滚动条问题
      const { top, left, height, width } = trigger.getBoundingClientRect()
      const { height: contentWrapperHeight, width: contentWrapperWidth } = contentWrapper.getBoundingClientRect()
      this.realPosition = this.position === 'auto' ? this.getPosition({ top, left, height, width }, { contentWrapperHeight, contentWrapperWidth }) : this.position
      // 位置表(表驱动编程)
      const positions = {
        top: {
          left: {
            top: (window.scrollY + top) + 'px',
            left: (window.scrollX + left) + 'px'
          },
          right: {
            top: (window.scrollY + top) + 'px',
            left: (window.scrollX + left - contentWrapperWidth + width) + 'px'
          }
        },
        bottom: {
          left: {
            top: (window.scrollY + top + height) + 'px',
            left: (window.scrollX + left) + 'px'
          },
          right: {
            top: (window.scrollY + top + height) + 'px',
            left: (window.scrollX + left - contentWrapperWidth + width) + 'px'
          }
        },
        left: {
          left: {
            top: (window.scrollY + top + (height - contentWrapperHeight) / 2) + 'px',
            left: (window.scrollX + left - contentWrapperWidth) + 'px'
          },
          right: {
            top: (window.scrollY + top + (height - contentWrapperHeight) / 2) + 'px',
            left: (window.scrollX + left - contentWrapperWidth) + 'px'
          }
        },
        right: {
          left: {
            top: (window.scrollY + top + (height - contentWrapperHeight) / 2) + 'px',
            left: (window.scrollX + left + width) + 'px'
          },
          right: {
            top: (window.scrollY + top + (height - contentWrapperHeight) / 2) + 'px',
            left: (window.scrollX + left + width) + 'px'
          }
        }
      }
      this.iconPosition = document.body.clientWidth - left - width - left > 0 ? 'left' : 'right'
      // 设置popover的位置
      contentWrapper.style.top = positions[this.realPosition][this.iconPosition].top
      contentWrapper.style.left = positions[this.realPosition][this.iconPosition].left
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
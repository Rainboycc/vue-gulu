<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
  const validator = (obj) => obj && Object.keys(obj).reduce((pre,key) => pre && ['span', 'offset'].includes(key), true)
  export default {
    name: 'GuluCol',
    props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String]
      },
      ipad: {
        type: Object,
        validator
      },
      narrowPc: {
        type: Object,
        validator
      },
      pc: {
        type: Object,
        validator
      },
      widePc: {
        type: Object,
        validator
      },
      superPc: {
        type: Object,
        validator
      },
    },
    data() {
      return {
        gutter: 0
      }
    },
    computed: {
      colClass () {
        const { span, offset } = this
        const createClasses = this.createClasses
        return [
          ...createClasses({ span, offset }),
          ...createClasses(this.ipad, 'ipad-'),
          ...createClasses(this.narrowPc, 'narrow-pc-'),
          ...createClasses(this.pc, 'pc-'),
          ...createClasses(this.widePc, 'wide-pc-'),
          ...createClasses(this.superPc, 'super-pc-'),
        ]
      },
      colStyle () {
        return {
          paddingLeft: this.gutter/2+'px',
          paddingRight: this.gutter/2+'px'
        }
      }
    },
    methods: {
      createClasses(obj, prefix = '') {
        if (!obj) return [] 
        const classArray = []
        const keys =  ['span', 'offset']
        keys.forEach(key => {
          if (obj[key]) {
            const str = key === 'span' ? 'col' : key
            classArray.push(`${str}-${prefix}${obj[key]}`)
          }
        })
        return classArray
      }
    }
  }
</script>

<style lang="scss" scoped>
  .col {
    // width: 50%;
    @for $i from 1 through 24 {
      &.col-#{$i} {
        width: ($i / 24) * 100%;
      }
    }
    @for $i from 1 through 24 {
      &.offset-#{$i} {
        margin-left: ($i / 24) * 100%;
      }
    }
    @media screen and (min-width: 576px) {
      @for $i from 1 through 24 {
        &.col-ipad-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      @for $i from 1 through 24 {
        &.offset-ipad-#{$i} {
            margin-left: ($i / 24) * 100%;
        }
      }
    }
    @media screen and (min-width: 768px) {
      @for $i from 1 through 24 {
        &.col-narrow-pc-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      @for $i from 1 through 24 {
        &.offset-narrow-pc-#{$i} {
            margin-left: ($i / 24) * 100%;
        }
      }
    }
    @media screen and (min-width: 992px) {
      @for $i from 1 through 24 {
        &.col-pc-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      @for $i from 1 through 24 {
        &.offset-pc-#{$i} {
            margin-left: ($i / 24) * 100%;
        }
      }
    }
    @media screen and (min-width: 1200px) {
      @for $i from 1 through 24 {
        &.col-wide-pc#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      @for $i from 1 through 24 {
        &.offset-wide-pc#{$i} {
            margin-left: ($i / 24) * 100%;
        }
      }
    }
    @media screen and (min-width: 1600px) {
      @for $i from 1 through 24 {
        &.col-super-pc-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      @for $i from 1 through 24 {
        &.offset-super-pc-#{$i} {
            margin-left: ($i / 24) * 100%;
        }
      }
    }
  }
</style>
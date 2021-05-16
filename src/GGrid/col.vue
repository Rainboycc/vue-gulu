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
  @mixin colCss($prefix) {
    @for $i from 1 through 24 {
      &.col-#{$prefix}#{$i} {
        width: ($i / 24) * 100%;
      }
    }
    @for $i from 1 through 24 {
      &.offset-#{$prefix}#{$i} {
        margin-left: ($i / 24) * 100%;
      }
    }
  }
  @mixin ipad {
    @media screen and (min-width: 577px) {
      @content
    };
  };
  @mixin narrow-pc {
    @media screen and (min-width: 769px) {
      @content
    };
  };
  @mixin pc {
    @media screen and (min-width: 993px) {
      @content
    };
  };
  @mixin wide-pc {
    @media screen and (min-width: 1201px) {
      @content
    };
  };
  @mixin super-pc {
    @media screen and (min-width: 1601px) {
      @content
    };
  };
  .col {
    @include colCss('');
    @include ipad {
      @include colCss('ipad-');
    };
    @include narrow-pc {
      @include colCss('narrow-pc-');
    };
    @include pc {
      @include colCss('pc-');
    };
    @include wide-pc {
      @include colCss('wide-pc-');
    };
    @include super-pc() {
      @include colCss('super-pc-');
    };
  }
</style>
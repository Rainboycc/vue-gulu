<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GuluCol',
    props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String]
      }
    },
    data() {
      return {
        gutter: 0
      }
    },
    computed: {
      colClass () {
        const { span, offset } = this
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`
        ]
      },
      colStyle () {
        return {
          paddingLeft: this.gutter/2+'px',
          paddingRight: this.gutter/2+'px'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .col {
    width: 50%;
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
  }
</style>
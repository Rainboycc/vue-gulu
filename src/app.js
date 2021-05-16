import Vue from 'vue'
import Button from './Button/button.vue'
import ButtonGroup from './Button/button-group.vue'
import Input from './Input/input.vue'
import Row from './Grid/row.vue'
import Col from './Grid/col.vue'

Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
new Vue ({
  el: '#app',
  data: {
    message: ''
  },
  methods: {
    inputChange(e) {
      console.log(e.target.value)
    }
  }
})
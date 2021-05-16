import Vue from 'vue'
import Button from './GButton/button.vue'
import ButtonGroup from './GButton/button-group.vue'
import Input from './GInput/input.vue'
import Row from './GGrid/row.vue'
import Col from './GGrid/col.vue'
import Layout from './GLayout/layout.vue'
import Header from './GLayout/header.vue'
import Content from './GLayout/content.vue'
import Sider from './GLayout/sider.vue'
import Footer from './GLayout/footer.vue'

Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-header', Header)
Vue.component('g-content', Content)
Vue.component('g-sider', Sider)
Vue.component('g-footer', Footer)
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
import Vue from 'vue'
import Button from './button.vue'
import ButtonGroup from './button-group.vue'
import Icon from './icon.vue'

Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Icon.name, Icon)
new Vue ({
  el: '#app',
  data: {}
})
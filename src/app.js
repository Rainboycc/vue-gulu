import Vue from 'vue'
import Icon from './GIcon/icon.vue'
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
import Toast from './GToast/plugin'
import Tabs from './GTab/tabs.vue'
import TabsHead from './GTab/tabs-head.vue'
import TabsBody from './GTab/tabs-body.vue'
import TabsItem from './GTab/tabs-item.vue'
import TabsPane from './GTab/tabs-pane.vue'
Vue.use(Toast)
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
Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-pane', TabsPane)
Vue.component('g-icon', Icon)
new Vue ({
  el: '#app',
  data () {
    return {
      selectedTab: 'sports'
    }
  },
  mounted () {
    
  }
})
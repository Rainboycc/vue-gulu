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

import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies)

const expect = chai.expect
// 单元测试
// 测试icon:'setting'
{
  // 创建一个dom节点用来挂载实例
  const div =  document.createElement('div')
  document.body.appendChild(div)
  // Button是一个配置对象，用Vue.extend生成Button组件的构造器
  const ButtonConstructor = Vue.extend(Button)
  // 用构造器创建组件实例
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'setting'
    }
  })
  // 挂载组件实例到DOM节点上
  vm.$mount(div)
  // 也可以不挂载到DOM上，直接挂载在内存中
  // 如果需要获取css进行测试，则必须挂载DOM，否则css不渲染
  // button.$mount()
  let useElement = vm.$el.querySelector('use')
  let href = useElement.getAttribute('xlink:href')
  expect(href).to.eq('#i-setting')
  // 使用后清理掉，否则占用内存
  // 如果断言失败，抛出异常，不会执行清理操作
  vm.$el.remove()
  vm.$destroy()
}
// 测试loading:true
{
  const ButtonConstructor = Vue.extend(Button)
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'setting',
      loading: true
    }
  })
  vm.$mount()
  let useElement = vm.$el.querySelector('use')
  let href = useElement.getAttribute('xlink:href')
  expect(href).to.eq('#i-loading')
  vm.$el.remove()
  vm.$destroy()
}
// 测试iconPosition:left
{
  const div =  document.createElement('div')
  document.body.appendChild(div)
  const ButtonConstructor = Vue.extend(Button)
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'setting',
    }
  })
  vm.$mount(div)
  let svg = vm.$el.querySelector('svg')
  let { order } = window.getComputedStyle(svg)
  expect(order).to.eq('1')
  vm.$el.remove()
  vm.$destroy()
}
// 测试iconPosition:right
{
  const div =  document.createElement('div')
  document.body.appendChild(div)
  const ButtonConstructor = Vue.extend(Button)
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'setting',
      iconPosition: 'right'
    }
  })
  vm.$mount(div)
  let svg = vm.$el.querySelector('svg')
  let { order } = window.getComputedStyle(svg)
  expect(order).to.eq('2')
  vm.$el.remove()
  vm.$destroy()
}
// 测试click事件
{
  // mock
  const ButtonConstructor = Vue.extend(Button)
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'setting',
      loading: true
    }
  })
  vm.$mount()
  let spy = chai.spy(function(){})
  vm.$on('click', spy)
  const button = vm.$el
  button.click()
  expect(spy).to.have.been.called()
  vm.$el.remove()
  vm.$destroy()
}
import Vue from 'vue'
import Button from '../src/button.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Button', () => {
  // BDD 行为驱动开发
  it('存在.', () => {
    expect(Button).to.be.exist // 不是 undefined 0 null false
  })
  it('可以设置icon.', () =>{
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({ propsData: { icon: 'setting' } }).$mount()
    let useElement = vm.$el.querySelector('use')
    expect(useElement.getAttribute('xlink:href')).to.equal('#i-setting')
    vm.$destroy()
  })
  it('可以设置loading.', () =>{
    const ButtonConstructor = Vue.extend(Button)
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'setting',
        loading: true
      }
    }).$mount()
    let useElement = vm.$el.querySelector('use')
    expect(useElement.getAttribute('xlink:href')).to.eq('#i-loading')
    vm.$el.remove()
    vm.$destroy()
  })
  it('icon 默认的 order 是 1.', () =>{
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
  })
  it('设置 position 为 right 可以改变 order 为 2.', () =>{
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
  })
  it('点击 button 触发 click 事件.', () =>{
    const ButtonConstructor = Vue.extend(Button)
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'setting',
      }
    }).$mount()
    const callback = sinon.fake()
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.been.called
    vm.$el.remove()
    vm.$destroy()
  })
})
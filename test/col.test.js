import Vue from 'vue'
import Col from '../src/Grid/col.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {

  it('存在.', () => {
    expect(Col).to.be.exist
  })

  const ColConstructor = Vue.extend(Col)

  it('接收 span 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const col = new ColConstructor({
      propsData: {
        span: '1'
      }
    }).$mount(div)
    expect(col.$el.classList.contains('col-1')).to.equal(true)
    col.$el.remove()
    col.$destroy()
  })

  it('接收 offset 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const col = new ColConstructor({
      propsData: {
        offset: '1'
      }
    }).$mount(div)
    expect(col.$el.classList.contains('offset-1')).to.equal(true)
    col.$el.remove()
    col.$destroy()
  })

  it('接收 ipad/pc/narrowPc/widePc/superPc', () => {
    ['ipad', 'narrowPc', 'pc', 'widePc', 'superPc'].forEach(key => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const col = new ColConstructor({
        propsData: {
          [key]: { span: '1', offset: '2' }
        }
      }).$mount(div)
      const innerkey = key.replace(/([A-Z])/g,"-$1").toLowerCase()
      expect(col.$el.classList.contains(`col-${innerkey}-1`)).to.equal(true)
      expect(col.$el.classList.contains(`offset-${innerkey}-2`)).to.equal(true)
      col.$el.remove()
      col.$destroy()
    })
  })
})
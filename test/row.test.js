import Vue from 'vue'
import Row from '../src/row.vue'
import Col from '../src/col.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {

  it('存在.', () => {
    expect(Row).to.be.exist
  })

  const RowConstructor = Vue.extend(Row)

  it('接收 gutter 属性', (done) => {
    Vue.component('g-row', Row)
    Vue.component('g-col', Col)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
      <g-row gutter="20">
        <g-col></g-col>
        <g-col></g-col>
      </g-row>
    `
    const  vm =  new Vue({ el: div })
    setTimeout(() => {
      const row = vm.$el.querySelector('.row')
      const cols = vm.$el.querySelectorAll('.col')
      expect(getComputedStyle(row).marginLeft).to.equal('-10px')
      expect(getComputedStyle(row).marginRight).to.equal('-10px')
      expect(getComputedStyle(cols[0]).paddingRight).to.equal('10px')
      expect(getComputedStyle(cols[1]).paddingLeft).to.equal('10px')
      vm.$el.remove()
      vm.$destroy()
      done()
    })
  })

  it('接收 align 属性', () => {
    const testData = {
      left: 'flex-start',
      right: 'flex-end',
      center: 'center',
    }
    Object.keys(testData).forEach(key => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const row = new RowConstructor({
        propsData: {
          align: key
        }
      }).$mount(div)
      const element = row.$el
      expect(getComputedStyle(element).justifyContent).to.equal(testData[key])
      row.$el.remove()
      row.$destroy()
    })
  })
})
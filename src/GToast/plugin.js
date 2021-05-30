import Toast from './toast.vue'

export default {

  install (Vue, options) {
    
    Vue.prototype.$toast = function (message, toastOptions) {
      const ToastConstructor  = Vue.extend(Toast)
      const toast = new ToastConstructor({
        propsData: toastOptions
      })
      toast.$slots.default = [message]
      toast.$mount() 
      document.body.appendChild(toast.$el)
    }
  }
}
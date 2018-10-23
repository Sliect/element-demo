import Vue from 'vue'
import Element from '../src/index.js'
import '../src/assets/theme-chalk/src/index.scss'
import App from './play/index.vue'

Vue.use(Element)

new Vue({
  render: h => h(App)
}).$mount('#app')

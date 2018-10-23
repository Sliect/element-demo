import Aside from './src/main.vue'

Aside.install = function(Vue) {
  Vue.component(Aside.name, Aside)
}

export default Aside
import Container from './src/main.vue'

Container.install = function(Vue) {
  Vue.component(Container.name, Container)
}

export default Container
import Header from './src/main.vue'

Header.install = function(Vue) {
  Vue.component(Header.name, Header)
}

export default Header
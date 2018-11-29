import ButtonGroup from './src/main.vue'

ButtonGroup.install = function(Vue) {
  Vue.component(ButtonGroup.name, ButtonGroup)
}

export default ButtonGroup
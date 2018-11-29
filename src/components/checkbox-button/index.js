import CheckboxButton from './src/main.vue'

CheckboxButton.install = function (Vue) {
  Vue.component(CheckboxButton.name, CheckboxButton)
}

export default CheckboxButton
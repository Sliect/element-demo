<template>
  <div
    class="el-radio-group"
    role="radiogroup"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ElRadioGroup',

  props: {
    value: {},
    disabled: Boolean,
    size: String
  },

  computed: {
    radioGroupSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value)
    })
  },

  mounted() {
    // 当radio-group没有默认选择项时，第一个可以选中Tab导航
    const radios = this.$el.querySelectorAll('[type=radio]')
    const firstLabel = this.$el.querySelectorAll('[role=radio]')[0]
    if (![].some.call(radios, radio => radio.checked) && firstLabel) {
      firstLabel.tabIndex = 0
    }
  },
}
</script>

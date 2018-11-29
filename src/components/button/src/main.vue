<template>
  <button
    class="el-button"
    @click="handleClick"
    :class="[
      buttonType,
      buttonSize,
      { 'is-plain': plain },
      { 'is-round': round },
      { 'is-circle': circle },
      { 'is-disabled': disabled },
      { 'is-loading': loading },
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
const BUTTON_SIZES = [
  'medium',
  'small',
  'mini'
]

export default {
  name: 'ElButton',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    icon: String,
    disabled: Boolean,
    loading: Boolean,
    size: String
  },

  computed: {
    buttonType() {
      return 'el-button--' + this.type
    },
    buttonSize() {
      if (BUTTON_SIZES.indexOf(this.size) > -1) {
        return 'el-button--' + this.size
      } else {
        return false
      }
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<template>
  <button
    class="el-button"
    :class="[
      buttonType,
      { 'is-plain': plain },
      { 'is-round': round },
      { 'is-circle': circle }
    ]"
  >
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
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
    icon: String
  },

  computed: {
    buttonType() {
      return 'el-button--' + this.type
    },
  }
}
</script>

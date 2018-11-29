<template>
  <label
    class="el-radio-button"
    :class="[
      size ? 'el-radio-button--' + size : '',
      { 'is-active': model === label },
      { 'is-disabled': isDisabled },
      { 'is-focus': focus }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <input
      class="el-radio-button__original"
      type="radio"
      :value="label"
      v-model="model"
      :name="name"
      :disabled="isDisabled"
      @change="handleChange"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
    >
    <span
      class="el-radio-button__inner"
    >
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
  import Emitter from '@/mixins/emitter'

  export default {
    name: 'ElRadioButton',

    mixins: [Emitter],

    props: {
      label: {},
      disabled: Boolean,
      name: String
    },

    data() {
      return {
        focus: false
      }
    },

    computed: {
      model: {
        get() {
          return this._radioGroup.value
        },
        set(val) {
          this._radioGroup.$emit('input', val)
        }
      },
      _radioGroup() {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'ElRadioGroup') {
            parent = parent.$parent
          } else {
            return parent
          }
        }
        return false
      },
      isDisabled() {
        return this.disabled || this._radioGroup.disabled
      },
      tabIndex() {
        return !this.isDisabled
          ? (
            this._radioGroup
              ? (this.model === this.label ? 0 : -1)
              : 0
          ) : -1
      },
      size() {
        return this._radioGroup.radioGroupSize || (this.$ELEMENT || {}).size
      }
    },

    methods: {
      handleChange() {
        this.$nextTick(() => {
          this.dispatch('ElRadioGroup', 'handleChange', this.model)
        })
      }
    }
  }
</script>
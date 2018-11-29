<template>
  <label
    class="el-checkbox-button"
    :class="[
      size ? 'el-checkbox-button--' + size : '',
      { 'is-disabled': isDisabled },
      { 'is-checked': isChecked }
    ]"
  >
    <input
      type="checkbox"
      :value="label"
      v-model="model"
      class="el-checkbox-button__original"
      :disabled="isDisabled"
      @change="handleChange"
    >
    <span class="el-checkbox-button__inner">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
  import Emitter from '@/mixins/emitter'

  export default {
    name: 'ElCheckboxButton',

    mixins: [Emitter],

    props: {
      label: {},
      disabled: Boolean
    },

    data() {
      return {
        isLimted: false
      }
    },

    computed: {
      model: {
        get() {
          return this._checkboxGroup ? this._checkboxGroup.value : this.value
        },
        set(val) {
          if (this._checkboxGroup) {
            this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimted = true)
            this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimted = true)

            this.isLimted === false && this.dispatch('ElCheckboxGroup', 'input', [val])
          } else {
            this.$emit('input', val)
          }
        }
      },
      isChecked() {
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        }
      },
      _checkboxGroup() {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'ElCheckboxGroup') {
            parent = parent.$parent
          } else {
            return parent
          }
        }
        return false
      },
      size() {
        return this._checkboxGroup.checkboxGroupSize || (this.$ELEMENT || {}).size
      },
      isDisabled() {
        return this._checkboxGroup
          ? this._checkboxGroup.disabled || this.disabled
          : this.disabled
      }
    },

    methods: {
      handleChange() {
        if (this.isLimted) return false;
        this.$nextTick(() => {
          this.$emit('change', this.model)
          this.isGroup && this.dispatch('ElCheckboxGroup', 'change', [this.model])
        })
      }
    }
  }
</script>
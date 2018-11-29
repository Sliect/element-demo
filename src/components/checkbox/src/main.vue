<template>
  <label
    class="el-checkbox"
    :class="[
      { 'is-checked': isChecked },
      { 'is-focus': focus },
      { 'is-disabled': isDisabled }
    ]"
  >
    <span class="el-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
    >
      <span class="el-checkbox__inner"></span>
      <input
        type="checkbox"
        class="el-checkbox__original"
        :value="label"
        v-model="model"
        :disabled="isDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>
    <span class="el-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
  // TODO:
  // DONE: v-model 绑定变量，Boolean
  // DONE disabled 禁用
  // DONE checkbox-group整合一组checkbox，label对应checkbox中的值，group的v-model绑定的变量对应label的值，则checked
  // DONE indeterminate属性介于全选和全不选中间的状态，Boolean
  // DONE min 和 max 可以控制被勾选的数量
  // check-button size属性
  // border 渲染 checkbox 的边框
  import Emitter from '@/mixins/emitter'

  export default {
    name: 'ElCheckbox',

    mixins: [Emitter],

    props: {
      label: {},
      value: Boolean,
      disabled: Boolean,
      indeterminate: Boolean,

    },

    data() {
      return {
        selfModel: false,
        focus: false,
        isLimted: false
      }
    },

    computed: {
      isDisabled() {
        return this.isGroup
          ? this._checkboxGroup.disabled || this.disabled
          : this.disabled
      },

      isGroup() {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'ElCheckboxGroup') {
            parent = parent.$parent
          } else {
            this._checkboxGroup = parent
            return true
          }
        }
        return false
      },

      store() {
        return this._checkboxGroup ? this._checkboxGroup.value : this.value
      },

      model: {
        get() {
          return this.isGroup
            ? this._checkboxGroup.value
            : this.value
        },
        set(val) {
          if (this.isGroup) {
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
          return this.model
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1
        }
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
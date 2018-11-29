<template>
  <label
    class="el-radio"
    :class="[
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-checked': model === label },
      { 'is-bordered': border },
      border && radioSize ? 'el-radio--' + radioSize : ''
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span class="el-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="el-radio__inner"></span>
      <input
        class="el-radio__original"
        :value="label"
        :name="name"
        type="radio"
        aria-hidden="true"
        v-model="model"
        :disabled="isDisabled"
        tabindex="-1"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>
    <span class="el-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
  import Emitter from '@/mixins/emitter'

  export default {
    name: 'ElRadio',

    mixins: [Emitter],

    props: {
      value: {},
      label: {},
      name: String,
      disabled: Boolean,
      border: Boolean,
      size: String
    },

    data() {
      return {
        focus: false
      }
    },

    computed: {
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value
        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('ElRadioGroup', 'input', [val])
          } else {
            this.$emit('input', val)
          }
        }
      },
      isGroup() {
        let parent = this.$parent
        while(parent) {
          if (parent.$options.name === 'ElRadioGroup') {
            this._radioGroup = parent
            return true
          } else {
            parent = parent.$parent
          }
        }
      },
      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled
          : this.disabled
      },
      tabIndex() {
        return !this.isDisabled
          ? (
            this.isGroup
              ? (this.model === this.label ? 0 : -1)
              : 0
          )
          : -1;
      },
      radioSize() {
        const temRadioSize = this.size || (this.$ELEMENT || {}).size
        return this.isGroup
          ? this._radioGroup.radioGroupSize || temRadioSize
          : temRadioSize
      }
    },

    methods: {
      handleChange() {
        this.$nextTick(() => {
          this.$emit('change', this.model)
          this.isGroup && this.dispatch('ElRadioGroup', 'handleChange', this.model)
        })
      }
    }
  }
</script>

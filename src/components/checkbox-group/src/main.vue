<template>
  <div class="el-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
  import Emitter from '@/mixins/emitter'

  export default {
    name: 'ElCheckboxGroup',

    mixins: [Emitter],

    props: {
      value: {},
      disabled: Boolean,
      size: String,
      min: Number,
      max: Number
    },

    computed: {
      checkboxGroupSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    }
  }
</script>
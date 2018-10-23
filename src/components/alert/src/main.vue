<template>
  <transition name="el-alert-fade">
    <div
      class="el-alert"
      :class="[typeClass, center ? 'is-center' : '']"
      v-show="visible"
    >
      <i class="el-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="el-alert__content">
        <span class="el-alert__title" :class="[ isBoldTitle ]" v-if="title">{{title}}</span>
        <slot>
          <p class="el-alert__description" v-if="description">{{description}}</p>
        </slot>
        <i class="el-alert__closebtn"
          :class="{'el-icon-close': closeText === '', 'is-customed': closeText !== ''}"
          v-show="closable"
          @click="close"
        >
          {{closeText}}
        </i>
      </div>
    </div>
  </transition>
</template>

<script>
  const TYPES = {
    success: 'el-icon-success',
    warning: 'el-icon-warning',
    error: 'el-icon-error',
  }
  export default {
    name: 'ElAlert',

    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      type: {
        type: String,
        default: 'info'
      },
      description: {
        type: String,
        default: ''
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: {
        type: Boolean,
        default: false
      },
      center: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      }
    },

    computed: {
      typeClass() {
        return `el-alert-${this.type}`
      },
      iconClass() {
        return TYPES[this.type] || 'el-icon-info'
      },
      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },
      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    },

    methods: {
      close() {
        this.visible = false
        this.$emit('close')
      }
    }
  }
</script>


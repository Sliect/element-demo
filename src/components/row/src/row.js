export default {
  name: 'ElRow',

  props: {
    gutter: Number,
    tag: {
      type: String,
      default: 'div'
    },
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    // 移除首尾间隔
    style() {
      const res = {}
      if (this.gutter) {
        res.marginLeft = `-${this.gutter / 2}px`
        res.marginRight = `-${this.gutter / 2}px`
      }
      return res
    }
  },

  render(h) {
    return h(
      this.tag,
      {
        class: [
          'el-row',
          this.justify !== 'start' ? `is-justify-${this.justify}` : '',
          this.align !== 'top' ? `is-align-${this.align}` : '',
          { 'el-row--flex': this.type === 'flex' }
        ],
        style: this.style
      },
      this.$slots.default
    )
  }
}
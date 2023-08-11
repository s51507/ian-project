<template>
  <div :class="parseClass" :style="parseStyle" @click="handleBtnClick" v-ripple>
    <slot />
  </div>
</template>

<script>

export default {
  inject: ['icMenuProvider'],
  props: {
    item: [String, Number, Object],
    width: [Number, String], // 寬度
    minWidth: [Number, String], // 最小寬度
    height: [Number, String], // 高度
    color: String, // 文字顏色
    activeColor: String, // active文字顏色
    background: String, // 背景
    activeBackground: String, // active背景
    borderColor: String, // 邊框顏色
    borderRadius: [Number, String], // 圓角
    disabled: Boolean, // disable樣式
    outlined: {
      type: Boolean,
      default: true
    }, // outlined樣式
  },
  computed: {
    parseClass() {
      return [
        'ic-menu-btn',
        !this.active && this.outlined && 'ic-menu-btn--outlined',
        this.active && 'ic-menu-btn--active'
      ]
    },
    parseStyle() {
      const { color, background, borderColor } = this.genColors()
      const height = this.checkNumber(this.height || 45)
      return {
        '--ic-menu-btn-width': this.checkNumber(this.width || this.icMenuProvider.width),
        '--ic-menu-btn-min-width': this.checkNumber(this.minWidth || this.width || this.icMenuProvider.width),
        '--ic-menu-btn-height': height,
        '--ic-menu-btn-color': color,
        '--ic-menu-btn-border-color': borderColor,
        '--ic-menu-btn-background': background,
        '--ic-menu-btn-border-radius': this.checkNumber(this.borderRadius || `calc(${height} / 2)`),
        '--ic-menu-btn-active-color': this.activeColor || this.$colors.white,
        '--ic-menu-btn-active-background': this.activeBackground || this.$colors.primary,
      }
    },
    active() {
      return this.item === this.icMenuProvider.active
    }
  },
  methods: {
    checkNumber(val) {
      if (typeof val === 'string') return val
      else return `${val}px`
    },
    genColors() {
      if (this.outlined) return this.genOutlinedColors()
      return this.genDefaultColors()
    },
    genDefaultColors() {
      const color = this.disabled ? this.$colors.textWhite : (this.color || this.$colors.textWhite)
      const background = this.disabled ? this.$colors.textDisable : (this.background || this.$colors.primary)
      return { color, background }
    },
    genOutlinedColors() {
      const color = this.disabled ? this.$colors.textDisable : (this.color || this.$colors.textPrimary)
      const borderColor = this.disabled ? this.$colors.textDisable : (this.borderColor || this.$colors.baseBorder)
      const background = this.disabled ? this.$colors.bgPrimary : (this.background || this.$colors.bgPrimary)
      return { color, background, borderColor }
    },
    handleBtnClick() {
      if (this.disabled) return
      this.$emit('click')
    }
  },
  mounted() {
    this.icMenuProvider.btnsMounted = true
  },
  beforeUpdate() {
    this.icMenuProvider.btnsMounted = false
  },
  updated() {
    this.icMenuProvider.btnsMounted = true
  },
}
</script>

<style lang="scss">
.ic-menu-btn {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--ic-menu-btn-width);
  min-width: var(--ic-menu-btn-min-width);
  height: var(--ic-menu-btn-height);
  color: var(--ic-menu-btn-color);
  background: var(--ic-menu-btn-background);
  border-radius: var(--ic-menu-btn-border-radius);
  padding: 5px;
  white-space: nowrap;
  font-size: 10px;
  // color: var(--textPrimary);
  &:not(:last-child) {
    margin-right: 5px;
  }
}

.ic-menu-btn.ic-menu-btn--outlined {
  border: 1px solid var(--ic-menu-btn-border-color);
}

.ic-menu-btn.ic-menu-btn--active {
  color: var(--ic-menu-btn-active-color);
  background-color: var(--ic-menu-btn-active-background);
}

</style>

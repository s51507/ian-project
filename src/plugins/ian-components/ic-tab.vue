<template>
  <div :class="parseClass" :style="parseStyle" @click="handleBtnClick" v-ripple>
    <slot />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  inject: ['icTabsProvider'],
  props: {
    item: [String, Number, Object],
    width: [Number, String], // 寬度
    minWidth: [Number, String], // 最小寬度
    height: [Number, String], // 高度
    color: String, // 文字顏色
    background: String, // 背景
    borderColor: String, // 邊框顏色
    borderRadius: [Number, String], // 圓角
    disabled: Boolean, // disable樣式
    outlined: {
      type: Boolean,
      default: true
    }, // outlined樣式
  },
  setup() {
    const active = ref(false)
    return {
      active,
    }
  },
  computed: {
    parseClass() {
      return [
        'ic-tab',
        !this.active && this.outlined && 'ic-tab--outlined',
        this.active && 'ic-tab--active'
      ]
    },
    parseStyle() {
      const { color, background, borderColor } = this.genColors()
      const height = this.checkNumber(this.height || 40)
      return {
        '--ic-tab-width': this.checkNumber(this.width || this.icTabsProvider.width),
        '--ic-tab-min-width': this.checkNumber(this.minWidth || this.width || this.icTabsProvider.width),
        '--ic-tab-height': height,
        '--ic-tab-color': color,
        '--ic-tab-border-color': borderColor,
        '--ic-tab-background': background,
        '--ic-tab-border-radius': this.checkNumber(this.borderRadius || `calc(${height} / 2)`),
      }
    },
  },
  watch: {
    'icTabsProvider.active'() {
      const activeItem = this.icTabsProvider.active
      switch (typeof this.item) {
        case 'string':
        case 'number':
          this.active = (this.item === activeItem)
          return
        default:
          // 單一btn的item應該不會有array的情況出現，故這邊都是當作object處理
          if (this.item === activeItem) this.active = true
          else this.active = Object.values(this.item).includes(activeItem)
      }
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
      const color = this.disabled ? 'var(--textWhite)' : (this.color || 'var(--textWhite)')
      const background = this.disabled ? 'var(--textDisable)' : (this.background || 'var(--primary)')
      return { color, background }
    },
    genOutlinedColors() {
      const color = this.disabled ? 'var(--textDisable)' : (this.color || 'var(--primary)')
      const borderColor = this.disabled ? 'var(--textDisable)' : (this.borderColor || 'var(--baseBorder)')
      const background = this.disabled ? 'var(--bgPrimary)' : (this.background || 'var(--bgPrimary)')
      return { color, background, borderColor }
    },
    handleBtnClick() {
      if (this.disabled) return
      this.$emit('click')
    }
  },
  mounted() {
    this.icTabsProvider.btnsMounted = true
  },
  beforeUpdate() {
    this.icTabsProvider.btnsMounted = false
  },
  updated() {
    this.icTabsProvider.btnsMounted = true
  },
}
</script>

<style lang="scss">
.ic-tab {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--ic-tab-width);
  min-width: var(--ic-tab-min-width);
  height: var(--ic-tab-height);
  color: var(--ic-tab-color);
  background: var(--ic-tab-background);
  border-radius: var(--ic-tab-border-radius);
  padding: 5px;
  white-space: nowrap;
  font-size: 100%;
  font-weight: 600;
  color: var(--textSecondary);
  &:not(:last-child) {
    margin-right: 5px;
  }
}

// .ic-tab.ic-tab--outlined {
//   // border: 1px solid var(--ic-tab-border-color);
// }

.ic-tab.ic-tab--active {
  color: var(--secondary);
  // background-color: var(--primary);
}

</style>

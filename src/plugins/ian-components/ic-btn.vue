<template>
  <div :class="parseClass" :style="parseStyle" @click="handleBtnClick" v-ripple>
    <slot />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import useGlobalStore from '@/stores/global'

export default {
  emits: ['click'],
  props: {
    width: [Number, String], // 寬度
    minWidth: [Number, String], // 最小寬度
    height: [Number, String], // 高度
    color: String, // 文字顏色
    background: String, // 背景
    borderRadius: [Number, String], // 圓角
    outlined: Boolean, // outlined樣式
    disabled: Boolean, // disable樣式
  },
  computed: {
    ...mapState(useGlobalStore, ['dark']),
    parseClass() {
      return [
        'ic-btn',
        this.outlined && 'ic-btn--outlined'
      ]
    },
    parseStyle() {
      const { color, background } = this.genColors()
      return {
        '--ic-btn-width': this.checkNumber(this.width || '100%'),
        '--ic-btn-min-width': this.checkNumber(this.minWidth || this.width || '100%'),
        '--ic-btn-height': this.checkNumber(this.height || 45),
        '--ic-btn-color': color,
        '--ic-btn-background': background,
        '--ic-btn-border-radius': this.checkNumber(this.borderRadius || 5),
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
      const background = this.disabled ? 'var(--bgPrimary)' : (this.background || 'var(--bgPrimary)')
      return { color, background }
    },
    handleBtnClick() {
      if (this.disabled) return
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.ic-btn {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--ic-btn-width);
  min-width: var(--ic-btn-min-width);
  height: var(--ic-btn-height);
  color: var(--ic-btn-color);
  background: var(--ic-btn-background);
  border-radius: var(--ic-btn-border-radius);
  padding: 5px;
}

.ic-btn.ic-btn--outlined {
  border: 1px solid var(--ic-btn-color);
}

</style>

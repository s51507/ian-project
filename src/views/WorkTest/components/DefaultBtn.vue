<template>
  <div :class="parseClass" :style="parseStyle" @click="handleBtnClick" v-ripple>
    <slot />
    <div v-if="arrow" :class="$style.arrow">></div>
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
    arrow: Boolean, // 要不要顯示箭頭
  },
  computed: {
    ...mapState(useGlobalStore, ['dark']),
    parseClass() {
      return [
        'default-btn',
        this.outlined && 'default-btn--outlined'
      ]
    },
    parseStyle() {
      const { color, background } = this.genColors()
      const height = this.height || 40
      return {
        '--default-btn-width': this.checkNumber(this.width || '100%'),
        '--default-btn-min-width': this.checkNumber(this.minWidth || this.width || '100%'),
        '--default-btn-height': this.checkNumber(height),
        '--default-btn-color': color,
        '--default-btn-background': background,
        '--default-btn-border-radius': this.checkNumber(this.borderRadius || height / 2),
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
      const background = this.disabled ? 'var(--textDisable)' : (this.background || '#FF9122')
      return { color, background }
    },
    genOutlinedColors() {
      const color = this.disabled ? 'var(--textDisable)' : (this.color || '#FF9122')
      const background = this.disabled ? 'var(--bgPrimary)' : (this.background || 'white')
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
.default-btn {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--default-btn-width);
  min-width: var(--default-btn-min-width);
  height: var(--default-btn-height);
  color: var(--default-btn-color);
  background: var(--default-btn-background);
  border-radius: var(--default-btn-border-radius);
  padding: 8px 16px;
  & > .arrow {
    margin-left: 16px;
  }
}

.default-btn.default-btn--outlined {
  border: 1px solid var(--default-btn-color);
}

</style>

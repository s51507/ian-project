<template>
  <div @mouseover="() => handelHover(true)" @mouseleave="() => handelHover(false)">
    <span style="cursor: pointer" ref="target">
      <slot />
    </span>
    <Teleport to="#app">
      <div :class="$style.tip" :style="tipStyle" ref="tip">
        {{ tip }}
        <slot name="tip" />
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  props: {
    tip: String,
    maxWidth: {
      type: [Number, String],
      default: 300
    },
    position: {
      type: String,
      default: 'bottom' // top, bottom, left, right
    }
  },
  data() {
    return {
      targetElm: null,
      tipElm: null,
      show: false
    }
  },
  computed: {
    tipStyle() {
      if (!this.targetElm || !this.tipElm) return

      const { top, left, offsetX, offsetY, arrow, margin } = this.getPosition()
      const opacity = this.show ? 1 : 0
      const zIndex = this.show ? 100 : -1

      return {
        top: isNaN(top) ? top : `${top}px`,
        left: `${left}px`,
        opacity,
        zIndex,
        margin,
        maxWidth: isNaN(this.maxWidth) ? this.maxWidth : `${this.maxWidth}px`,
        '--tipOffsetX': `${offsetX}px`,
        '--tipOffsetY': `${offsetY}px`,
        '--igToolTipArrowColor': arrow.color,
        '--igToolTipArrowLeft': arrow.left,
        '--igToolTipArrowBottom': arrow.bottom,

      }
    }
  },
  methods: {
    handelHover(bool) {
      this.show = bool
    },
    getPosition() {
      const targetInfo = this.targetElm.getBoundingClientRect()
      const tipInfo = this.tipElm.getBoundingClientRect()
      const tipWidth = this.getTipWidth(tipInfo.width)

      let top = 0
      let left = 0
      let offsetX = 0
      let offsetY = 0
      let calcLeft = 0
      let margin = ''
      const arrow = { color: '', bottom: '', left: '' }

      // 規避eslint警告，switch case內不能宣告變數
      let arrowLeft
      let targetRight
      let offsetArrowLeft

      switch (this.position) {
        case 'left':
          // top = 對象距離螢幕top - ((tip的高 - 對象的高) / 2)
          top = targetInfo.top - (Math.abs(tipInfo.height - targetInfo.height) / 2)
          // top = 對象距離螢幕right - tip的寬 - 箭頭寬度 - 預留空間 - margin-left
          left = targetInfo.left - tipWidth - 5 - 5 - 10
          arrow.color = 'transparent transparent transparent var(--primary)'
          arrow.bottom = 'calc(50% - 5px)'
          arrow.left = 'calc(100% + 4px)'
          margin = '0 0 0 10px'

          return { top, left, offsetX, offsetY, arrow, margin }
        case 'right':
          // top = 對象距離螢幕top - ((tip的高 - 對象的高) / 2)
          top = targetInfo.top - (Math.abs(tipInfo.height - targetInfo.height) / 2)
          // top = 對象距離螢幕right + 箭頭寬度 + 預留空間
          left = targetInfo.right + 5 + 5
          arrow.color = 'transparent var(--primary) transparent transparent'
          arrow.bottom = 'calc(50% - 5px)'
          arrow.left = '-4px'
          margin = '0 10px 0 0'

          return { top, left, offsetX, offsetY, arrow, margin }
        case 'top':
          // top = 對象距離螢幕top - tip的高 - 箭頭高度 - 預留空間
          top = targetInfo.top - tipInfo.height - 5 - 5
          calcLeft = targetInfo.left + (Math.abs(tipWidth - targetInfo.width) / 2)

          // 校正位置
          offsetX = this.calcOffsetX(calcLeft, tipInfo)
          // 確保tip不會超出目標外面
          left = (calcLeft - offsetX) > targetInfo.right ? (targetInfo.right - 5) : (calcLeft - offsetX)

          // 箭頭位置
          arrowLeft = (tipWidth / 2) + offsetX
          // 箭頭最右方 = target右方扣掉圓角距離
          targetRight = targetInfo.right - 5
          // 箭頭位置不可超出target右方
          offsetArrowLeft = (arrowLeft + tipInfo.left) >= targetRight ? (targetRight - tipInfo.left) : arrowLeft

          arrow.color = 'var(--primary) transparent transparent transparent'
          arrow.bottom = '-9px'
          arrow.left = `${offsetArrowLeft}px`

          return { top, left, offsetX, offsetY, arrow }
        case 'bottom':
        default:
          // top = 對象距離螢幕top + 對象的高 + 箭頭高度 + 預留空間
          top = targetInfo.top + targetInfo.height + 5 + 5
          calcLeft = targetInfo.left + (Math.abs(tipWidth - targetInfo.width) / 2)

          // 校正位置
          offsetX = this.calcOffsetX(calcLeft, tipInfo)
          // 確保tip不會超出目標外面
          left = (calcLeft - offsetX) > targetInfo.right ? (targetInfo.right - 5) : (calcLeft - offsetX)

          // 箭頭位置
          arrowLeft = (tipWidth / 2) + offsetX
          // 箭頭最右方 = target右方扣掉圓角距離
          targetRight = targetInfo.right - 5
          // 箭頭位置不可超出target右方
          offsetArrowLeft = (arrowLeft + tipInfo.left) >= targetRight ? (targetRight - tipInfo.left) : arrowLeft

          arrow.color = 'transparent transparent var(--primary) transparent'
          arrow.bottom = 'calc(100% - 1px)'
          arrow.left = `${offsetArrowLeft}px`

          return { top, left, offsetX, offsetY, arrow }
      }
    },
    calcOffsetX(left, tipInfo) {
      const tipWidth = this.getTipWidth(tipInfo.width)
      // 右邊剩餘空間
      const rightSpace = window.innerWidth - (left + tipWidth)
      // 左邊剩餘空間是否足夠
      const leftSpaceIsEnough = tipInfo.left > 0

      // 左邊不足 return 預留空間 - tip left
      if (!leftSpaceIsEnough) return -(5 - tipInfo.left)
      // 右邊小於預留空間就推回來
      else if (rightSpace < 5) return 5 - rightSpace
      else return 0
    },
    getTipWidth(tipWidth) {
      const maxWidth = String(this.maxWidth).replace(/px/g, '')
      if (isNaN(maxWidth)) return tipWidth

      return tipWidth > maxWidth ? maxWidth : tipWidth

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.targetElm = this.$refs?.target
      this.tipElm = this.$refs?.tip
    })
  }
}
</script>

<style lang="scss" module>
.tip {
  position: fixed;
  // width: 500px;
  // height: 500px;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  color: var(--textWhite);
  background: var(--primary);
  z-index: -1;
  transition: .3s;
  opacity: 0;
  box-shadow: 0 1px 2px 0 var(--shadow);
  &::after {
    content: " ";
    position: absolute;
    bottom: var(--igToolTipArrowBottom);
    left: var(--igToolTipArrowLeft);
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--igToolTipArrowColor);
  }
}
</style>

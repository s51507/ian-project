<template>
  <div :class="$style.main" ref="main">
    <div :class="$style.container" ref="container">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    limitTop: {
      type: [String, Number],
      default: 0
    }
  },
  setup() {
  },
  methods: {
    mainAreaScroll(e) {
      this.$refs.main.scrollTo({ left: this.$refs.main.scrollLeft + e.deltaY })

      // 計算頁面應停留的高度 - 已滾動距離 + (目前距離上方多少 - 應距離上方多少)
      const mainTop = this.$refs.main.getBoundingClientRect().top
      const stopPosition = window.scrollY + (mainTop - this.limitTop)
      window.scrollTo({ top: stopPosition })

      // main是否滾回最左邊惹
      if (this.$refs.main.scrollLeft <= 0) return this.removeWheelScrollEvent()

      // main是否滾到最右邊惹
      const containerWidth = this.$refs.container.getBoundingClientRect().width
      const scrollLimit = containerWidth - window.innerWidth
      if (this.$refs.main.scrollLeft >= scrollLimit) return this.removeWheelScrollEvent()
    },
    addWheelScrollEvent() {
      document.body.style.overflow = 'hidden'
      // apple的橡皮筋效果
      document.body.style['overscroll-behavior'] = 'none'
      window.addEventListener('wheel', this.mainAreaScroll, false)
    },
    removeWheelScrollEvent() {
      document.body.style.overflow = ''
      document.body.style['overscroll-behavior'] = ''
      window.removeEventListener('wheel', this.mainAreaScroll, false)
    },
    decideAddWheelScrollEvent(e) {
      if (e.deltaY > 0) this.wheelScroolDown()
      else this.wheelScroolUp()
    },
    wheelScroolUp() {
      // 上方距離是否達到目標
      const mainTop = this.$refs.main.getBoundingClientRect().top
      if (mainTop < this.limitTop) return
      
      // main是否滾回最左邊惹
      if (this.$refs.main.scrollLeft <= 0) return

      this.addWheelScrollEvent()
    },
    wheelScroolDown() {
      // 上方距離是否達到目標
      const mainTop = this.$refs.main.getBoundingClientRect().top
      if (mainTop > this.limitTop) return
      
      // // main是否滾到最右邊惹
      const containerWidth = this.$refs.container.getBoundingClientRect().width
      const scrollLimit = containerWidth - window.innerWidth
      if (this.$refs.main.scrollLeft >= scrollLimit) return

      this.addWheelScrollEvent()
    },
    addBodyScrollEvent() {
      window.addEventListener('wheel', this.decideAddWheelScrollEvent, false)
    },
    removeBodyScrollEvent() {
      window.removeEventListener('wheel', this.decideAddWheelScrollEvent, false)
    }
  },
  mounted() {
    // 如果寬度不足以滾動的話就不用了
    const containerWidth = this.$refs.container.getBoundingClientRect().width
    if (window.innerWidth >= containerWidth) return

    this.addBodyScrollEvent()
  },
  beforeUnmount() {
    this.removeBodyScrollEvent()
    this.removeWheelScrollEvent()
  }
}
</script>

<style lang="scss" module>
.main {
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  & > .container {
    display: inline-flex;
  }
}
</style>

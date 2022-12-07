<template>
  <div :class="[$style.main, !isCn && $style['main-en']]">
    <div ref="menuContainer">
      <!-- 因為btn的item格式並非一定會統一，所以用solt的方式讓外面去決定要怎麼顯示 -->
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
const igMenuProvider = Vue.observable({
  active: null,
  width: null,
  btnsMounted: false,
})

export default {
  provide: {
    igMenuProvider
  },
  props: {
    value: [String, Number, Object],
  },
  watch: {
    value() {
      this.$nextTick(() => this.findActiveNode())
    },
    btnsMounted() {
      this.calWidth()
    }
  },
  computed: {
    btnsMounted() {
      return igMenuProvider.btnsMounted
    }
  },
  methods: {
    scrollToCenter(target) {
      const containerCenter = this.$refs.menuContainer.clientWidth / 2
      if (!target) return
      const targetInfo = target.getBoundingClientRect()
      const targetCenter = targetInfo.left + (targetInfo.width / 2)
      // 滾動距離 = 已滾動的距離 + (目標中間點 - 容器中間點)
      const scrollLeft = this.$refs.menuContainer.scrollLeft + (targetCenter - containerCenter)
      this.$refs.menuContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    },
    findActiveNode() {
      const nodes = Array.from(this.$slots.default)
      nodes.map(node => {
        const propsItem = node.componentOptions.propsData.item
        const isActive = this.judgeIsActive(propsItem)

        if (!isActive) return

        igMenuProvider.active = propsItem
        this.scrollToCenter(node.elm)
      })
    },
    // 因為btn的item格式並非一定會統一，所以需要先判定格式後再處理
    judgeIsActive(item) {
      switch (typeof item) {
        case 'string':
        case 'number':
          return item === this.value
        default:
          // 單一btn的item應該不會有array的情況出現，故這邊都是當作object處理
          if (item === this.value) return true
          return Object.values(item).includes(this.value)
      }
    },
    calWidth() {
      const width = Array.from(this.$slots.default, node => node.elm && node.elm.clientWidth)
      let MaxWidth = Math.max(...width)
      if (MaxWidth < 60) MaxWidth = 60
      if (MaxWidth > 190) MaxWidth = 190

      igMenuProvider.width = MaxWidth
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" module>
.main {
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 41;
  transform: translateY(-10px);
  background-color: var(--bgPrimary);
  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
    padding: 0 7px;
    overflow: auto;
  }
  &-en > div > div {
    font-size: 12px;
    letter-spacing: 0px;
    width: 120px;
    margin-right: 6px;
  }
}

</style>

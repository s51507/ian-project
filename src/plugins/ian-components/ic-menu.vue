<template>
  <div :class="$style.main">
    <div ref="menuContainer">
      <!-- 因為btn的item格式並非一定會統一，所以用solt的方式讓外面去決定要怎麼顯示 -->
      <slot />
    </div>
  </div>
</template>

<script>
import { provide, reactive } from 'vue'

export default {
  props: {
    modelValue: [String, Number, Object],
  },
  setup() {
    const icMenuReactive = reactive({
      active: null,
      width: null,
      btnsMounted: false,
    })

    provide('icMenuProvider', icMenuReactive)
    return {
      icMenuProvider: icMenuReactive
    }
  },
  watch: {
    modelValue() {
      this.$nextTick(() => this.findActiveNode())
    },
    btnsMounted() {
      this.calWidth()
      this.$nextTick(() => this.findActiveNode())
    }
  },
  computed: {
    btnsMounted() {
      return this.icMenuProvider.btnsMounted
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
      const eles = Array.from(this.$refs.menuContainer.getElementsByClassName('ic-menu-btn'))
      const nodes = Array.from(this.$slots.default()[0]?.children)
      nodes.map((node, idx) => {
        const propsItem = node.props.item
        const isActive = this.judgeIsActive(propsItem)

        if (!isActive) return

        this.icMenuProvider.active = propsItem
        this.scrollToCenter(eles[idx])
      })
    },
    // 因為btn的item格式並非一定會統一，所以需要先判定格式後再處理
    judgeIsActive(item) {
      switch (typeof item) {
        case 'string':
        case 'number':
          return item === this.modelValue
        default:
          // 單一btn的item應該不會有array的情況出現，故這邊都是當作object處理
          if (item === this.modelValue) return true
          return Object.values(item).includes(this.modelValue)
      }
    },
    calWidth() {
      const width = Array.from(this.$slots.default, node => node.elm && node.elm.clientWidth)
      let MaxWidth = Math.max(...width)
      if (MaxWidth < 120) MaxWidth = 120
      if (MaxWidth > 190) MaxWidth = 190

      this.icMenuProvider.width = MaxWidth
    }
  },
}
</script>

<style lang="scss" module>
.main {
  // position: fixed;
  // top: 50px;
  width: 100%;
  // z-index: 41;
  // transform: translateY(-10px);
  background-color: var(--bgPrimary);
  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
    padding: 0 7px;
    overflow: auto;
  }
}

</style>

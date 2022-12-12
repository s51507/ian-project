<template>
  <div :class="$style.main">
    <div ref="tabsContainer">
      <!-- 因為btn的item格式並非一定會統一，所以用solt的方式讓外面去決定要怎麼顯示 -->
      <slot />
      <div :class="$style.activeBar" :style="genActiveBarStyle" ref="activeBar" />
    </div>
  </div>
</template>

<script>
import { provide, reactive, computed, ref } from 'vue'

export default {
  props: {
    modelValue: [String, Number, Object],
    autoWidth: Boolean
  },
  setup() {
    const icTabsReactive = reactive({
      active: null,
      width: null,
      btnsMounted: false,
    })

    const activeBarLeft = ref('0px')
    const activeBarWidth = ref('0px')

    provide('icTabsProvider', icTabsReactive)

    const genActiveBarStyle = computed(() => {
      return {
        left: activeBarLeft.value,
        width: activeBarWidth.value,
      }
    })

    return {
      activeBarLeft,
      activeBarWidth,
      genActiveBarStyle,
      icTabsProvider: icTabsReactive
    }
  },
  watch: {
    modelValue() {
      this.$nextTick(() => this.findActiveNode())
    },
    btnsMounted() {
      if (!this.btnsMounted) return

      if (this.autoWidth) this.calWidth()
      this.$nextTick(() => this.findActiveNode())
    }
  },
  computed: {
    btnsMounted() {
      return this.icTabsProvider.btnsMounted
    },
  },
  methods: {
    scrollToCenter(target) {
      const containerCenter = this.$refs.tabsContainer.clientWidth / 2
      if (!target) return
      const targetInfo = target.getBoundingClientRect()
      const targetCenter = targetInfo.left + (targetInfo.width / 2)
      // 滾動距離 = 已滾動的距離 + (目標中間點 - 容器中間點)
      const scrollLeft = this.$refs.tabsContainer.scrollLeft + (targetCenter - containerCenter)
      this.$refs.tabsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    },
    moveActiveBar(target) {
      const targetInfo = target.getBoundingClientRect()
      const containerLeft = this.$refs.tabsContainer.getBoundingClientRect().left
      this.activeBarLeft = `${targetInfo.left + this.$refs.tabsContainer.scrollLeft - containerLeft}px`
      this.activeBarWidth = `${targetInfo.width}px`
    },
    findActiveNode() {
      if (!this.btnsMounted) return
      if (!this.$slots.default) return

      const eles = Array.from(this.$refs.tabsContainer.getElementsByClassName('ic-tab'))
      const nodes = Array.from(this.$slots.default()[0]?.children)
      const activeTargetNodeIndex = nodes.findIndex(node => this.judgeIsActive(node.props.item))
      const activeTargetEle = eles[activeTargetNodeIndex]
      if (!activeTargetEle) return

      this.icTabsProvider.active = nodes[activeTargetNodeIndex].props.item
      this.scrollToCenter(activeTargetEle)
      this.moveActiveBar(activeTargetEle)

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
          return Object.values(item).some(val => String(val) === String(this.modelValue))
      }
    },
    calWidth() {
      if (!this.$slots.default) return
      const width = Array.from(this.$slots.default, node => node.elm && node.elm.clientWidth)
      let MaxWidth = Math.max(...width)
      if (MaxWidth < 60) MaxWidth = 60
      if (MaxWidth > 190) MaxWidth = 190

      this.icTabsProvider.width = MaxWidth
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" module>
.main {
  width: 100%;
  z-index: 41;
  background-color: var(--bgPrimary);
  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    padding: 0 7px;
    overflow: auto;
    position: relative;
    & > .activeBar {
      position: absolute;
      height: 2px;
      left: 0;
      bottom: 0;
      z-index: 1;
      margin: 0;
      width: 0px;
      background-color: var(--secondary);
      transition: .3s;
    }
  }
}

</style>

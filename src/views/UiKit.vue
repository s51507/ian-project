<template>
  <div :class="$style.main">
    <IcBtn :class="$style.btn"> IcBtn </IcBtn>
    <IcTooltip :class="$style.tooltip">
      <IcBtn> IcTooltip </IcBtn>
      <template #tip> Teleport to #app </template>
    </IcTooltip>
    <IcTabs v-model="icTabsInfo.active">
      <IcTab v-for="tab in icTabsInfo.list" :key="tab" :item="tab" @click="() => handleTabClick(tab)">{{ tab }}</IcTab>
    </IcTabs>
  </div>
</template>
<script>
// 一般狀態
import { reactive, getCurrentInstance } from 'vue'

export default {
  props: {
    value: String
  },
  setup(props, context) {
    console.log(context.emit)
    const  { proxy } = getCurrentInstance()
    // 要這樣才能拿到vue2的this
    console.log(proxy.$colors)

    const icTabsInfo = reactive({
      active: 'ictab-1',
      list: [
        'ictab-1',
        'ictab-2',
        'ictab-3',
        'ictab-4',
        'ictab-5AAAAAAA'
      ]
    })

    //組中模板中需要的變數，都要通過return給暴露出去，就像當初data({return { } }) 是一樣的
    return {
      icTabsInfo
    }
  },
  methods: {
    handleTabClick(target) {
      this.icTabsInfo.active = target
    }
  }
}
</script>

<style lang="scss" module>
.main {
  padding: 10px;
  background: var(--textPrimary);
  .btn {
    width: 200px;
    min-width: 200px;
  }
  .tooltip {
    width: 200px;
  }
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>

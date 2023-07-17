<template>
  <div :class="$style.main">
    <span>IcBtn + IcDialog show: {{ showDialog }}</span>
    <IcBtn :class="$style.btn" @click="handleBtnClick"> IcBtn </IcBtn>

    <span>IcTooltip</span>
    <div :class="$style.tooltipArea">
      <IcTooltip :class="$style.tooltip" position="top">
        <IcBtn outlined> top </IcBtn>
        <template #tip> Teleport to #app </template>
      </IcTooltip>

      <IcTooltip :class="$style.tooltip" position="right">
        <IcBtn outlined> right </IcBtn>
        <template #tip> Teleport to #app </template>
      </IcTooltip>

      <IcTooltip :class="$style.tooltip" position="bottom">
        <IcBtn outlined> bottom </IcBtn>
        <template #tip> Teleport to #app </template>
      </IcTooltip>

      <IcTooltip :class="$style.tooltip" position="left">
        <IcBtn outlined> left </IcBtn>
        <template #tip> Teleport to #app </template>
      </IcTooltip>
    </div>

    <span>IcTabs active: {{ icTabsInfo.active }}</span>
    <IcTabs v-model="icTabsInfo.active">
      <IcTab v-for="tab in icTabsInfo.list" :key="tab" :item="tab" @click="() => handleTabClick(tab)">{{ tab }}</IcTab>
    </IcTabs>

    <span>IcMenu active: {{ icMenuInfo.active }}</span>
    <IcMenu v-model="icMenuInfo.active">
      <IcMenuBtn  v-for="btn in icMenuInfo.list" :key="btn" :item="btn" @click="() => handleMenuClick(btn)">
        {{ btn }}
      </IcMenuBtn>
    </IcMenu>
    <IcDialog v-model="showDialog" :btns="dialogBtns">
      <template #content> content </template>
    </IcDialog>
  </div>
</template>
<script>
// 一般狀態
import { reactive, getCurrentInstance, ref } from 'vue'

export default {
  props: {
    value: String
  },
  setup(props, context) {
    console.log(context.emit)
    const  { proxy } = getCurrentInstance()
    // 要這樣才能拿到vue2的this
    console.log(proxy.$colors)

    const showDialog = ref(false)
    const dialogBtns = reactive([
      { text: 'ok' },
      { text: 'no' }
    ])

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

    const icMenuInfo = reactive({
      active: 'icmenu-1',
      list: [
        'icmenu-1',
        'icmenu-2',
        'icmenu-3',
        'icmenu-4',
        'icmenu-5AAAAAAA'
      ]
    })

    //組中模板中需要的變數，都要通過return給暴露出去，就像當初data({return { } }) 是一樣的
    return {
      showDialog,
      dialogBtns,
      icTabsInfo,
      icMenuInfo
    }
  },
  methods: {
    handleBtnClick() {
      this.showDialog = true
    },
    handleTabClick(target) {
      this.icTabsInfo.active = target
    },
    handleMenuClick(target) {
      this.icMenuInfo.active = target
    },
  }
}
</script>

<style lang="scss" module>
.main {
  padding: 10px;
  color: var(--textSecondary);
  background: var(--bgPrimary);
  .btn {
    width: 200px;
    min-width: 200px;
  }
  .tooltipArea {
    display: flex;
    align-items: center;
    & > :not(:last-child) {
      margin-right: 10px;
    }
    .tooltip {
      width: 200px;
    }
  }
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>

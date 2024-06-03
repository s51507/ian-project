<template>
  <div :class="$style.main">
    <span>IcBtn + update theme isDark: {{ isDark }}</span>
    <IcBtn :class="$style.btn" @click="handleThemeBtnClick"> IcBtn + update theme </IcBtn>

    <span>IcBtn + IcDialog show: {{ showDialog }}</span>
    <IcBtn :class="$style.btn" @click="handleShowDialogBtnClick"> IcBtn </IcBtn>

    <span>IcTooltip</span>
    <div :class="$style.tooltipArea">
      <template v-for="item in icToolTipList" :key="item.position">
        <IcTooltip :class="$style.tooltip" :position="item.position">
          <IcBtn outlined> {{ item.text }} </IcBtn>
          <template #tip> Teleport to #app </template>
        </IcTooltip>
      </template>
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

    <span>IcScrollHorizontal</span>
    <IcScrollHorizontal>
      <div :class="[$style.box, $style.green]" />
      <div :class="[$style.box, $style.blue]" />
      <div :class="[$style.box, $style.red]" />
      <div :class="[$style.box, $style.yellow]" />
      <div :class="[$style.box, $style.green]" />
      <div :class="[$style.box, $style.blue]" />
      <div :class="[$style.box, $style.red]" />
      <div :class="[$style.box, $style.yellow]" />
      <div :class="[$style.box, $style.green]" />
      <div :class="[$style.box, $style.blue]" />
      <div :class="[$style.box, $style.red]" />
      <div :class="[$style.box, $style.yellow]" />
    </IcScrollHorizontal>

    <IcDialog v-model="showDialog" :btns="dialogBtns">
      <template #content> content </template>
    </IcDialog>
  </div>
</template>
<script>
// 一般狀態
import { reactive, getCurrentInstance, ref } from 'vue'
import { UPDATE_IS_DARK } from '@/stores/constant'
import { storeToRefs } from 'pinia'
import useGlobalStore from '@/stores/global'

export default {
  props: {
    value: String
  },
  setup(props, context) {
    console.log(context.emit)
    const  { proxy } = getCurrentInstance()
    // 要這樣才能拿到vue2的this
    console.log(proxy.$colors)

    const globalStore = useGlobalStore()
    const { isDark } = storeToRefs(globalStore)

    const showDialog = ref(false)
    const dialogBtns = reactive([
      { text: 'ok' },
      { text: 'no' }
    ])

    const icToolTipList = [
      { position: 'top', text: 'top' },
      { position: 'right', text: 'right' },
      { position: 'bottom', text: 'bottom' },
      { position: 'left', text: 'left' },
    ]

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
      globalStore,
      isDark,
      icToolTipList,
      showDialog,
      dialogBtns,
      icTabsInfo,
      icMenuInfo
    }
  },
  methods: {
    handleThemeBtnClick() {
      this.globalStore[UPDATE_IS_DARK](!this.isDark)
    },
    handleShowDialogBtnClick() {
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

  .box {
    width: 300px;
    height: 1000px;
    &.green {
      background-color: green;
    }
    &.blue {
      background-color: navy;
    }
    &.red {
      background-color: red;
    }
    &.yellow {
      background-color: darkgoldenrod;
    }
  }
}
</style>

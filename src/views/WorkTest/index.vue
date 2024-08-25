<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="$style.main">
    <div :class="$style.bannerArea">
      <div :class="$style.banner">970 x 250</div>
    </div>
    <div :class="$style.navBar">
      <div :class="$style.navBarButton" v-for="item in navBarButtonList" :key="item.value">
        <div>{{ item.text }}</div>
      </div>
    </div>
    <div :class="$style.menuBar">
      <div :class="$style.left">
        <MenuBtn v-model="menuBtnActive" width="40" />
        <div :class="$style.logo">LOGO</div>
        <div :class="$style.wtf">327 x 28</div>
      </div>
      <div :class="$style.center">
        <div :class="$style.searchBar">searchBar</div>
      </div>
      <div :class="$style.right">
        <div :class="$style.menberOnly">會員限定</div>
        <DefaultBtn outlined >登入</DefaultBtn>
        <DefaultBtn >加入會員</DefaultBtn>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useGlobalStore from '@/stores/global'
import { UPDATE_IS_DARK } from '@/stores/constant'
import MenuBtn from './components/MenuBtn.vue'
import DefaultBtn from './components/DefaultBtn.vue'

export default {
  props: {
    value: String
  },
  components: {
    MenuBtn,
    DefaultBtn,
  },
  setup() {
    const navBarButtonList = ref([
      { text: '康健', value: 1 },
      { text: '大人社團', value: 2 },
      { text: '康健知識庫', value: 3 },
      { text: '康健線上學習', value: 4 },
      { text: '康健嚴選', value: 5 },
      { text: '康健出版', value: 6 },
      { text: '康健影音', value: 7 },
      { text: '書香花園', value: 8 },
    ])
    const menuBtnActive = ref(false)
    return {
      navBarButtonList,
      menuBtnActive,
    }
  },
  methods: {

  },
  // 生命週期也可寫在外面
  beforeMount() {
  },
  mounted() {
  },
}
</script>

<style lang="scss" module>
.main {
  background: white;
  & > .bannerArea {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300px;
    & > .banner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 970px;
      height: 250px;
      background-color: #dddddd;
      color: white;
      font-size: 48px;
    }
  }
  & > .navBar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100vw;
    height: 32px;
    background: #B38E5B;
    & > .navBarButton {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 8px;
      color: white;
      background: #B38E5B;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        filter: brightness(1.05);
      }
      &:not(:last-child) {
        margin-right: 12px;
      }
      &:last-child {
        margin-right: 5vw;
      }
    }
  }
  & > .menuBar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    height: 93px;
    & > div {
      display: flex;
      align-items: center;
    }
    & > .left {
      & > div:not(:last-child) {
        margin-right: 24px;
      }
      & > .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 48px;
        background-color: black;
        color: white;
      }
      & > .wtf {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 192px;
        height: 48px;
        background-color: #dddddd;
        color: white;
      }
    }
  }
}
</style>

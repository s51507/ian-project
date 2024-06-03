<template>
  <div :class="$style.main">
    <div :class="$style.component">
      <div :class="$style.name">DayAndNightSwitch <a href="https://uiverse.io/Galahhad/strong-squid-82" target="_blank">https://uiverse.io/Galahhad/strong-squid-82</a></div>
      <DayAndNightSwitch />
    </div>
  </div>
</template>
<script>
// 一般狀態
// import { ref, reactive, getCurrentInstance } from 'vue'
// import { UPDATE_IS_DARK } from '@/stores/constant'
// import { storeToRefs } from 'pinia'
// import useGlobalStore from '@/stores/global'

import DayAndNightSwitch from '@/plugins/web-components/DayAndNightSwitch.vue'

export default {
  props: {
  },
  components: {
    DayAndNightSwitch,
  },
  setup() {

  },
  methods: {

  }
}
</script>

<style lang="scss" module>
.main {
  padding: 10px;
  color: var(--textSecondary);
  background: var(--bgPrimary);
  & > .component {
    margin-bottom: 20px;
    & > .name {
      margin-bottom: 10px;
    }
  }

}
</style>

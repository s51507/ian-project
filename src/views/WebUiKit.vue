<template>
  <div :class="$style.main">
    <div :class="$style.component">
      <div :class="$style.name">DayAndNightSwitch <a href="https://uiverse.io/Galahhad/strong-squid-82" target="_blank">https://uiverse.io/Galahhad/strong-squid-82</a></div>
      <DayAndNightSwitch />
    </div>
    <div :class="$style.component">
      <div :class="$style.name">GlitchEffectText <a href="https://uiverse.io/andrew-demchenk0/silent-earwig-10" target="_blank">https://uiverse.io/andrew-demchenk0/silent-earwig-10</a></div>
      <GlitchEffectText text="Loading..................................." width="200px" />
    </div>
    <div :class="$style.component">
      <div :class="$style.name">LeapingPlaceholder <a href="https://uiverse.io/foxyyyyyyyyyyyyy/stupid-firefox-22" target="_blank">https://uiverse.io/andrew-demchenk0/silent-earwig-10</a></div>
      <LeapingPlaceholder v-model="leapingPlaceholderText" placeholder="請輸入帳號" startFromEnd />
      <div> {{ leapingPlaceholderText }}</div>
    </div>
  </div>
</template>
<script>
// 一般狀態
import { ref, reactive, getCurrentInstance } from 'vue'
// import { UPDATE_IS_DARK } from '@/stores/constant'
// import { storeToRefs } from 'pinia'
// import useGlobalStore from '@/stores/global'

import DayAndNightSwitch from '@/plugins/web-components/switch/DayAndNightSwitch.vue'
import GlitchEffectText from '@/plugins/web-components/text/GlitchEffectText.vue'
import LeapingPlaceholder from '@/plugins/web-components/input/LeapingPlaceholder.vue'

export default {
  props: {
  },
  components: {
    DayAndNightSwitch,
    GlitchEffectText,
    LeapingPlaceholder,
  },
  setup() {
    const leapingPlaceholderText = ref('')
    return {
      leapingPlaceholderText,
    }
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

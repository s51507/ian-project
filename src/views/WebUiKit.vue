<template>
  <div :class="$style.main">
    <div :class="$style.component">
      <div :class="$style.name">DayAndNightSwitch <a href="https://uiverse.io/Galahhad/strong-squid-82" target="_blank">https://uiverse.io/Galahhad/strong-squid-82</a></div>
      <DayAndNightSwitch />
    </div>
    <div :class="$style.component">
      <div :class="$style.name">SmileSwitch <a href="https://uiverse.io/Shoh2008/average-monkey-56" target="_blank">https://uiverse.io/Shoh2008/average-monkey-56</a></div>
      <SmileSwitch v-model="smileSwitchValue" width="100" />
      <div>{{ smileSwitchValue }}</div>
    </div>
    <div :class="$style.component">
      <div :class="$style.name">PowerSwitch <a href="https://uiverse.io/vinodjangid07/quick-moth-22" target="_blank">https://uiverse.io/vinodjangid07/quick-moth-22</a></div>
      <PowerSwitch v-model="powerSwitchValue" size="100" />
      <div>{{ powerSwitchValue }}</div>
    </div>
    <div :class="$style.component">
      <div :class="$style.name">GlitchEffectText <a href="https://uiverse.io/andrew-demchenk0/silent-earwig-10" target="_blank">https://uiverse.io/andrew-demchenk0/silent-earwig-10</a></div>
      <GlitchEffectText text="Loading..................................." width="200px" />
      <GlitchEffectText text="Loading..................................." width="200px" beforeColor="#FF8B00" afterColor="#57E500" />
    </div>
    <div :class="$style.component">
      <div :class="$style.name">LeapingPlaceholder <a href="https://uiverse.io/foxyyyyyyyyyyyyy/stupid-firefox-22" target="_blank">https://uiverse.io/andrew-demchenk0/silent-earwig-10</a></div>
      <LeapingPlaceholder v-model="leapingPlaceholderText" placeholder="請輸入帳號" startFromEnd />
      <div> {{ leapingPlaceholderText }}</div>
    </div>
    <div :class="$style.component">
      <div :class="$style.name">RippleCircle <a href="https://uiverse.io/Codecite/witty-falcon-85" target="_blank">https://uiverse.io/Codecite/witty-falcon-85</a></div>
      <RippleCircle count="4" />
    </div>
  </div>
</template>
<script>
// 一般狀態
import { ref } from 'vue'
// import { UPDATE_IS_DARK } from '@/stores/constant'
// import { storeToRefs } from 'pinia'
// import useGlobalStore from '@/stores/global'

import DayAndNightSwitch from '@/plugins/web-components/switch/DayAndNightSwitch.vue'
import SmileSwitch from '@/plugins/web-components/switch/SmileSwitch.vue'
import PowerSwitch from '@/plugins/web-components/switch/PowerSwitch.vue'

import GlitchEffectText from '@/plugins/web-components/text/GlitchEffectText.vue'

import LeapingPlaceholder from '@/plugins/web-components/input/LeapingPlaceholder.vue'

import RippleCircle from '@/plugins/web-components/loading/RippleCircle.vue'

export default {
  props: {
  },
  components: {
    DayAndNightSwitch,
    SmileSwitch,
    PowerSwitch,
    GlitchEffectText,
    LeapingPlaceholder,
    RippleCircle,
  },
  setup() {
    const leapingPlaceholderText = ref('')
    const smileSwitchValue = ref(false)
    const powerSwitchValue = ref(false)

    return {
      leapingPlaceholderText,
      smileSwitchValue,
      powerSwitchValue,
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

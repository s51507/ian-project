import Vue from 'vue'
import IcBtn from './ic-btn'
import IcButtonSelect from './ic-button-select'
import IcTabs from './ic-tabs'
import IcTab from './ic-tab'
import IcMenu from './ic-menu'
import IcMenuBtn from './ic-menu-button'
import IcDialog from './ic-dialog.vue'
import IcInputNumPassword from './ic-input-num-password'
import IcTooltip from './ic-tooltip'

const Components = {
  IcBtn,
  IcButtonSelect,
  IcTabs,
  IcTab,
  IcMenu,
  IcMenuBtn,
  IcTooltip,
  IcDialog,
  IcInputNumPassword,
}

Object.entries(Components).map(([name, component]) => {
  Vue.component(name, component)
})

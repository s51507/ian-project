import { defineStore } from "pinia"
import * as types from './constant'

import ColorsGenerator from '@/theme/colorsGenerator'
import themeColor from '@/theme/4C9EEA.js'


export default defineStore({
  id: 'global',
  state: () => ({
    dark: false,
  }),
  getters: {
    isDark: (state) => state.dark,
  },
  actions: {
    [types.UPDATE_IS_DARK](bool) {
      this.dark = bool
      this[types.UPDATE_THEME]()
    },
    [types.UPDATE_THEME]() {
      const theme = this.isDark ? themeColor.dark : themeColor.light
      ColorsGenerator(theme)
      window.__vue__.config.globalProperties.$colors = theme
    },
  },
})

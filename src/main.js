import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ColorsGenerator from '@/theme/colorsGenerator'
import themeColor from '@/theme/4C9EEA.js'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import IanComponents from '@/plugins/ian-components/index.js'
import Ripple from '@/utils/ripple.js'

const app = createApp(App)

window.__vue__ = app

const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = isDark ? themeColor.dark : themeColor.light
ColorsGenerator(theme)
app.config.globalProperties.$colors = theme

app.use(createPinia())
app.use(router)

app.directive('ripple', Ripple)

Object.entries(IanComponents).map(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')

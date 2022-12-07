import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ColorsGenerator from '@theme/colorsGenerator'
import themeColor from '@theme/4C9EEA.js'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

window.__vue__ = app

const theme = themeColor.light
ColorsGenerator(theme)
app.config.globalProperties.$colors = theme

app.use(createPinia())
app.use(router)

app.mount('#app')

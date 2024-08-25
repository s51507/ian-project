import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    { path: '/icUiKit', name: 'icUiKit', component: () => import('@/views/IcUiKit.vue') },
    { path: '/webUiKit', name: 'webUiKit', component: () => import('@/views/WebUiKit.vue') },
    { path: '/test', name: 'test', component: () => import('@/views/TestPage.vue') },
    { path: '/nothing', name: 'nothing', component: () => import('@/views/NothingPage.vue') },
    { path: '/snake', name: 'snake', component: () => import('@/views/GreedySnake.vue') },
    { path: '/workTest', name: 'workTest', component: () => import('@/views/WorkTest/index.vue'), meta: { noShowHeader: true } },
  ]
})

export default router

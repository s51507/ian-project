<template>
  <header>
    <img alt="Vue logo" :class="$style.logo" src="@/assets/logo.svg" width="125" height="125" />

    <div :class="$style.wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/icUiKit">IcUiKit</RouterLink>
        <RouterLink to="/webUiKit">WebUiKit</RouterLink>
        <RouterLink to="/test">Test</RouterLink>
        <RouterLink to="/nothing">Nothing</RouterLink>
        <RouterLink to="/snake">貪吃蛇</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { UPDATE_IS_DARK } from '@/stores/constant'
import useGlobalStore from '@/stores/global'
import HelloWorld from './components/HelloWorld.vue'

export default {
  cpmponents: {
    RouterLink,
    RouterView,
    HelloWorld,
  },
  setup() {
    const globalStore = useGlobalStore()
    return {
      globalStore,
    }
  },
  methods: {
    updateIsDark(bool) {
      useGlobalStore()[UPDATE_IS_DARK](bool)
    }
  },
  mounted() {
    // init dark mode
    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
    this.updateIsDark(themeMedia.matches)
    // 監聽瀏覽器dark mode變化
    themeMedia.addEventListener('change', (e) => {
      this.updateIsDark(e.matches)
    })
  }
}
</script>

<style lang="scss" module>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

// @media (min-width: 1024px) {
//   header {
//     display: flex;
//     place-items: center;
//     padding-right: calc(var(--section-gap) / 2);
//   }

//   .logo {
//     margin: 0 2rem 0 0;
//   }

//   header .wrapper {
//     display: flex;
//     place-items: flex-start;
//     flex-wrap: wrap;
//   }

//   nav {
//     text-align: left;
//     margin-left: -1rem;
//     font-size: 1rem;

//     padding: 1rem 0;
//     margin-top: 1rem;
//   }
// }
</style>

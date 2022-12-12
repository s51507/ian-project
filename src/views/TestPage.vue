<template>
  <div :class="$style.main">
    <div>state {{ state.count }} {{ state.double }}</div>
    <div>three {{ three }}</div>
    <div>refnum {{ refnum }}</div>
    <IcBtn @click="increment">increment click me!</IcBtn>
    <div>color {{ $colors.primary }}</div>
  </div>
</template>
<script>
// 一般狀態
import { ref, reactive, computed, watchEffect, watch, getCurrentInstance } from 'vue'

// 生命週期
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'
export default {
  props: {
    value: String
  },
  setup(props, context) {
    const  { proxy } = getCurrentInstance()
    // 要這樣才能拿到vue2的this
    console.log(proxy.$colors)

    // emit在這
    console.log(context.emit)

    const state = reactive({
      count: 1,
      //計算屬性computed的使用更靈活了
      double: computed(() => state.count * 2),
    })

    //computed也可以單獨拿出來使用
    const three = computed(() => state.count * 3)

    //ref跟reactive作用一樣都是用來雙向繫結的，ref的顆粒度更小（後面詳細對比）
    const refnum = ref()
    //這裡的watchEffect只要裡面的變數發生了改變就會執行,並且第一次渲染會立即執行,沒有變化前後返回引數，無法監聽整個reactive
    watchEffect(() => {
      refnum.value = state.count
      console.log(state, "watchEffect")
    })

    //watch裡第一個引數是監聽需要的變數，第二個是執行的回撥函式，
    watch(refnum,(a,b)=>{
      console.log(a,b,'watch,a,b')
    })

    //所有的方法裡再也不需要用this了，這是很爽的
    function increment() {
      state.count++
    }

    // 生命週期
    console.log("setup")
    onBeforeMount(() => { console.log("onBeforeMount") })
    onMounted(() => { console.log("onMounted") })
    onBeforeUpdate(() => { console.log("onBeforeUpdate") })
    onUpdated(() => { console.log("onUpdated") })
    onBeforeUnmount(() => { console.log("onBeforeUnmount") })
    onUnmounted(() => { console.log("onUnmounted") })

    //組中模板中需要的變數，都要通過return給暴露出去，就像當初data({return { } }) 是一樣的
    return {
      state,
      increment,
      three,
      refnum
    }
  },
  // 生命週期也可寫在外面
  beforeMount() {
    console.log('outSide beforeMount')
  },
  mounted() {
    console.log('outSide mounted')
  },
}
</script>

<style lang="scss" module>
.main {
  background: black;
}
</style>

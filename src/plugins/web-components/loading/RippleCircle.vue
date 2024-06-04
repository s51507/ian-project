<!-- https://uiverse.io/Codecite/witty-falcon-85 -->
<template>
  <div class="ripple-circle">
    <div
      v-for="n in circleCount"
      :key="n"
      :style="{ animationDelay: `-${(1 / circleCount) * n}s` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: [String, Number],
      default: 2
    },
  },
  setup() {
    return {
    }
  },
  computed: {
    circleCount() {
      return isNaN(this.count) ? 2 : Number(this.count)
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.ripple-circle {
  position: relative;
  width: 80px;
  height: 80px;
}

.ripple-circle div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: ripple-circle 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

// .ripple-circle div:nth-child(2) {
//   animation-delay: -0.5s;
// }

@keyframes ripple-circle {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>

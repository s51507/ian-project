<!-- https://uiverse.io/andrew-demchenk0/silent-earwig-10 -->
<template>
  <div class="glitch_main" :style="mainStyle">
    <div :data-glitch="text" class="glitch">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Loading...'
    },
    width: {
      type: [String, Number],
      default: 'auto',
    },
    fontColor: {
      type: String,
      default: '#FFFFFF'
    },
    beforeColor: {
      type: String,
      default: '#8B00FF'
    },
    afterColor: {
      type: String,
      default: '#00E571'
    },
  },
  setup() {
    return {
    }
  },
  computed: {
    mainStyle() {
      return {
        width: isNaN(this.width) ? this.width : `${this.width}px`,
        '--glitchFontColor': this.fontColor,
        '--glitchBeforeColor': this.beforeColor,
        '--glitchAfterColor': this.afterColor,
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.glitch {
  position: relative;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--glitchFontColor);
  letter-spacing: 5px;
  z-index: 1;
  animation: shift 1s ease-in-out infinite alternate;
}

.glitch:before,
.glitch:after {
  display: block;
  content: attr(data-glitch);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
}

.glitch:before {
  animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  color: var(--glitchBeforeColor);
  z-index: -1;
}

.glitch:after {
  animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
  color: var(--glitchAfterColor);
  z-index: -2;
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(-3px, 3px);
  }

  40% {
    transform: translate(-3px, -3px);
  }

  60% {
    transform: translate(3px, 3px);
  }

  80% {
    transform: translate(3px, -3px);
  }

  to {
    transform: translate(0);
  }
}

@keyframes shift {
  0%, 40%, 44%, 58%, 61%, 65%, 69%, 73%, 100% {
    transform: skewX(0deg);
  }

  41% {
    transform: skewX(10deg);
  }

  42% {
    transform: skewX(-10deg);
  }

  59% {
    transform: skewX(40deg) skewY(10deg);
  }

  60% {
    transform: skewX(-40deg) skewY(-10deg);
  }

  63% {
    transform: skewX(10deg) skewY(-5deg);
  }

  70% {
    transform: skewX(-50deg) skewY(-20deg);
  }

  71% {
    transform: skewX(10deg) skewY(-10deg);
  }
}
</style>

<template>
  <div>
    <div v-if="this.$slots.ctrlBtn" @click="() => handleDialogChanged(true)"><slot name="ctrlBtn" /></div>
      <Teleport to="#app">
        <transition name="fade">
          <div :class="['ic-dialog', contentClass]" v-if="dialog" :style="genStyle">
            <div class="ic-dialog-mask" @click="maskCkick"></div>
            <div class="ic-dialog-main" ref="main">
              <div class="ic-dialog-main__open-btn"> <slot /> </div>
              <div class="ic-dialog-main__title-container" :style="{width: titleWidth}">
                <div v-if="title" class="ic-dialog-main__title" :style="titleStyle">
                  <div>{{ title }}</div>
                  <slot name="title"/>
                </div>
                <!-- <svgicon v-if="close" name="close" class="ic-dialog-main__close-btn" :color="closeColor" :style="iconStyle" @click="handleDialogChanged(false)"/> -->
              </div>
              <div v-if="title" class="ic-dialog-main__title__block" />

              <div ref="text" :style="contentStyle"> <slot name="content" /> </div>

              <div v-if="btns.length" class="ic-dialog-main__btns">
                <IcBtn
                  v-for="(btn, idx) in btns"
                  :key="idx"
                  :class="[ 'ic-dialog__btn', btnGrow ? 'ic-dialog__btn--grow' : '' ]"
                  :outlined="btn.outlined"
                  minWidth="unset"
                  @click="handleBtnClick(btn)"
                >
                  {{ btn.text }}
                </IcBtn>
              </div>

              <div class="ic-dialog-main__btnSlot" v-else-if="this.$slots.btns">
                <slot name="btns" />
              </div>

              <div class="ic-dialog-main__footer">
                <slot name="footer" />
              </div>

            </div>
          </div>
        </transition>
      </Teleport>
  </div>
</template>

<script>
import IcBtn from './ic-btn.vue'
export default {
  components: {
    IcBtn,
  },
  props: {
    modelValue: Boolean,
    title: String,
    close: Boolean,
    large: Boolean,
    contentClass: [Array, String],
    fullContent: Boolean,
    titleColor: String,
    persistentOnBtn: Boolean,
    btnGrow: Boolean,
    outsideClose: Boolean,
    width: {
      type: [String, Number],
      default: 500
    },
    maxWidth: {
      type: [String, Number],
      default: '74vw'
    },
    closeColor: {
      type: String,
      default: 'white'
    },
    btns: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: [String, Number],
      default: 100
    }
  },
  data() {
    return {
      dialog: false,
      titleWidth: '0px',
      animationActive: null,
    }
  },
  computed: {
    mainClass() {
      const cls = [
        'ic-dialog',
        { 'ic-dialog--show': this.dialog }
      ]
      return cls
    },
    genStyle() {
      return {
        '--dialogZIndex': this.zIndex,
        '--dialogWidth': isNaN(this.width) ? this.width : `${this.width}px`,
        '--dialogMaxWidth': isNaN(this.maxWidth) ? this.maxWidth : `${this.maxWidth}px`,
      }
    },
    titleStyle() {

      return {
        ...(this.large && { fontSize: '150%' }),
        ...(this.titleColor && { color: this.titleColor }),
        background: this.$colors.primary,
      }
    },
    iconStyle() {
      return {
        ...(!this.title && {
          fontSize: '250%',
          right: '-30px',
          top: '-30px'
        })
      }
    },
    contentStyle() {
      return {
        ...(this.fullContent && { padding: 0 })
      }
    }
  },
  watch: {
    modelValue() {
      this.dialog = this.modelValue
    },
  },
  methods: {
    maskCkick() {
      if (this.outsideClose) return this.handleDialogChanged(false)
      if (this.animationActive) return
      this.$refs.main.classList.add('ic-dialog-main__animation')
      this.animationActive = setTimeout(() => {
        this.$refs.main.classList.remove('ic-dialog-main__animation')
        this.animationActive = null
      }, 100)
    },
    handleDialogChanged(val) {
      this.dialog = val
      this.$emit('update:modelValue', this.dialog)
    },
    handleBtnClick(btn) {
      if (!this.persistentOnBtn) this.handleDialogChanged(false)
      if (btn.action) btn.action()
    }
  },
  mounted() {
    this.dialog = this.modelValue
  },
  updated() {
    this.$nextTick(() => {
      if (this.$refs.text) this.titleWidth = `${this.$refs.text.offsetWidth}px`
    })
  },
}
</script>
<style lang="scss">
.ic-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: -webkit-fill-available;
  z-index: var(--dialogZIndex);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ic-dialog-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlayTransparentPrimary);
}
.ic-dialog-main {
  position: relative;
  padding: 8px;
  border-radius: 5px;
  margin-top: var(--igDialogTop);
  background: var(--bgPrimary);
  width: var(--dialogWidth);
  max-width: var(--dialogMaxWidth);

  &__animation {
    animation-name: igDialogMaskClickAnimation;
    animation-duration: 0.1s;
    animation-iteration-count: 1;
  }

  &__open-btn {
    cursor: pointer;
    user-select: none;
  }
  &__close-btn {
    height: 30px;
    width: 30px;
    position: absolute !important;
    right: 5px;
    top: 5px;
    cursor: pointer;
    user-select: none;
  }
  &__content {
    overflow-x: hidden;
  }
  &__title-container {
    position: fixed;
    z-index: var(--z-colored-dialog--title-container);
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 120%;
    font-weight: 500;
    color: var(--textWhite);
    height: 50px;
    border-radius: 5px 5px 0 0;
    &__block {
      height: 50px;

    }
  }
  &__btns {
    padding: 7px 0;
    display: flex;
    width: 100%;
    justify-content: center;
    & > :not(:last-child) {
      margin-right: 8px;
    }
  }
  &__btn {
    padding: 0;
    min-width: 125px;
    font-size: 120%;
    height: 40px;
    margin: 0;
    border-radius: 5px;
    &--grow {
      flex: 1;
    }
    &:not(:first-of-type) {
      margin-left: 15px;
    }
  }
  &__btnSlot {
    padding: 8px 16px;
  }
  &__footer {
    transform: translateY(-1px);
    background-color: var(--bgPrimary);
    border-radius: 5px;
  }
}

@keyframes igDialogMaskClickAnimation {
  0% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1.0);
  }
}

.bounce-enter-active {
  animation: ic-dialog-bounce-in .3s;
}
.bounce-leave-active {
  animation: ic-dialog-bounce-in .3s reverse;
}
@keyframes ic-dialog-bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>

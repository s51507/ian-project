<!-- https://uiverse.io/Shoh2008/average-monkey-56 -->
<template>
  <div class="smile-swich-main" :style="mainStyle">
    <div class="smile-swich-check" @click.prevent="handleSwitchClick">
      <input :checked="value" id="smile-switch-input" type="checkbox">
      <label for="smile-switch-input" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
    },
    width: {
      type: [String, Number],
      default: '40px',
    }
  },
  setup(props) {
    const value = ref(props.modelValue)
    return {
      value,
    }
  },
  watch: {
    modelValue() {
      this.value = this.modelValue
    },
    value() {
      this.$emit('update:modelValue', this.value)
    }
  },
  computed: {
    mainStyle() {
      return {
        '--size': isNaN(this.width) ? this.width : `${this.width}px`,
      }
    },
  },
  methods: {
    handleSwitchClick() {
      this.value = !this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.smile-swich-main .smile-swich-check {
  position: relative;
  background: linear-gradient(90deg, #f19af3, #f099b5);
  line-height: 0;
  perspective: 400px;
  font-size: var(--size);
}

.smile-swich-main .smile-swich-check input[type="checkbox"],
  .smile-swich-main .smile-swich-check label,
  .smile-swich-main .smile-swich-check label::before,
  .smile-swich-main .smile-swich-check label::after,
  .smile-swich-main .smile-swich-check {
  appearance: none;
  display: inline-block;
  border-radius: var(--size);
  border: 0;
  transition: .35s ease-in-out;
  box-sizing: border-box;
  cursor: pointer;
}

.smile-swich-main .smile-swich-check label {
  width: calc(2.2 * var(--size));
  height: var(--size);
  background: #d7d7d7;
  overflow: hidden;
}

.smile-swich-main .smile-swich-check input[type="checkbox"] {
  position: absolute;
  z-index: 1;
  width: calc(.8 * var(--size));
  height: calc(.8 * var(--size));
  top: calc(.1 * var(--size));
  left: calc(.1 * var(--size));
  background: linear-gradient(45deg, #dedede, #ffffff);
  box-shadow: 0 6px 7px rgba(0,0,0,0.3);
  outline: none;
  margin: 0;
}

.smile-swich-main .smile-swich-check input[type="checkbox"]:checked {
  left: calc(1.3 * var(--size));
}

.smile-swich-main .smile-swich-check input[type="checkbox"]:checked + label {
  background: transparent;
}

.smile-swich-main .smile-swich-check label::before,
  .smile-swich-main .smile-swich-check label::after {
  content: "· ·";
  position: absolute;
  overflow: hidden;
  left: calc(.15 * var(--size));
  top: calc(.5 * var(--size));
  height: var(--size);
  letter-spacing: calc(-0.04 * var(--size));
  color: #9b9b9b;
  font-family: "Times New Roman", serif;
  z-index: 2;
  font-size: calc(.6 * var(--size));
  border-radius: 0;
  transform-origin: 0 0 calc(-0.5 * var(--size));
  backface-visibility: hidden;
}

.smile-swich-main .smile-swich-check label::after {
  content: "●";
  top: calc(.65 * var(--size));
  left: calc(.2 * var(--size));
  height: calc(.1 * var(--size));
  width: calc(.35 * var(--size));
  font-size: calc(.2 * var(--size));
  transform-origin: 0 0 calc(-0.4 * var(--size));
}

.smile-swich-main .smile-swich-check input[type="checkbox"]:checked + label::before,
  .smile-swich-main .smile-swich-check input[type="checkbox"]:checked + label::after {
  left: calc(1.55 * var(--size));
  top: calc(.4 * var(--size));
  line-height: calc(.1 * var(--size));
  transform: rotateY(360deg);
}

.smile-swich-main .smile-swich-check input[type="checkbox"]:checked + label::after {
  height: calc(.16 * var(--size));
  top: calc(.55 * var(--size));
  left: calc(1.6 * var(--size));
  font-size: calc(.6 * var(--size));
  line-height: 0;
}
</style>

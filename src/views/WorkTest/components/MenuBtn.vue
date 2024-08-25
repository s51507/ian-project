<!-- https://uiverse.io/Shoh2008/average-monkey-56 -->
<template>
  <div :style="mainStyle">
    <input type="checkbox" id="checkbox" :checked="value">
    <label for="checkbox" class="toggle" @click.prevent="handleSwitchClick">
        <div class="bars" id="bar1"></div>
        <div class="bars" id="bar2"></div>
        <div class="bars" id="bar3"></div>
    </label>
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
#checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: var(--size);
  height: var(--size);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition-duration: .3s;
}

.bars {
  width: 100%;
  height: 4px;
  background-color: rgb(76, 189, 151);
  border-radius: 5px;
  transition-duration: .3s;
}

#checkbox:checked + .toggle .bars {
  margin-left: 13px;
}

#checkbox:checked + .toggle #bar2 {
  transform: rotate(135deg);
  margin-left: 0;
  transform-origin: center;
  transition-duration: .3s;
}

#checkbox:checked + .toggle #bar1 {
  transform: rotate(45deg);
  transition-duration: .3s;
  transform-origin: left center;
}

#checkbox:checked + .toggle #bar3 {
  transform: rotate(-45deg);
  transition-duration: .3s;
  transform-origin: left center;
}

</style>

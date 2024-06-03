<!-- https://uiverse.io/foxyyyyyyyyyyyyy/stupid-firefox-22 -->
<template>
  <div class="leaping-placeholder_main">
    <input v-model="value" required="" type="value">
    <label>
        <span
          v-for="(item, idx) in splitPlaceholder"
          :key="idx"
          :style="{ transitionDelay: `${(startFromEnd ? splitPlaceholder.length - idx + 1 : idx) * 50}ms` }"
        >{{ item }}</span>
    </label>
</div>
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
    startFromEnd: {
      type: Boolean,
      default: false
    },
  },
  setup() {
    const value = ref('')
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
    splitPlaceholder() {
      return this.placeholder.split('')
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.leaping-placeholder_main {
  position: relative;
  margin: 20px 0 40px;
  width: 190px;
}

.leaping-placeholder_main input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #fff;
}

.leaping-placeholder_main input:focus,
.leaping-placeholder_main input:valid {
  outline: 0;
  border-bottom-color: lightblue;
}

.leaping-placeholder_main label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.leaping-placeholder_main label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: #fff;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.leaping-placeholder_main input:focus+label span,
.leaping-placeholder_main input:valid+label span {
  color: lightblue;
  transform: translateY(-30px);
}
</style>

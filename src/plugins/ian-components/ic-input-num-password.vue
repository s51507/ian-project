<template>
  <div class="input-num-password">
    <div class="flex-layout-row outter">
      <div class="field-title flex-layout-row">{{title}}</div>
      <div class="flex-layout-row numbers">
        <template v-for="i in size" :key="i">
          <input type="tel" ref="Input" @keyup="handleInput(i-1, $event)" maxlength="1" @blur="handleBlur" />
        </template>
      </div>
    </div>
    <div class="error-msg">{{errorMsg && `* ${errorMsg}`}}</div>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    value: String,
    hint: String,
    rule: {
      type: Array,
      default: () => []
    },
    size: Number,
  },
  data() {
    return {
      errorMsg: '',
    }
  },
  computed: {
    isPassword() {
      return this.type === 'password'
    },
  },
  methods: {
    handleInput(i, { key, keyCode }) {
      if (keyCode === 8) {
        this.$refs.Input[i].value = ''
        this.$refs.Input[i - 1 >= 0 ? i - 1 : i].focus()
      }
      if (key.match(/^[0-9]/)) {
        this.$refs.Input[i].value = this.$refs.Input[i].value || key
        if (i + 1 < this.size) {
          this.$refs.Input[i + 1].focus()
        }
      }
      this.$emit('input', this.$refs.Input.map(el => el.value).join(''))
      this.errorMsg = ''
    },
    handleBlur() {
      this.$nextTick(() => {
        for (let el of this.$refs.Input) {
          if (document.activeElement === el) {
            this.errorMsg = ''
            return ''
          }
        }
        this.validate(this.value)
      })
    },
    validate(value) {
      value = value === undefined ? this.value : value
      for (let validator of this.rule) {
        let result = validator(value)
        if (result !== true) {
          this.errorMsg = result
          return result
        }
      }
      this.errorMsg = ''
      return true
    },
  },
}
</script>

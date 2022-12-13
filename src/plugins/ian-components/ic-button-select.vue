<template>
  <div
    :style="mainStyle"
    :class="$style.main"
  >
    <div
      v-for="(col, idx) in sliceArray(buttons, buttonCount)"
      :key="idx"
      :class="$style.flex"
    >
      <IcBtn
        v-for="button in col"
        :key="button.value"
        :class="$style.button"
        :color="showButtonColor(button)"
        :style="buttonStyle(button)"
        :disabled="button.disabled"
        @click="buttonOnChange(button)"
        :ripple="{ class: `${ripple}--text` }"
        depressed
      >
        <span :style="showFontColor(button)"> {{ showFontText(button) }} </span>
      </IcBtn>
    </div>
  </div>
</template>

<script>
import IcBtn from './ic-btn.vue'

export default {
  components: {
    IcBtn,
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    buttons: {
      type: Array,
      require: true,
    },
    block: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
    },
    buttonHeight: {
      type: String,
      default: '40px'
    },
    buttonWidth: {
      type: String,
      default: '60px'
    },
    buttonCount: {
      type: Number,
      default: 4
    },
    buttonMargin: {
      type: String,
      default: '5px'
    },
    buttonColor: {
      type: String,
      default: 'shite'
    },
    buttonActive: {
      type: String,
      default: 'primary'
    },
    borderStyle: {
      type: String,
    },
    fontSize: {
      type: String,
      default: '16px'
    },
    fontColor: {
      type: String,
    },
    fontActive: {
      type: String,
    },
    border: {
      type: Boolean,
      default: false
    },
    borderBackground: {
      type: String,
      default: '#ffffff'
    },
    radius: {
      type: String,
      default: '0'
    },
    ripple: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: this.value,
    }
  },
  watch: {
    active() {
      this.$emit('update:modelValue', this.active)
    },
    value() {
      this.active = this.value
    }
  },
  computed: {
    mainStyle() {
      const obj = {}
      if (this.block) obj.width = '100%'
      if (this.bgColor) obj.backgroundColor = this.bgColor
      return obj
    },
    fontStyle() {
      const obj = {}
      if (this.fontColor) obj.color = this.fontColor
      else obj.color = this.$colors.lightText
      obj.fontSize = this.fontSize
      return obj
    },
    fontActiveStyle() {
      const obj = {}
      if (this.fontActive) obj.color = this.fontActive
      obj.fontSize = this.fontSize
      return obj
    },
  },
  methods: {
    buttonOnChange(button) {
      this.active = button.value
      if (button.action) return button.action()
    },
    sliceArray(array, size) {
      const newArray = []
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        let start = i * size
        let end = start + size
        newArray.push(array.slice(start, end))
        if (newArray[i].length < size) {
          for (let k = newArray[i].length; k < size; k++) {
            newArray[i].push({})
          }
        }
      }
      return newArray
    },
    buttonStyle(button) {
      const obj = {}
      obj.width = this.isCn ? this.buttonWidth : '100px'
      obj.height = this.buttonHeight
      obj.borderRadius = this.radius
      obj.marginLeft = this.buttonMargin
      obj.marginRight = this.buttonMargin
      obj.backgroundColor = (this.active === button.value) ? '' : this.$colors.bgSecondary

      if (this.borderStyle) obj.border = this.borderStyle
      if (this.border) {
        if (this.active === button.value) {
          obj.border = `1px solid ${this.fontActive}`
          obj.backgroundColor = this.borderBackground
        } else {
          obj.border = `1px solid ${this.fontColor}`
          obj.backgroundColor = this.$colors.bgPrimary
        }
      }
      if (!button.value) {
        obj.height = 0
        obj.border = 'none'
        obj.boxShadow = 'none'
      }
      return obj
    },
    showButtonColor(button) {
      if (this.border) return ''
      if (this.active === button.value) return this.buttonActive
      return this.buttonColor
    },
    showFontColor(button) {
      if (this.active === button.value) return this.fontActiveStyle
      return this.fontStyle
    },
    showFontText(button) {
      return button.title || button.text || button.value
    }
  },
}
</script>

<style module>
.flex {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
}
.button {
  margin: 0 8px;
  width: 60px;
  border-radius: 2px;
  padding: 0 !important;
  min-width: 0 !important;
  box-sizing: border-box;
}
.button:first-child {
  margin-left: 0 !important;
}
.button:last-child {
  margin-right: 0 !important;
}
</style>

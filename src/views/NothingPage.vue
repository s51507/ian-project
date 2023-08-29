<template>
  <div :class="$style.main">
    <IcScrollHorizontal>
      <div :class="[$style.box, $style.green]" />
      <div :class="[$style.box, $style.blue]" />
      <div :class="[$style.box, $style.red]" />
      <div :class="[$style.box, $style.yellow]" />
      <div :class="[$style.box, $style.green]" />
      <div :class="[$style.box, $style.blue]" />
      <div :class="[$style.box, $style.red]" />
      <div :class="[$style.box, $style.yellow]" />
      <div :class="[$style.box, $style.green]" />
      <div :class="[$style.box, $style.blue]" />
      <div :class="[$style.box, $style.red]" />
      <div :class="[$style.box, $style.yellow]" />
    </IcScrollHorizontal>
  </div>
</template>
<script>
// import { ref, reactive } from 'vue'

export default {
  setup() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  },
  beforeUnmount() {
  },
}
</script>

<style lang="scss" module>
.main {
  background: black;
  .box {
    width: 300px;
    height: 1000px;
    &.green {
      background-color: green;
    }
    &.blue {
      background-color: navy;
    }
    &.red {
      background-color: red;
    }
    &.yellow {
      background-color: darkgoldenrod;
    }
  }
}
</style>

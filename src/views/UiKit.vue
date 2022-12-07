<template>
  <div :class="$style.main">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  props: {
    value: String
  },
  setup() {
    
  },
}
</script>

<style lang="scss" module>
.main {
  background: red;
}
</style>

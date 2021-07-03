<template>
  <section id="app">
    <router-view/>
  </section>
</template>

<style lang="scss">

  @import "assets/scss/style.scss";

</style>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted(){
    document.title = "Qbic panel"
  }
})
</script>
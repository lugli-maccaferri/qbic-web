<template>
  <section>
    <Navbar />
    <div class="content">
      <router-view />
    </div>
  </section>
</template>
<script lang="ts">
import Navbar from '@/components/ui/Navbar.vue';
import Vue from 'vue'
export default Vue.extend({
  components: { Navbar }
})
</script>
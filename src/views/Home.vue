<template>
  <section>
    <Navbar />
    <div class="content">
      <h1> Welcome, {{ $store.getters.user.username }} </h1>
      <h2> Client currently connected to {{ node_address }}</h2>
      <div class="flexbox justify-between">
        <div>
          <h3> Available Minecraft servers </h3>
          <div class="flexbox" style="margin-top: 20px;">
            <div v-for="server in servers" :key="server.id" @click="$router.push('/servers/' + server.id)" class="box adaptive padded rounded flexbox">
              {{ server.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Navbar from '@/components/ui/Navbar.vue';
import api, { handleError } from '@/lib/api';
export default Vue.extend({
  components: {
    Navbar
  },
  data(){
    return {
      node_address: `qbic.macca.cloud`, // todo: farlo dinamico
      servers: []
    }
  },
  async mounted(){
    
    try{

      this.servers = await api.servers.list();

    }catch(err){

      alert(handleError(err));

    }

  }
})
</script>
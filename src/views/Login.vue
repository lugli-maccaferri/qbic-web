<template>
	<section class="flexbox justify-center align-center centered">
		<div class="box medium">
			<h1 class="title">Login</h1>
			<form @submit.prevent="doLogin">
				<input type="text" placeholder="Username" v-model="username" />
                <input type="password" placeholder="Password" v-model="password" />
                <button> Enter </button>
			</form>
		</div>
	</section>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({

	data(){
		return {
			username: '',
			password: ''
		}
	},
	methods: {

		async doLogin(){		

			try{
				await this.$store.dispatch('login', { username: this.username, password: this.password });
			}catch(err){
				console.log(err);
				alert("nooooo");
			}

		}

	}

});
</script>

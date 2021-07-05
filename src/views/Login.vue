<template>
	<section class="full flexbox justify-center align-center centered">
		<div class="box medium">
			<h1 class="title">Login</h1>
			<form @submit.prevent="doLogin">
				<input type="text" placeholder="Username" v-model="username" />
                <input type="password" placeholder="Password" v-model="password" />
                <button> Enter </button>
				<p style="height: 20px">{{ message }}</p>
			</form>
		</div>
	</section>
</template>
<script lang="ts">
import { handleError } from "@/lib/api";
import Vue from "vue";
export default Vue.extend({

	data(){
		return {
			username: '',
			password: '',
			message: ''
		}
	},
	methods: {

		async doLogin(){		

			try{
				
				await this.$store.dispatch('login', { username: this.username, password: this.password });
				this.$router.push('/');

			}catch(err){
				
				this.message = handleError(err);
				
			}

		}

	}

});
</script>

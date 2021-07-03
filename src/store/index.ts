import Vue from "vue";
import Vuex from "vuex";
import api from "@/lib/api";
import { User } from "@/type";
import decode from "jwt-decode";

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        jwt: localStorage.getItem("jwt"),
        user: {} as User
    },
    mutations: {

        loginSuccess(state: any, obj: { data: User, token: string }){

            state.jwt = obj.token;
            state.user = obj.data;
            localStorage.setItem("jwt", obj.token);

        }

    },
    actions: {

        async login(context: any, data: { username: string, password: string }){

            try{

                const token = await api.auth.login(data.username, data.password);
                const decoded = decode(token);

                context.commit('loginSuccess', {
                    data: decoded as User,
                    token
                });
                return true;
            
            }catch(err){

                return Promise.reject(err);
                
            }

        }

    }

}); 

export default store;
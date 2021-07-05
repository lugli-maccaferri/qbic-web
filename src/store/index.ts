import Vue from "vue";
import Vuex from "vuex";
import api, { auth_client, client } from "@/lib/api";
import { User } from "@/types";
import decode from "jwt-decode";

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        jwt: localStorage.getItem("jwt"),
        user: JSON.parse(localStorage.getItem("user") || "{}") as User
    },
    getters: {
        jwt(state: any){ return state.jwt },
        user(state: any){ return state.user }
    },
    mutations: {

        loginSuccess(state: any, obj: { data: User, token: string }){

            state.jwt = obj.token;
            state.user = obj.data;
            localStorage.setItem("jwt", obj.token);
            localStorage.setItem("user", JSON.stringify(obj.data));

        }

    },
    actions: {

        async login(context: any, data: { username: string, password: string }){

            try{

                const token = await api.auth.login(data.username, data.password);
                const decoded = decode(token);
                client.defaults.headers["Authorization"] = `Bearer ${token}`;
                auth_client.defaults.headers["Authorization"] = `Bearer ${token}`;

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
<template>
    <div id="content">
        <h1>{{ server.name }}</h1>
        <div class="flexbox">
            <button @click="start" style="margin-right: 20px;"> Start {{ server.name }} </button>
            <button @click="stop" class="redded" style="margin-right: 20px;"> Stop {{ server.name }} </button>
        </div>
        <div style="margin-top: 20px;" class="flexbox justify-between">
            <div id="console" style="width: 80%;">
                <textarea v-model="console_output" class="box large greyed rounded" style="height: 60vh; width: 100%; max-width: 100%; min-width: 100%; max-height: 60vh; min-height: 60vh;">
                
                </textarea>
                <form class="flexbox justify-between" @submit.prevent="sendCommand">
                    <input type="text" placeholder="Send command" v-model="command"> <button style="margin-left: 30px;"> Send </button>
                </form>
            </div>
            <div class="box" style="flex: 1; margin-left: 30px;">
                <h2 style="margin-top: 0;"> Stats </h2>
                <ul>
                    <li> Online: {{ this.online ? 'yes' : 'no' }} </li>
                    <li> Version: {{ this.server_info.version }} </li>
                    <li> MOTD: {{ this.server_info.motd }} </li>
                    <li> Players: {{ this.server_info.online_players }}/{{this.server_info.max_players}} </li>
                    <li> Currently online: {{ this.server_info.players.join(", ") }} </li>
                    <li style="border: none">
                        <router-link :to="`/servers/${id}/files`"> Server files </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import api, { handleError } from '@/lib/api'
import { Server } from '@/types'
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{
            server: {} as Server,
            id: '',
            command: '',
            server_info: {
                motd: '',
                main_world: '',
                players: [],
                plugins: '',
                max_players: 0,
                version: ''
            },
            online: false,
            ws_auth: false,
            console_output: '',
            websocket: {} as WebSocket,
            responses: {
                '404': 'server not found or not started',
                '500': 'something bad happened',
                '200': 'successfully connected to the console stream'
            } as { [index: string]: string }
        }
    },
    methods: {
        async info(){

            try{

                const res = await api.servers.info(this.id);
                this.server_info = {...res};
                this.online = true;

            }catch(err){

                this.online = false;

            }

        },
        async stop(){

            try{

                await api.servers.stop(this.id);

            }catch(err){

                alert(handleError(err));
                
            }

        },
        async start(){

            try{
                await api.servers.start(this.id);
            }catch(err){
                alert(handleError(err));
            }

        },
        async sendCommand(){

            const response = await api.servers.sendCommand(this.id, this.command);
            this.console_output += response
            this.command = '';

        }
    },
    async mounted(){

        this.websocket = new WebSocket('wss://qbic.macca.cloud/console-stream');
        this.id = this.$route.params["id"];
        this.server = await api.servers.get(this.id);
        
        this.info();
        setInterval(this.info, 5000); // ping every 5000ms

            // websocket stuff
        this.websocket.onopen = () => {

            this.websocket.send(`hello:${this.$store.getters.jwt}`);
            setTimeout(() => this.websocket.send(`read:${this.id}`), 1000);

        }

        this.websocket.onmessage = async(msg) => {

            let response = (await api.ws.parseMessage(msg, this.ws_auth)).toString();

            if(this.ws_auth){
                    
                if(/\bRCON\b/.test(response)) return;

                if(Object.prototype.hasOwnProperty.call(this.responses, response))
                    this.console_output += this.responses[response] + "\n";
                else
                    this.console_output += response + "\n";
            }
            if(!this.ws_auth && response == "200") this.ws_auth = true;

        }
    }
})
</script>
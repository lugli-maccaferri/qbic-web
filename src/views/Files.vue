<template>
    <div id="content">
        <h1>{{ server.name }}'s files</h1>
        <nav>
            <a @click="reset" style="text-decoration: underline; cursor: pointer"> / </a>
            <a v-for="path in current_path" :key="path" @click="explore(path, true)" style="text-decoration: underline; cursor: pointer">
                {{ path }} /
            </a>
        </nav>
        <a @click="back" v-if="current_path.length > 0" style="display: inline-block; text-decoration: underline; cursor: pointer; margin-top: 20px; background: #1a1a1a; color: #fefefe; padding: 5px; border-radius: 5px;"> Back &lt; </a>
        <ul style="width: 100%" v-if="directory">
            <li v-for="file in files" :key="file" @click="explore(file)"> {{ file }} </li>
        </ul>
        <textarea v-if="!directory" v-model="content" class="box large greyed rounded" style="margin-top: 20px; width: 100%; max-width: 100%; min-width: 100%; max-height: 70vh; min-height: 70vh; overflow-y: auto;"> </textarea>
    </div>
</template>
<script lang="ts">
import api from '@/lib/api'
import { Server } from '@/types';
import Vue from 'vue'
export default Vue.extend({
    data(){

        return{
            server: {} as Server,
            files: [] as string[],
            content: '',
            current_path: [] as string[],
            id: this.$route.params.id,
            directory: true
        }

    },
    methods: {
        async back(){

            try{
                
                this.current_path.pop();
                if(!this.current_path.length) return this.reset();
                
                const response = await api.servers.navigate(this.id, this.current_path.join("/"));
                this.directory = response.is_directory;
                this.content = response.content;
                this.files = response.content;

            }catch(err){

                alert("error while browsing");

            }

        },
        async reset(){
            try{
                
                this.files = await api.servers.mainDirectory(this.id);
                this.directory = true;
                this.current_path = [];

            }catch(err){

                alert("error while browsing");

            }
        },
        async explore(file: string, reverse: boolean){

            try{
                
                if(file == this.current_path[this.current_path.length - 1]) return;

                const index = this.current_path.indexOf(file);
                console.log(index);
                

                if(reverse) console.log(this.current_path.splice(index + 1));
                else this.current_path.push(file);        
                
                if(!this.current_path.length) return this.reset();

                const response = await api.servers.navigate(this.id, this.current_path.join("/"));
                this.directory = response.is_directory;
                this.content = response.content;
                this.files = response.content;

            }catch(err){

                alert("error while browsing");

            }

        }
    },
    async mounted(){

        this.server = await api.servers.get(this.id);
        this.files = await api.servers.mainDirectory(this.id);

    }
})
</script>
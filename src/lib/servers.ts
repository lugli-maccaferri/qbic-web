import { client } from './api';

const self = {
    async navigate(id: string, path: string){

        try{
                
            const response = await client.get(`/server/files/${id}/${btoa(path)}`);
            return response.data;
        
        }catch(err){

            return Promise.reject(err);

        } 

    },
    async mainDirectory(id: string){

        try{
                
            const response = await client.get(`/server/files/${id}`);
            return response.data.content;
        
        }catch(err){

            return Promise.reject(err);

        } 

    },
    async info(id: string){
        try{

            const response = await client.get(`/server/info/${id}`);
            return response.data;
        
        }catch(err){

            return Promise.reject(err);

        }
    },
    async stop(id: string){
        try{

            const response = await client.post(`/server/stop/${id}`);
            return response.data;
        
        }catch(err){

            return Promise.reject(err);

        }
    },
    async start(id: string){
        try{

            const response = await client.post(`/server/start/${id}`);
            return response.data;
        
        }catch(err){

            return Promise.reject(err);

        }
    },
    async sendCommand(id: string, command: string){
        try{

            const response = await client.post(`/server/send-command/${id}`, { command });
            return response.data.command_response;
        
        }catch(err){

            return Promise.reject(err);

        }
    },
    async get(id: string){
        try{

            const response = await client.get(`/server/${id}`);
            return response.data.server;
        
        }catch(err){

            return Promise.reject(err);

        }
    },
    async list(){

        try{

            const response = await client.get('/server/list');

            return response.data.servers;
        
        }catch(err){

            return Promise.reject(err);

        }

    }

}

export default self;
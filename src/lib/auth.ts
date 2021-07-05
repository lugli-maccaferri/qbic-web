import { auth_client, client } from './api';

const self = {

    async validate(){
        
        try{

            const response = await client.get('/auth');
            return response.data;
        
        }catch(err){

            return Promise.reject(err);

        }

    },
    async login(username: string, password: string){

        try{

            const response = await auth_client.post('/auth/login', {
                username,
                password
            });

            return response.data.token;
        
        }catch(err){

            return Promise.reject(err);

        }

    }

}

export default self;
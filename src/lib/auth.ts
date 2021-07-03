import { auth_client } from './api';

const self = {

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
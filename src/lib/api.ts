import axios, { AxiosError } from 'axios';
import auth from './auth';
import servers from './servers';
import ws from './ws';

export const auth_client = axios.create({
    baseURL: 'https://authserver.macca.cloud',
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    }
})
export const client = axios.create({
    withCredentials: true,
    baseURL: 'https://qbic.macca.cloud',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    }
});

export const handleError = (err: AxiosError) => {

    switch(err.response?.status){

        case 400:
            return `Missing parameters (${err.response.data.parameters.join(", ")})`;
        case 401:
            return `Invalid credentials`
        case 500:
        default:
            return `Generic error (500/405)`;

    }

}


export default { auth, servers, ws }
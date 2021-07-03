import axios from 'axios';
import auth from './auth';

export const auth_client = axios.create({
    baseURL: 'https://authserver.macca.cloud'
})
export const client = axios.create({
    baseURL: 'https://qbic.macca.cloud'
})


export default { auth }
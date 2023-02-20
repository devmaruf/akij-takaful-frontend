import axios from 'axios';

import {Toaster} from "@/components/toaster";
import { getAuthToken } from './auth';

axios.defaults.baseURL = process.env.BASE_URL;

axios.interceptors.request.use((value) => {
    value.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }

    return value;
});

axios.interceptors.response.use(
    (response) => {
        return Promise.resolve(response.data);
    },
    (error) => {
        const responseLog = error.response;
        Toaster('error', responseLog?.data?.message);
        return Promise.reject(error);
    }
);

export default axios;

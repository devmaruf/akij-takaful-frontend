import axios from 'axios';

import {Toaster} from "@/components/toaster";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let responseLog = error.response;
        const { request, ...errorObject } = responseLog;
        Toaster('error', responseLog.data.message);
        return Promise.reject(error);
    }
);

export default axios;

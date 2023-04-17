import axios from 'axios';

import { Toaster } from "@/components/toaster";
import { getAuthToken, logout } from './auth';

axios.defaults.baseURL = process.env.BASE_URL;

export const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`
};

export const formFileHeaderConfig = {
    ...defaultHeaders,
    'Content-Type': 'multipart/form-data'
};

axios.interceptors.request.use((value) => {
    value.headers = {
        ...defaultHeaders,
        'Content-Type': 'application/json',
    }

    return value;
});

axios.interceptors.response.use(
    (response) => {
        return Promise.resolve(response.data);
    },
    (error) => {
        // Redirect to login page and logout, if unauthenticated response found.
        if (error?.response?.status === 401) {
            Toaster('error', 'Please login again to continue...');
            logout();
        } else {
            const responseLog = error.response;

            const logErrors = responseLog?.data?.errors ?? {};
            if (Object.keys(logErrors).length > 0) {
                let errorMessage = '';
                Object.keys(logErrors).forEach(errorKey => {
                    if (logErrors?.[errorKey]?.length > 0) {
                        logErrors?.[errorKey]?.forEach(error => {
                            errorMessage += error + '. ';
                        })
                    }
                });

                Toaster('error', errorMessage);
            } else {
                Toaster('error', responseLog?.data?.message);
            }

            return Promise.reject(error);
        }
    }
);

export default axios;

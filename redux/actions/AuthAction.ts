
import Axios from "axios";

import * as Types from "./../types/AuthTypes";
import { Toaster } from "@/components/toaster";
import {KEY_ACCESS_TOKEN, KEY_USER_DATA} from "@/utils/keys";

const BASE_URL = process.env.BASE_URL;

export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

export const handleLogin = (loginInput) => (dispatch: any) => {
    if (loginInput.email === "") {
        Toaster("error", "Email can't be blank!");
        return false;
    }
    if (loginInput.password === "") {
        Toaster("error", "Password can't be blank!");
        return false;
    }

    let responseData = {
        status: false,
        message: "",
        isLoading: true,
        userData: null,
        accessToken: ""
    };
    dispatch({ type: Types.SUBMIT_LOGIN, payload: responseData });

    Axios.post(`${BASE_URL}/login`, loginInput)
        .then(res => {
            if (res.status === 200) {
                responseData.status = true;
                responseData.isLoading = false;
                responseData.message = res.data.message;
                responseData.accessToken = res.data.data.access_token;
                responseData.userData = res.data.data.user;
                Toaster('success', responseData.message);
                localStorage.setItem(KEY_ACCESS_TOKEN, JSON.stringify(responseData.accessToken));
                localStorage.setItem(KEY_USER_DATA, JSON.stringify(responseData.userData));
                dispatch({ type: Types.SUBMIT_LOGIN, payload: responseData });
                window.location.href = '/';
            }
        }).catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.SUBMIT_LOGIN, payload: responseData })
            }
        });
}


export const getAuthData = () => {
    const getToken = localStorage.getItem(KEY_ACCESS_TOKEN);
    const getUserData = localStorage.getItem(KEY_USER_DATA);

    const authData = {
        accessToken: "",
        userData: null
    }

    if ((typeof getToken !== "undefined" && getToken !== null) && (typeof getUserData !== "undefined" && getUserData !== null)) {
        authData.accessToken = JSON.parse(getToken);
        authData.userData = JSON.parse(getUserData);
    }
    return authData;
}

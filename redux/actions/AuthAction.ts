import * as Types from "./../types/AuthTypes";
import Axios from "axios";
import { Toaster } from "@/components/toaster";

const BASE_URL = process.env.BASE_URL;

/**
 * 
 * @param name String
 * @param value Any
 * @returns data
 */
export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

/**
 * Login Action
 * @param loginInput Ex: email & password
 * @returns 
 */
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
                localStorage.setItem("access_token", JSON.stringify(responseData.accessToken));
                localStorage.setItem("user_data", JSON.stringify(responseData.userData));
                dispatch({ type: Types.SUBMIT_LOGIN, payload: responseData });
            }
        }).catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.SUBMIT_LOGIN, payload: responseData })
            }
        })
}


export const getAuthData = () => {
    const getToken = localStorage.getItem('access_token');
    const getUserData = localStorage.getItem('user_data');

    if(typeof getToken !== "undefined" && getToken !== null){
        const accessToken = JSON.parse(getToken);
        return accessToken;
    }
    if(typeof getUserData !== "undefined" && getUserData !== null){
        const userData = JSON.parse(getUserData);
        return userData;
    }
}
import * as Types from "../types/AuthTypes";
import { Toaster } from "@/components/toaster";
import { KEY_ACCESS_TOKEN, KEY_USER_DATA } from "@/utils/keys";
import axios from "@/utils/axios";

export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }

    dispatch({ type: Types.CHANGE_AUTH_INPUT_VALUE, payload: data });
};

export const handleLogin = (loginInput: { email: string; password: string; }) => (dispatch: any) => {
    if (loginInput.email === "") {
        Toaster("error", "Please give email.");
        return false;
    }
    if (loginInput.password === "") {
        Toaster("error", "Please give password.");
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

    axios.post(`/login`, loginInput)
        .then((res: any) => {
            responseData.status = true;
            responseData.isLoading = false;
            responseData.message = res.message;
            responseData.accessToken = res.data.access_token;
            responseData.userData = res.data.user;
            Toaster('success', responseData.message);
            localStorage.setItem(KEY_ACCESS_TOKEN, JSON.stringify(responseData.accessToken));
            localStorage.setItem(KEY_USER_DATA, JSON.stringify(responseData.userData));
            dispatch({ type: Types.SUBMIT_LOGIN, payload: responseData });
            window.location.href = '/';
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.SUBMIT_LOGIN, payload: responseData })
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
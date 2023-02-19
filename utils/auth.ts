import {KEY_ACCESS_TOKEN} from "@/utils/keys";

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN);

    return accessToken !== undefined && accessToken !== null;
}

export const logout = () => {
    localStorage.removeItem(KEY_ACCESS_TOKEN);
}

export const redirectToLogin = () => {
    if (typeof window !== undefined) {
        window.location.href='/login';
    }
}

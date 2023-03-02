import { IAuthReducer } from "../interfaces";
import * as Types from "./../types/AuthTypes";

const initialState: IAuthReducer = {
    isLoading: false,
    isSubmitting: false,
    loginData: null,
    loginInput: {
        email: "admin@example.com",
        password: "12345678",
    },
};

function AuthReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_AUTH_INPUT_VALUE:
            const loginInput = { ...state.loginInput };
            // @ts-ignore
            loginInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                loginInput,
            };

        case Types.SUBMIT_LOGIN:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    loginInput: initialState.loginInput
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        default:
            break;
    }
    return state;
}
export default AuthReducer;


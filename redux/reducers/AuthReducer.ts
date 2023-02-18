import { IAuthReducer } from "../interfaces";
import * as Types from "./../types/AuthTypes";

const initialState: IAuthReducer = {
    isLoading: false,
    isSubmitting: false,
    loginData: null,
    loginInput: {
        email: "",
        password: "",
    },

};


function AuthReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const loginInput = { ...state.loginInput };
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
        // case Types.GET_PROPOSAL_LIST:
        //     return {
        //         ...state,
        //         proposalsList: action.payload.data,
        //         paginationData: action.payload.paginationData,
        //         isLoading: action.payload.isLoading,
        //     };
        // case Types.GET_PROPOSAL_DETAILS:
        //     return {
        //         ...state,
        //         loadingDetails: action.payload.isLoading,
        //         proposalInput: action.payload.inputData,
        //         proposalDetails: action.payload.data,
        //     };
        // case Types.UPDATE_PROPOSAL:
        //     if (action.payload.status === true) {
        //         return {
        //             ...state,
        //             isSubmitting: action.payload.isLoading,
        //             proposalInput: initialState.proposalInput
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             isSubmitting: action.payload.isLoading,
        //         };
        //     }
        // case Types.DELETE_PROPOSAL:
        //     return {
        //         ...state,
        //         isDeleting: action.payload.isLoading,
        //     };
        default:
            break;
    }
    return state;
}
export default AuthReducer;


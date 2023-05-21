import * as Types from "@/redux/types/payment-type";
import { IPaymentReducer } from "@/redux/interfaces";

const initialState: IPaymentReducer = {
    isLoading: false,
    isSearching: false,
    isSubmitting: false,
    paymentList: [],
    paymentPaginationData: [],
    paymentInput: {
        proposal_no: '',
        proposal: null,
        payment_media: 'online',
        amount: 0,
        type: 'registration-payment',
    }
};

function paymentReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const paymentInput = { ...state.paymentInput };
            paymentInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                paymentInput,
            };
        case Types.SUBMIT_PAYMENT:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
            };

        case Types.GET_PAYMENT_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                paymentList: action.payload.data,
                paymentPaginationData: action.payload.paginationData,
            };

        case Types.SEARCH_PAYMENT_PROPOSAL:
            return {
                ...state,
                isSearching: action.payload.isLoading,
                paymentInput: {
                    ...state.paymentInput,
                    proposal: action.payload.data,
                    amount: action.payload?.data?.total_premium ?? 0
                },
            };

        default:
            break;
    }
    return state;
}
export default paymentReducer;


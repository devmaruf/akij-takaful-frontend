import * as Types from "@/redux/types/payment-type";
import { IPaymentReducer } from "@/redux/interfaces";

const initialState : IPaymentReducer = {
    isLoading: false,
    isSubmitting: false,
    paymentInput: {
        proposal_no: 'ATLI-230223-12',
        amount: 5000,
        type: 'registration-payment',
    }
};

function paymentReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.SUBMIT_PAYMENT:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
            };

        default:
            break;
    }
    return state;
}
export default paymentReducer;


import * as Types from "@/redux/types/payment-type";
import { IPaymentReducer } from "@/redux/interfaces";

const initialState : IPaymentReducer = {
    isLoading: false,
    isSubmitting: false,
    paymentInput: {
        proposal_no: '',
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

        default:
            break;
    }
    return state;
}
export default paymentReducer;


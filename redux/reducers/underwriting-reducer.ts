import * as Types from '../types/underwriting-type';

const initialState = {
    isLoading: false,
    isApproving: false,
    underwritingForm: {
        proposal_id: 0,
        status: 'pending',
        em_life: '',
        em_hi: '',
        em_ci: '',
        em_pdab: '',
        em_diab: '',
        total_em: '',
        total_premium: '',
        accepted_standard_rate_for: {
            ci: "0",
            diab: "0",
            hi: "0",
            pdab: "0",
        },
        types: []
    }
};

export default function UnderwritingReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_UNDERWRITING_INPUT:
            const underwritingForm = { ...state.underwritingForm };
            underwritingForm[action.payload.name] = action.payload.value;
            return {
                ...state,
                underwritingForm,
            };

        case Types.GET_UNDERWRITING_CONFIGURATIONS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                underwritingForm: action.payload.data,
            };

        case Types.SET_UNDERWRITING_CONFIGURATION_VALUE:
            return {
                ...state,
                underwritingForm: {
                    ...state.underwritingForm,
                    types: action.payload,
                }
            };

        case Types.SAVE_UNDERWRITING:
            return {
                ...state,
                isApproving: action.payload.isLoading
            };

        default:
            break;
    }
    return state;
}

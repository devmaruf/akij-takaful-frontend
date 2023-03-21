import * as Types from '../types/underwriting-type';

const initialState = {
    isLoading: false,
    configurations: [],
};

export default function UnderwritingReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.GET_UNDERWRITING_CONFIGURATIONS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                configurations: action.payload.data,
            };

        case Types.SET_UNDERWRITING_CONFIGURATION_VALUE:
            return {
                ...state,
                configurations: action.payload,
            };

        default:
            break;
    }
    return state;
}

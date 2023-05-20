import { IMedicalReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/medical-type";
import { generateDropdownList } from "@/utils/dropdown";

const initialState: IMedicalReducer = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    loadingDetails: false,
    medicalTestList: [],
    medicalTestPaginationData: [],
    medicalTestDetails: {
        id: 0,
        name: "",
        rates: [],
        modes: [],
        is_dps: 0,
        is_adb_enabled: 1,
        is_child_health: 0,
    },
    medicalTestInput: {
        name: '',
        min_age:0,
        max_age:0,
        min_amount:0,
        max_amount:0
    },
};

export default function MedicalReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_MEDICAL_TEST_INPUT:
            const medicalTestInput = { ...state.medicalTestInput };
            medicalTestInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                medicalTestInput,
            };
        case Types.SUBMIT_MEDICAL_TEST:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                medicalTestInput: action.payload.status ? initialState.medicalTestInput : state.medicalTestInput
            };
        case Types.GET_MEDICAL_TEST_LIST:
            return {
                ...state,
                medicalTestList: action.payload.data,
                medicalTestPaginationData: action.payload.medicalTestPaginationData,
                isLoading: action.payload.isLoading,
            };
        case Types.GET_MEDICAL_TEST_DETAILS:
            return {
                ...state,
                medicalTestDetails: action.payload.data,
                medicalTestInput: action.payload.data,
                loadingDetails: action.payload.isLoading,
            };
            case Types.UPDATE_MEDICAL_TEST:
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    medicalTestInput: action.payload.status ? initialState.medicalTestInput : state.medicalTestInput
                };
        case Types.DELETE_MEDICAL_TEST:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };

        default:
            break;
    }
    return state;
}

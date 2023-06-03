import * as Types from "@/redux/types/medical-type";
import { IMedicalReducer } from "../interfaces";

const initialState: IMedicalReducer = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    loadingDetails: false,
    medicalList: [],
    medicalTestList:[],
    medicalPaginationData: [],
    medicalDetails: {
        id: 0,
        status: "",
        proposal_no: '',
        extra_info_requirement: '',
        further_requirement: 0,
    },
    medicalInput: {
        id: 0,
        proposal_no: '',
        status: '',
        extra_info_requirement: '',
        further_requirement: 0
    },
};

export default function MedicalReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_MEDICAL_INPUT:
            const medicalInput = { ...state.medicalInput };
            medicalInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                medicalInput,
            };
        case Types.SUBMIT_MEDICAL:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                medicalInput: action.payload.status ? initialState.medicalInput : state.medicalInput
            };
        case Types.GET_MEDICAL_LIST:
            return {
                ...state,
                medicalList: action.payload.data,
                medicalPaginationData: action.payload.medicalPaginationData,
                isLoading: action.payload.isLoading,
            };
        case Types.GET_MEDICAL_TEST_LIST_BY_AGE:
            return {
                ...state,
                medicalTestList: action.payload.data,
                isLoading: action.payload.isLoading,
            };
        case Types.GET_MEDICAL_DETAILS:
            return {
                ...state,
                medicalDetails: action.payload.data,
                medicalInput: action.payload.data,
                loadingDetails: action.payload.isLoading,
            };
        case Types.UPDATE_MEDICAL:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                medicalInput: action.payload.status ? initialState.medicalInput : state.medicalInput
            };
        case Types.DELETE_MEDICAL:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };

        case Types.GET_MEDICAL_DETAILS:
            return {
                ...state,
                medicalDetails: action.payload.data,
                medicalInput: action.payload.data,
                loadingDetails: action.payload.isLoading,
            };

        default:
            break;
    }
    return state;
}

import * as Types from "@/redux/types/medical-type";
import { IMedicalReducer } from "../interfaces";

const initialState: IMedicalReducer = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    loadingDetails: false,
    showMedicalTestList:false,
    medicalList: [],
    medicalTestList: [],
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
    medicalFileInput:{
        medical_id:0,
        test_id:0,
        file:''
        }
};

export default function MedicalReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_MEDICAL_INPUT:
            const medicalInput = { ...state.medicalInput };
            medicalInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                medicalInput,
                showMedicalTestList:getFurtherRequirement(action.payload.name,action.payload.value)
            };
        case Types.CHANGE_MEDICAL_FILE_INPUT:
            const medicalFileInput = { ...state.medicalFileInput };
            medicalFileInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                medicalFileInput,
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


const getFurtherRequirement=(name:string,value:any)=>{
if(name=='further_requirement' && value==1){
    return true;
}else if(name=='further_requirement' && value==0){
    return false;
}
}

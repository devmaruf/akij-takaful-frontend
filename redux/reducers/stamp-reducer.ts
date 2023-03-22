import { IStamp } from "../interfaces";
import * as Types from "./../types/stamp-types";

export const defaultStampValue = {
    name: '',
    value: '',
}

export const defaultStampForm = {
    proposal_id: 0,
    proposal_no: '',
    project_id: 0,
    branch_id: 0,
    stamps: [
        defaultStampValue,
    ]
}

const initialState: IStamp = {
    isLoading: false,
    stampList: [],
    stampPaginationData: [],
    isSubmitting: false,
    isSearching: false,
    stampForm: defaultStampForm,
};

function StampReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.GET_STAMP_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                stampList: action.payload.data,
                stampPaginationData: action.payload.paginationData,
            };

        case Types.CHANGE_STAMP_FORM:
            const stampForm = { ...state.stampForm };
            stampForm[action.payload.name] = action.payload.value;
            return {
                ...state,
                stampForm,
            };

        case Types.SET_STAMP_FORM:
            return {
                ...state,
                isSearching: action.payload.isLoading,
                stampForm: {
                    ...action.payload.data,
                    stamps: action.payload.data?.stamps?.length > 0 ?
                        action.payload.data?.stamps :
                        [defaultStampValue]
                },
            };

        case Types.SAVE_STAMP_FORM:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                stampForm: action.payload.status ? { ...defaultStampForm } : state.stampForm
            };

        default:
            break;
    }
    return state;
}

export default StampReducer;

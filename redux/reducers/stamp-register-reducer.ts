import { IStampForm, IStampReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/stamp-types";
import { get28thDateOfCurrentMonth, getCurrentDate } from "@/utils/date-helper";

const initialState: IStampReducer = {
    isLoading: false,
    stampList: [],
    stampPaginationData: [],
    isSubmitting: false,
    isSearching: false,
    stampForm: {
        proposal_id: 0,
        proposal_no: '',
        project_id: 0,
        branch_id: 0,
        qty_100: 0,
        qty_50: 0,
        qty_30: 0,
        qty_20: 0,
        qty_10: 0,
        qty_5: 0,
        is_duplicate: false,
        stamp_used_amounnt: 0,
        stamp_used: 0,
        balance: 0,
        schedule_date: getCurrentDate(),
        business_date: get28thDateOfCurrentMonth(),
        remarks: '',
    },
};

export default function StampRegisterReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.GET_STAMP_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                stampList: action.payload.data,
                stampPaginationData: action.payload.paginationData,
            };

        case Types.CHANGE_STAMP_REGISTER_FORM:
            let updatedStampForm = {
                ...state.stampForm,
                [action.payload.name]: action.payload.value
            };

            updatedStampForm.stamp_used = getStampUsedAmount(updatedStampForm);
            updatedStampForm.balance = action.payload?.stampBalance?.total - updatedStampForm.stamp_used;

            return {
                ...state,
                stampForm: updatedStampForm,
            };

        case Types.SET_STAMP_FORM:
            return {
                ...state,
                isSearching: action.payload.isLoading,
                stampForm: {
                    ...state.stampForm,
                    ...action.payload.data,
                },
            };

        case Types.SAVE_STAMP_FORM:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                stampForm: action.payload.status ? {
                    ...initialState.stampForm
                } : {
                    ...state.stampForm
                }
            };

        case Types.STAMP_REGISTER_REPORT:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
            };

        default:
            break;
    }
    return state;
}


const getStampUsedAmount = (stampForm: IStampForm) => {
    let total = 0;
    if (stampForm.qty_100 > 0) {
        total += stampForm.qty_100 * 100;
    }
    if (stampForm.qty_50 > 0) {
        total += stampForm.qty_50 * 50;
    }
    if (stampForm.qty_30 > 0) {
        total += stampForm.qty_30 * 30;
    }
    if (stampForm.qty_20 > 0) {
        total += stampForm.qty_20 * 20;
    }
    if (stampForm.qty_10 > 0) {
        total += stampForm.qty_10 * 10;
    }
    if (stampForm.qty_5 > 0) {
        total += stampForm.qty_5 * 5;
    }

    return total;
}

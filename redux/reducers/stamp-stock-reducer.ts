import { IStampStock } from "../interfaces";
import * as Types from "./../types/stamp-stock-types";


const initialState: IStampStock = {
    isLoading: false,
    isDeleting: false,
    isLoadingDetails: false,
    isSubmitting: false,
    stampStockList: [],
    stampStockPaginationData: [],
    stampStockDetails: {},
    stampStockForm: {
        project_id: 0,
        branch_id: 0,
        challan_no: "",
        qty_100: "",
        qty_50: "",
        qty_30: "",
        qty_20: "",
        qty_10: "",
        qty_5: "",
        purchase_date: "",
        receive_date: "",
    },
};

function StampStockReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.GET_STAMP_STOCK_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                stampStockList: action.payload.data,
                stampStockPaginationData: action.payload.paginationData,
            };

        case Types.CHANGE_STAMP_STOCK_FORM:
            const stampStockForm = { ...state.stampStockForm };
            stampStockForm[action.payload.name] = action.payload.value;
            return {
                ...state,
                stampStockForm,
            };

        // case Types.SET_STAMP_STOCK_FORM:
        //     return {
        //         ...state,
        //         isSearching: action.payload.isLoading,
        //         stampForm: {
        //             ...action.payload.data,
        //             stamps: action.payload.data?.stamps?.length > 0 ?
        //                 action.payload.data?.stamps :
        //                 [defaultStampValue]
        //         },
        //     };

        case Types.SAVE_STAMP_STOCK_FORM:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                stampStockForm: action.payload.status ? initialState.stampStockForm  : state.stampStockForm
            };

        default:
            break;
    }
    return state;
}

export default StampStockReducer;

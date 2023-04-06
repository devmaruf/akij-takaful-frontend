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
        qty_100: 0,
        qty_50: 0,
        qty_30: 0,
        qty_20: 0,
        qty_10: 0,
        qty_5: 0,
        purchase_date: new Date(),
        receive_date: new Date(),
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

        case Types.SAVE_STAMP_STOCK_FORM:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                stampStockForm: action.payload.status ? initialState.stampStockForm : state.stampStockForm
            };

        case Types.GET_STAMP_STOCK_DETAILS:
            return {
                ...state,
                stampStockDetails: action.payload.data,
                stampStockForm: action.payload.data
            };

        default:
            break;
    }
    return state;
}

export default StampStockReducer;

import { IProductReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/product-type";
import { generateDropdownList } from "@/utils/dropdown";

const initialState: IProductReducer = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    loadingDetails: false,
    productList: [],
    paginationData: [],
    productDetails: {
        id: 0,
        name: "",
        rates: [],
        modes: [],
        is_dps: 0,
        is_adb_enabled: 1,
        is_child_health: 0,
    },
    productDropdownList: [],
    productInput: {
        name: "",
        rates: [],
        modes: [],
        is_dps: 0,
        is_adb_enabled: 1,
        is_child_health: 0,
    },
};

export default function ProductReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_PRODUCT_INPUT:
            const productInput = { ...state.productInput };
            productInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                productInput,
            };
        case Types.EMPTY_PRODUCT_INPUT:
            return {
                ...state,
                productInput: initialState.productInput
            }
        case Types.SUBMIT_PRODUCT:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                productInput: action.payload.status ? initialState.productInput : state.productInput
            };
        case Types.GET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload.data,
                paginationData: action.payload.paginationData,
                isLoading: action.payload.isLoading,
            };
        case Types.GET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.payload.data,
                productInput: action.payload.data,
                loadingDetails: action.payload.isLoading,
            };
        case Types.UPDATE_PRODUCT:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
                productInput: action.payload.status ? initialState.productInput : state.productInput
            };
        case Types.DELETE_PRODUCT:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };
        case Types.GET_PRODUCT_DROPDOWN_LIST:
            return {
                ...state,
                productDropdownList: generateDropdownList(action.payload),
            };

        default:
            break;
    }
    return state;
}

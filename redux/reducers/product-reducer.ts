import { IProductReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/product-type";
import { generateDropdownList } from "@/utils/dropdown";

const initialState: IProductReducer = {
    productDropdownList: []
};

export default function ProductReducer(state = initialState, action: any) {
    switch (action.type) {
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

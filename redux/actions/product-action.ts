import { Dispatch } from "@reduxjs/toolkit";

import axios from "@/utils/axios";
import * as Types from "@/redux/types/product-type";

export const getProductDropdownListAction = () => (dispatch: Dispatch) => {
    axios.get(`/products/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_PRODUCT_DROPDOWN_LIST, payload: res.data });
        })
}
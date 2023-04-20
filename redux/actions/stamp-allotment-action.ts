import axios from "@/utils/axios";
import * as Types from "@/redux/types/stamp-stock-types";
import { Dispatch } from "@reduxjs/toolkit";
import { Toaster } from "@/components/toaster";
import { IStampStockAllotmentForm } from "@/redux/interfaces";

export const getStampBalanceDetail = () => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.GET_STAMP_BALANCE, payload: response });

    axios.get(`stamp-balance`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_STAMP_BALANCE, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_STAMP_BALANCE, payload: response })
        });
}

export const submitStockAllotment = (stampStockAllotmentForm: IStampStockAllotmentForm) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.SUBMIT_EMPLOYEE_STAMP_ALLOTMENT, payload: response });

    axios.post(`employee-stamp-allocate`, stampStockAllotmentForm)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SUBMIT_EMPLOYEE_STAMP_ALLOTMENT, payload: response });
            Toaster('success', response.message);
            dispatch(getStampBalanceDetail());
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_EMPLOYEE_STAMP_ALLOTMENT, payload: response })
        });
}

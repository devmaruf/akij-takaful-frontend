import axios from "@/utils/axios";
import * as Types from "./../types/stamp-stock-types";
import { Dispatch } from "@reduxjs/toolkit";
import { Toaster } from "@/components/toaster";
import { IStampForm } from "../interfaces";

export const changeStampStockInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    dispatch({
        type: Types.CHANGE_STAMP_STOCK_FORM, payload: {
            name: name,
            value: value,
        }
    });
};

export const getStampStockListAction = (currentPage: number = 1, dataLimit: number = 10, searchText = '') => (dispatch: Dispatch) => {
    let url = `stamp-stocks?perPage=${dataLimit}&page=${currentPage}`

    if (searchText !== '') {
        url += `&search=${searchText}`;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_STAMP_STOCK_LIST, payload: response });

    axios.get(url)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_STAMP_STOCK_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_STAMP_STOCK_LIST, payload: response })
        })
}

export const getStampStockDetail = (id: number) => (dispatch: Dispatch) => {
    if (id === undefined || id === 0) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.GET_STAMP_STOCK_DETAILS, payload: response });

    axios.get(`stamp-stocks/${id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_STAMP_STOCK_DETAILS, payload: response });
            Toaster('success', response.message);
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_STAMP_STOCK_DETAILS, payload: response })
        });
}

export const submitStampStockAction = (stampForm: IStampForm, router: any, id: number = 0) => (dispatch: Dispatch) => {
    if (stampForm.challan_no === undefined || stampForm.challan_no === "") {
        Toaster('error', 'Please give challan no.');
        return;
    }
    if (stampForm.project_id === undefined || stampForm.project_id === "" || stampForm.project_id === 0) {
        Toaster('error', 'Please select bank.');
        return;
    }
    if (stampForm.branch_id === undefined || stampForm.branch_id === "" || stampForm.branch_id === 0) {
        Toaster('error', 'Please select branch.');
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.SAVE_STAMP_STOCK_FORM, payload: response });

    axios({
        method: id === 0 ? 'POST' : 'PUT',
        url: `stamp-stocks${id > 0 ? `/${id}` : ''}`,
        data: stampForm
    })
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SAVE_STAMP_STOCK_FORM, payload: response });
            Toaster('success', response.message);
            router.push('/stamp-stock');
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SAVE_STAMP_STOCK_FORM, payload: response })
        });
}
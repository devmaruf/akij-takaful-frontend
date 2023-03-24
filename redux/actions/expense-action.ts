import * as Types from "./../types/expense-type";
import axios from "@/utils/axios";
import { Toaster } from "@/components/toaster";
import { Dispatch } from "@reduxjs/toolkit";

export const changeInputValue = (name: string, value: any, key: string) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: { data, key } });
};


export const getExpensesList = (currentPage: number = 1, dataLimit: number = 10, search: string = '') => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };

    dispatch({ type: Types.GET_EXPENSES_LIST, payload: response });

    axios.get(`/expenses?perPage=${dataLimit}&currentPage=${currentPage}&search=${search}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_EXPENSES_LIST, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_EXPENSES_LIST, payload: response });
        });
}

export const getExpenseDetails = (id: number | string) => (dispatch: Dispatch) => {
    if (isNaN(parseInt(id + ''))) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: null,
        inputData: {},
    };
    dispatch({ type: Types.GET_EXPENSE_DETAILS, payload: response });

    axios.get(`/expenses/${parseInt(id + '')}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_EXPENSE_DETAILS, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_EXPENSE_DETAILS, payload: response });
        });
}

export const deleteExpense = (id: any, setShowDeleteModal: any) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_EXPENSE, payload: responseData });

    axios.delete(`/expenses/${id}`)
        .then(res => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getExpensesList());
            dispatch({ type: Types.DELETE_EXPENSE, payload: responseData });
        })
        .catch(error => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_EXPENSE, payload: responseData })
        });
}
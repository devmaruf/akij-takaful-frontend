import * as Types from "./../types/expense-type";
import axios from "@/utils/axios";
import { Toaster } from "@/components/toaster";
import { Dispatch } from "@reduxjs/toolkit";
import { IExpense } from '@/redux/interfaces';

export const changeExpenseInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    dispatch({
        type: Types.CHANGE_EXPENSE_FORM, payload: {
            name: name,
            value: value,
        }
    });
};

export const submitExpenseAction = (expensesForm: IExpense, router: any) => (dispatch: Dispatch) => {

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.SUBMIT_EXPENSE, payload: response });

    axios.post(`/expenses`, expensesForm)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SUBMIT_EXPENSE, payload: response });
            Toaster('success', response.message);
            router.push('/expense');
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_EXPENSE, payload: response })
        });
}

export const getExpensesList = (currentPage: number = 1, dataLimit: number = 10, searchText: string = '') => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };

    dispatch({ type: Types.GET_EXPENSES_LIST, payload: response });

    axios.get(`expenses?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
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

export const updateExpenseAction = (expensesForm: IExpense, id: number, router: any) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.UPDATE_EXPENSE, payload: response });

    axios.put(`/expenses/${id}`, expensesForm)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.UPDATE_EXPENSE, payload: response });
            Toaster('success', response.message);
            router.push('/expense');
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_EXPENSE, payload: response })
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

export const getExpenseTypeDropdownList = () => (dispatch: Dispatch) => {
    axios.get(`/expense-types/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.EXPENSE_TYPE_DROPDOWN_LIST, payload: res.data });
        })
}

import { Dispatch } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import * as Types from "@/redux/types/product-type";
import { Toaster } from "@/components/toaster";

export const changeProductInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_PRODUCT_INPUT, payload: data });
};


export const emptyProductInputAction = () => (dispatch: Dispatch) => {
    dispatch({ type: Types.EMPTY_PRODUCT_INPUT, payload: {} });
};

export const submitProductAction = (productInput: any, closeModal: any) => (dispatch: Dispatch) => {

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.SUBMIT_PRODUCT, payload: response });

    axios.post(`/products`, productInput)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SUBMIT_PRODUCT, payload: response });
            Toaster('success', response.message);
            dispatch(getProductListAction())
            closeModal(false);
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_PRODUCT, payload: response })
        });
}

export const getProductListAction = (currentPage: number = 1, dataLimit: number = 10, searchText = '') => (dispatch: Dispatch) => {
    let url = `products?perPage=${dataLimit}&page=${currentPage}`

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
    dispatch({ type: Types.GET_PRODUCT_LIST, payload: response });

    axios.get(url)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_PRODUCT_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_PRODUCT_LIST, payload: response })
        })
}


export const getProductDetailsAction = (id: number | string) => (dispatch: Dispatch) => {
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
    dispatch({ type: Types.GET_PRODUCT_DETAILS, payload: response });

    axios.get(`/products/${parseInt(id + '')}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_PRODUCT_DETAILS, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_PRODUCT_DETAILS, payload: response });
        });
}

export const updateProductAction = (productInput: any, id: number, closeModal: any) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.UPDATE_PRODUCT, payload: response });

    axios.put(`/products/${id}`, productInput)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.UPDATE_PRODUCT, payload: response });
            Toaster('success', response.message);
            dispatch(getProductListAction())
            closeModal(false);
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_PRODUCT, payload: response })
        });
}

export const deleteProductAction = (id: any, setShowDeleteModal: any) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_PRODUCT, payload: responseData });

    axios.delete(`/products/${id}`)
        .then(res => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getProductListAction());
            dispatch({ type: Types.DELETE_PRODUCT, payload: responseData });
        })
        .catch(error => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_PRODUCT, payload: responseData })
        });
}


export const getProductDropdownListAction = () => (dispatch: Dispatch) => {
    axios.get(`/products/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_PRODUCT_DROPDOWN_LIST, payload: res.data });
        })
}
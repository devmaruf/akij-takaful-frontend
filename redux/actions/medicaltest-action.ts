import { Dispatch } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import * as Types from "@/redux/types/medical-test-type";
import { Toaster } from "@/components/toaster";

export const changeMedicalTestInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_MEDICAL_TEST_INPUT, payload: data });
};

export const submitMedicalTestAction = (medicalTestInput: any) => (dispatch: Dispatch) => {

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.SUBMIT_MEDICAL_TEST, payload: response });

    axios.post(`/medical-tests`, medicalTestInput)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SUBMIT_MEDICAL_TEST, payload: response });
            Toaster('success', response.message);
            dispatch(getMedicalTestListAction());
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_MEDICAL_TEST, payload: response })
        });
}

export const getMedicalTestListAction = (currentPage: number = 1, dataLimit: number = 10, searchText = '') => (dispatch: Dispatch) => {
   
    
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        medicalTestPaginationData: [],
    };
    dispatch({ type: Types.GET_MEDICAL_TEST_LIST, payload: response });
    
    axios.get(`medical-tests?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.medicalTestPaginationData = res.data;
            dispatch({ type: Types.GET_MEDICAL_TEST_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_MEDICAL_TEST_LIST, payload: response })
        })
}


export const getMedicalTestDetailsAction = (id: number | string) => (dispatch: Dispatch) => {
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
    dispatch({ type: Types.GET_MEDICAL_TEST_DETAILS, payload: response });

    axios.get(`/products/${parseInt(id + '')}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_MEDICAL_TEST_DETAILS, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_MEDICAL_TEST_DETAILS, payload: response });
        });
}

export const updateMedicalTestAction = (productInput: any, id: number, closeModal: any) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.UPDATE_MEDICAL_TEST, payload: response });

    axios.put(`/products/${id}`, productInput)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.UPDATE_MEDICAL_TEST, payload: response });
            Toaster('success', response.message);
            dispatch(getMedicalTestListAction())
            closeModal(false);
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_MEDICAL_TEST, payload: response })
        });
}

export const deleteMedicalTestAction = (id: any, setShowDeleteModal: any) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_MEDICAL, payload: responseData });

    axios.delete(`/products/${id}`)
        .then(res => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getMedicalTestListAction());
            dispatch({ type: Types.DELETE_MEDICAL, payload: responseData });
        })
        .catch(error => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_MEDICAL, payload: responseData })
        });
}


export const getMedicalTestDropdownListAction = () => (dispatch: Dispatch) => {
    axios.get(`/products/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_MEDICAL_DROPDOWN_LIST, payload: res.data });
        })
}
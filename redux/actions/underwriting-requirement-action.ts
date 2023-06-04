import axios from "@/utils/axios";
import * as Types from "../types/underwriting-questionnaire-type";
import { Toaster } from "@/components/toaster";
import { Dispatch } from "@reduxjs/toolkit";

export const changeInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_UNDERWRITING_QUESTIONNAIRE_INPUT_VALUE, payload: data });
};

export const emptyUnderwritingQuesInputAction = () => (dispatch: Dispatch) => {
    dispatch({ type: Types.EMPTY_UNDERWRITING_QUESTIONNAIRE_INPUT, payload: {} });
};

export const submitUnderwritingRequirementAction = (underwritingQuesInput, setShowModal) => (dispatch: Dispatch) => {
   
    if (underwritingQuesInput.requirement_name_en === "") {
        Toaster("error", "Please input requirement name in en.");
        return false;
    }
    if (underwritingQuesInput.requirement_name_bn === "") {
        Toaster("error", "Please input requirement name in bg.");
        return false;
    }
    if (underwritingQuesInput.type_id === "") {
        Toaster("error", "Please input type id.");
        return false;
    }
    if (underwritingQuesInput.input_type === "") {
        Toaster("error", "Please select input type.");
        return false;
    }
    if (underwritingQuesInput.gender === "") {
        Toaster("error", "Please select gender.");
        return false;
    }

    if (underwritingQuesInput.code === "") {
        Toaster("error", "Please give short code.");
        return false;
    }

    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_UNDERWRITING_QUESTIONNAIRE, payload: responseData });

    axios.post(`/underwriting-requirements`, underwritingQuesInput)
        .then(res => {
            responseData.status = true;
            responseData.isLoading = false;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowModal(false);
            dispatch(getUnderwritingRequirementsListAction());
            dispatch({ type: Types.SUBMIT_UNDERWRITING_QUESTIONNAIRE, payload: responseData });
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.SUBMIT_UNDERWRITING_QUESTIONNAIRE, payload: responseData })
        })
}

export const getUnderwritingRequirementsListAction = (currentPage: number = 1, dataLimit: number = 10, searchText = '') => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: {},
    };

    dispatch({ type: Types.GET_UNDERWRITING_QUESTIONNAIRE_LIST, payload: response });

    axios.get(`underwriting-requirements?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_UNDERWRITING_QUESTIONNAIRE_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_UNDERWRITING_QUESTIONNAIRE_LIST, payload: response })
        })

}

export const getUnderwritingQuesDetails = (id: number | string) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
        inputData: {
            name: "",
            code: ""
        }
    };
    dispatch({ type: Types.GET_UNDERWRITING_QUESTIONNAIRE_DETAILS, payload: response });

    axios.get(`/underwriting-requirements/${id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_UNDERWRITING_QUESTIONNAIRE_DETAILS, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_UNDERWRITING_QUESTIONNAIRE_DETAILS, payload: response })
        })
}

export const handleUpdateUnderwritingQues = (underwritingQuesInput, setShowUpdateModal) => (dispatch: Dispatch) => {
    if (underwritingQuesInput.name === "") {
        Toaster("error", "Bank name can't be blank!");
        return false;
    }

    if (underwritingQuesInput.code === "") {
        Toaster("error", "Bank short code can't be blank!");
        return false;
    }

    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_UNDERWRITING_QUESTIONNAIRE, payload: responseData });

    axios.put(`/underwriting-requirements/${underwritingQuesInput.id}`, underwritingQuesInput)
        .then(res => {
            responseData.status = true;
            responseData.isLoading = false;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowUpdateModal(false);
            dispatch(getUnderwritingRequirementsListAction());
            dispatch({ type: Types.SUBMIT_UNDERWRITING_QUESTIONNAIRE, payload: responseData });
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.SUBMIT_UNDERWRITING_QUESTIONNAIRE, payload: responseData })
        })
}

export const deleteUnderwritingQue = (id: number, setShowDeleteModal: any) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_UNDERWRITING_QUESTIONNAIRE, payload: responseData });
    axios.delete(`/underwriting-requirements/${id}`)
        .then((res) => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getUnderwritingRequirementsListAction());
            dispatch({ type: Types.DELETE_UNDERWRITING_QUESTIONNAIRE, payload: responseData });
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_UNDERWRITING_QUESTIONNAIRE, payload: responseData })
        })
}


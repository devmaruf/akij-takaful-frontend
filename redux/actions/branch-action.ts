import { Toaster } from "@/components/toaster";
import axios from "@/utils/axios";
import * as Types from "../types/BranchType";
import { Dispatch } from "@reduxjs/toolkit";

export const changeInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

export const emptyBranchInputAction = () => (dispatch: Dispatch) => {
    dispatch({ type: Types.EMPTY_BRANCH_INPUT, payload: {} });
};

export const submitBranch = (branchInput, setShowModal) => (dispatch: Dispatch) => {
    if (branchInput.project_id === "") {
        Toaster("error", "Please select a bank.");
        return false;
    }
    if (branchInput.name === "") {
        Toaster("error", "Please give a branch name.");
        return false;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_BRANCH, payload: response });

    axios.post('/branches', branchInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            setShowModal(false);
            dispatch(getBranchList());
            dispatch({ type: Types.SUBMIT_BRANCH, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_BRANCH, payload: response });
        });
}

export const getBranchList = (
    currentPage: number = 1,
    dataLimit: number = 10,
    searchText: string = ''
) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_BRANCH_LIST, payload: response });

    axios(`/branches?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
        .then((res: any) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_BRANCH_LIST, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_BRANCH_LIST, payload: response });
        });
}

export const getBranchDetails = (id: number | string) => (dispatch: Dispatch) => {
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
    dispatch({ type: Types.GET_BRANCH_DETAILS, payload: response });

    axios(`/branches/${id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_BRANCH_DETAILS, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_BRANCH_DETAILS, payload: response });
        });
}

export const updateBranch = (branchInput, setShowUpdateModal) => (dispatch: Dispatch) => {
    if (branchInput.project_id === "") {
        Toaster("error", "Please select a bank.");
        return false;
    }
    if (branchInput.name === "") {
        Toaster("error", "Please give a branch name.");
        return false;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.UPDATE_BRANCH, payload: response });

    axios.put(`/branches/${branchInput.id}`, branchInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            setShowUpdateModal(false);
            dispatch(getBranchList());
            dispatch({ type: Types.UPDATE_BRANCH, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_BRANCH, payload: response })
        });
}

export const deleteBranch = (id, setShowDeleteModal) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_BRANCH, payload: responseData });

    axios.delete(`/branches/${id}`)
        .then((res) => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getBranchList());
            dispatch({ type: Types.DELETE_BRANCH, payload: responseData });
        })
        .catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_BRANCH, payload: responseData });
        });
}

export const getBranchDropdownList = () => (dispatch: Dispatch) => {
    axios.get(`/branches/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_BRANCH_DROPDOWN, payload: res.data });
        });
}

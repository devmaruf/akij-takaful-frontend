import * as Types from "./../types/BranchType";
import Axios from "axios";
import { Toaster } from "@/components/toaster";
import { getAuthData } from "./AuthAction";
import AxiosCall from './../../components/_utlities/AxiosCall/index';

const BASE_URL = process.env.BASE_URL;

/**
 * 
 * @param name String
 * @param value Any
 * @returns data
 */
export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

/**
 * Store Branch
 * @param branchInput Ex: {project_id, service_cell_id, name, code}
 * @returns 
 */
export const submitBranch = (branchInput, setShowModal) => (dispatch: any) => {
    if (branchInput.name === "") {
        Toaster("error", "Branch name can't be blank!");
        return false;
    }
    if (branchInput.code === "") {
        Toaster("error", "Branch code can't be blank!");
        return false;
    }
    if (branchInput.project_id === "") {
        Toaster("error", "Project can't be blank!");
        return false;
    }
    if (branchInput.service_cell_id === "") {
        Toaster("error", "Service cell can't be blank!");
        return false;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_BRANCH, payload: response });

    AxiosCall({ method: 'POST', url: `/branches`, data: branchInput })
        .then((res) => {
            if (res.status === true) {
                response.status = true;
                response.isLoading = false;
                response.message = res.data.message;
                Toaster('success', response.message);
                setShowModal(false);
                dispatch(getBranchList(1, 5));
                dispatch({ type: Types.SUBMIT_BRANCH, payload: response });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.SUBMIT_BRANCH, payload: response })
            }
        });
}

/**
 * Get Branch List.
 * @param currentPage Number -- Default 1
 * @param dataLimit Number -- Default 10
 * @returns void Dispatch `GET_BRANCH_LIST` action
 */
export const getBranchList = (currentPage: number = 1, dataLimit: number = 10) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_BRANCH_LIST, payload: response });

    AxiosCall({ method: 'GET', url: `/branches?perPage=${dataLimit}&currentPage=${currentPage}` })
        .then((res) => {
            if (res.status === true) {
                response.isLoading = false;
                response.status = true;
                response.message = res.data.message;
                response.data = res.data.data;
                response.paginationData = res.data;
                dispatch({ type: Types.GET_BRANCH_LIST, payload: response });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.GET_BRANCH_LIST, payload: response });
            }
        });
}



/**
 * Get Project Details.
 * @param id Number -- Proposal id
 * @returns void Dispatch `GET_PROPOSAL_DETAILS` action
 */
export const getBranchDetails = (id: number | string) => (dispatch) => {
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

    AxiosCall({ method: 'GET', url: `/branches/${id}` })
        .then((res) => {
            if (res.status === true) {
                response.isLoading = false;
                response.status = true;
                response.message = res.data.message;
                response.data = res.data;
                dispatch({ type: Types.GET_BRANCH_DETAILS, payload: response });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.GET_BRANCH_DETAILS, payload: response });
            }
        });
}


/**
 * Update Projects
 * @param branchInput Ex: email & password
 * @returns 
 */
export const updateBranch = (branchInput, setShowUpdateModal) => (dispatch: any) => {
    if (branchInput.name === "") {
        Toaster("error", "Branch name can't be blank!");
        return false;
    }
    if (branchInput.code === "") {
        Toaster("error", "Branch code can't be blank!");
        return false;
    }
    if (branchInput.project_id === "") {
        Toaster("error", "Project can't be blank!");
        return false;
    }
    if (branchInput.service_cell_id === "") {
        Toaster("error", "Service cell can't be blank!");
        return false;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_BRANCH, payload: response });

    AxiosCall({ method: 'PUT', url: `/branches/${branchInput.id}`, data: {
        id: branchInput.id,
        name: branchInput.name,
        code: branchInput.code,
        project_id: branchInput.project_id,
        service_cell_id: branchInput.service_cell_id,
    } })
        .then((res) => {
            if (res.status === true) {
                response.status = true;
                response.isLoading = false;
                response.message = res.data.message;
                Toaster('success', response.message);
                setShowModal(false);
                dispatch(getBranchList(1, 5));
                dispatch({ type: Types.SUBMIT_BRANCH, payload: response });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.SUBMIT_BRANCH, payload: response })
            }
        });
}


/**
 * Delete Branch Details.
 * @param id Number -- Branch ID
 * @returns void Dispatch `DELETE_BRANCH` action
 */
export const deleteBranch = (id, setShowDeleteModal) => (dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_BRANCH, payload: responseData });

    AxiosCall({ method: 'DELETE', url: `/branches/${id}` })
        .then((res) => {
            if (res.status === true) {
                responseData.isLoading = false;
                responseData.status = true;
                responseData.message = res.data.message;
                Toaster('success', responseData.message);
                setShowDeleteModal(false);
                dispatch(getProjectList(1, 5));
                dispatch({ type: Types.DELETE_BRANCH, payload: responseData });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.DELETE_BRANCH, payload: responseData })
            }
        });
}




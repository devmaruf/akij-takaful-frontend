import * as Types from "./../types/ProjectType";
import Axios from "axios";
import { Toaster } from "@/components/toaster";

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
 * Store Projects
 * @param projectInput Ex: email & password
 * @returns 
 */
export const handleSubmitProject = (projectInput, setShowModal) => (dispatch: any) => {
    if (projectInput.name === "") {
        Toaster("error", "Project name can't be blank!");
        return false;
    }
    if (projectInput.code === "") {
        Toaster("error", "Project code can't be blank!");
        return false;
    }

    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData });

    Axios.post(`${BASE_URL}/projects`, {
        name: projectInput.name,
        code: projectInput.code
    })
        .then(res => {
            if (res.status === 200) {
                responseData.status = true;
                responseData.isLoading = false;
                responseData.message = res.data.message;
                Toaster('success', responseData.message);
                setShowModal(false);
                dispatch(getProjectList(1, 5));
                dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData });
            }
        }).catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData })
            }
        })
}

/**
 * Get Project List List.
 * @param currentPage Number -- Default 1
 * @param dataLimit Number -- Default 10
 * @returns void Dispatch `GET_PROJECT_LIST` action
 */
export const getProjectList = (currentPage: number = 1, dataLimit: number = 10) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_PROJECT_LIST, payload: response });

    Axios.get(`${BASE_URL}/projects?perPage=${dataLimit}&currentPage=${currentPage}`)
        .then((res) => {
            if (res.status === 200) {

                response.isLoading = false;
                response.status = true;
                response.message = res.data.message;
                response.data = res.data.data.data;
                response.paginationData = res.data.data;
                dispatch({ type: Types.GET_PROJECT_LIST, payload: response });
            }
        }).catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.GET_PROJECT_LIST, payload: response })
            }
        })

}



/**
 * Get Project Details.
 * @param id Number -- Proposal id
 * @returns void Dispatch `GET_PROPOSAL_DETAILS` action
 */
export const getProjectDetails = (id: number | string) => (dispatch) => {
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
    dispatch({ type: Types.GET_PROJECT_DETAILS, payload: response });

    Axios.get(`${BASE_URL}/projects/${id}`)
        .then((res) => {
            if (res.status === 200) {
                response.isLoading = false;
                response.status = true;
                response.message = res.data.message;
                response.data = res.data.data;
                dispatch({ type: Types.GET_PROJECT_DETAILS, payload: response });
            }
        }).catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.GET_PROJECT_LIST, payload: response })
            }
        })
}


/**
 * Update Projects
 * @param projectInput Ex: email & password
 * @returns 
 */
export const handleUpdateProject = (projectInput, setShowUpdateModal) => (dispatch: any) => {
    if (projectInput.name === "") {
        Toaster("error", "Project name can't be blank!");
        return false;
    }
    if (projectInput.code === "") {
        Toaster("error", "Project code can't be blank!");
        return false;
    }

    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData });

    Axios.put(`${BASE_URL}/projects/${projectInput.id}`, {
        id: projectInput.id,
        name: projectInput.name,
        code: projectInput.code
    })
        .then(res => {
            if (res.status === 200) {
                responseData.status = true;
                responseData.isLoading = false;
                responseData.message = res.data.message;
                Toaster('success', responseData.message);
                setShowUpdateModal(false);
                dispatch(getProjectList(1, 5));
                dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData });
            }
        }).catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData })
            }
        })
}


/**
 * Delete Projects Details.
 * @param id Number -- Project ID
 * @returns void Dispatch `DELETE_PROJECT` action
 */
export const deleteProject = (id, setShowDeleteModal) => (dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_PROJECT, payload: responseData });
    Axios.delete(`${BASE_URL}/projects/${id}`)
        .then((res) => {
            if (res.status === 200) {
                responseData.isLoading = false;
                responseData.status = true;
                responseData.message = res.data.message;
                Toaster('success', responseData.message);
                setShowDeleteModal(false);
                dispatch(getProjectList(1, 5));
                dispatch({ type: Types.DELETE_PROJECT, payload: responseData });
            }
        }).catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.DELETE_PROJECT, payload: responseData })
            }
        })
}
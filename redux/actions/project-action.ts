import axios from "@/utils/axios";
import * as Types from "../types/ProjectType";
import { Toaster } from "@/components/toaster";

export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

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

    axios.post(`/projects`, {
        name: projectInput.name,
        code: projectInput.code
    })
        .then(res => {
                responseData.status = true;
                responseData.isLoading = false;
                responseData.message = res.message;
                Toaster('success', responseData.message);
                setShowModal(false);
                dispatch(getProjectList(1, 5));
                dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData });
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData })
        })
}

export const getProjectList = (currentPage: number = 1, dataLimit: number = 10) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_PROJECT_LIST, payload: response });

    axios.get(`/projects?perPage=${dataLimit}&currentPage=${currentPage}`)
        .then((res) => {
                response.isLoading = false;
                response.status = true;
                response.message = res.message;
                response.data = res.data.data;
                response.paginationData = res.data;
                dispatch({ type: Types.GET_PROJECT_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_PROJECT_LIST, payload: response })
        })

}

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

    axios.get(`/projects/${id}`)
        .then((res) => {
                response.isLoading = false;
                response.status = true;
                response.message = res.message;
                response.data = res.data;
                dispatch({ type: Types.GET_PROJECT_DETAILS, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_PROJECT_LIST, payload: response })
        })
}

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

    axios.put(`/projects/${projectInput.id}`, {
        id: projectInput.id,
        name: projectInput.name,
        code: projectInput.code
    })
        .then(res => {
            responseData.status = true;
            responseData.isLoading = false;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowUpdateModal(false);
            dispatch(getProjectList(1, 5));
            dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData });
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData })
        })
}

export const deleteProject = (id: number, setShowDeleteModal) => (dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_PROJECT, payload: responseData });
    axios.delete(`/projects/${id}`)
        .then((res) => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getProjectList(1, 5));
            dispatch({ type: Types.DELETE_PROJECT, payload: responseData });
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_PROJECT, payload: responseData })
        })
}

export const getProjectListDropdown = () => (dispatch) => {
    axios.get(`/projects/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_PROJECT_DROPDOWN, payload: res.data });
        })
}
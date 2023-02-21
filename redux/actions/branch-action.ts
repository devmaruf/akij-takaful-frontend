import { Toaster } from "@/components/toaster";
import axios from "@/utils/axios";
import * as Types from "../types/BranchType";

export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

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

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_BRANCH, payload: response });

    axios({
        method: 'POST',
        url: `/branches`,
        data: branchInput
    })
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            setShowModal(false);
            dispatch(getBranchList(1, 5));
            dispatch({ type: Types.SUBMIT_BRANCH, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_BRANCH, payload: response });
        });
}

export const getBranchList = (
    currentPage: number = 1,
    dataLimit: number = 10
) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_BRANCH_LIST, payload: response });

    axios(`/branches?perPage=${dataLimit}&currentPage=${currentPage}`)
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

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.UPDATE_BRANCH, payload: response });

    axios.put(`/branches/${branchInput.id}`, {
        id: branchInput.id,
        name: branchInput.name,
        code: branchInput.code,
        project_id: branchInput.project_id
    })
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            setShowUpdateModal(false);
            dispatch(getBranchList(1, 5));
            dispatch({ type: Types.UPDATE_BRANCH, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_BRANCH, payload: response })
        });
}

export const deleteBranch = (id, setShowDeleteModal) => (dispatch) => {
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
            dispatch(getBranchList(1, 5));
            dispatch({ type: Types.DELETE_BRANCH, payload: responseData });
        })
        .catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_BRANCH, payload: responseData });
        });
}




export const getBranchDropdownList = () => (dispatch) => {
    axios.get(`/branches/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_BRANCH_DROPDOWN, payload: res.data });
        })
}
import axios from "@/utils/axios";
import { Dispatch } from "@reduxjs/toolkit";
import * as Types from "@/redux/types/occupation-types";
import { Toaster } from "@/components/toaster";



export const changeInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

export const emptyOccupationInputAction = () => (dispatch: Dispatch) => {
    dispatch({ type: Types.EMPTY_OCCUPATION_INPUT, payload: {} });
};

export const submitOccupation = (occupationInput, setShowModal) => (dispatch: Dispatch) => {
    if (occupationInput.name === "") {
        Toaster("error", "Name can't be blank!");
        return false;
    }
    if (occupationInput.group === "") {
        Toaster("error", "Group can't be blank!");
        return false;
    }
    if (occupationInput.class === "") {
        Toaster("error", "Please select class");
        return false;
    }

    const updatedInput = Object.assign({}, occupationInput, { class: occupationInput.class.toString() });

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_OCCUPATION, payload: response });

    axios.post('/occupations', updatedInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            setShowModal(false);
            dispatch(getOccupationList());
            dispatch({ type: Types.SUBMIT_OCCUPATION, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_OCCUPATION, payload: response });
        });
}

export const getOccupationList = (
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
    dispatch({ type: Types.GET_OCCUPATION_LIST, payload: response });

    axios(`/occupations?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
        .then((res: any) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_OCCUPATION_LIST, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_OCCUPATION_LIST, payload: response });
        });
}

export const getOccupationDetails = (id: number | string) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
        inputData: {
            name: "",
            group: "",
            class: ""
        }
    };
    dispatch({ type: Types.GET_OCCUPATION_DETAILS, payload: response });

    axios(`/occupations/${id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_OCCUPATION_DETAILS, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_OCCUPATION_DETAILS, payload: response });
        });
}

export const updateOccupation = (occupationInput, setShowUpdateModal) => (dispatch: Dispatch) => {
    if (occupationInput.name === "") {
        Toaster("error", "Name can't be blank!");
        return false;
    }
    if (occupationInput.group === "") {
        Toaster("error", "Group can't be blank!");
        return false;
    }
    if (occupationInput.class === "") {
        Toaster("error", "Please select class");
        return false;
    }

    const updatedInput = Object.assign({}, occupationInput, { class: occupationInput.class.toString() });


    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.UPDATE_OCCUPATION, payload: response });

    axios.put(`/occupations/${occupationInput.id}`, updatedInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            setShowUpdateModal(false);
            dispatch(getOccupationList());
            dispatch({ type: Types.UPDATE_OCCUPATION, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_OCCUPATION, payload: response })
        });
}

export const deleteOccupation = (id, setShowDeleteModal) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_OCCUPATION, payload: responseData });

    axios.delete(`/occupations/${id}`)
        .then((res) => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getOccupationList());
            dispatch({ type: Types.DELETE_OCCUPATION, payload: responseData });
        })
        .catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_OCCUPATION, payload: responseData });
        });
}

export const getOccupationsBySearchAction = (search: string = '') => (dispatch: Dispatch) => {
    axios.get(`/occupations?perPage=10&search=${search}&orderBy=id&order=asc`)
        .then((res) => {
            dispatch({ type: Types.GET_OCCUPATION_LIST_BY_SEARCH, payload: res?.data?.data ?? [] });
        });
}

export const getOccupationsBySearch = (search: string = '') => {
    return axios.get(`/occupations?perPage=10&search=${search}&orderBy=id&order=asc`)
        .then((res) => {
            return res?.data?.data ?? [];
        });
}

export const getOccupationDropdownListAction = () => (dispatch: Dispatch) => {
    axios.get(`/occupations/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_OCCUPATION_DROPDOWN_LIST, payload: res.data });
        });
}

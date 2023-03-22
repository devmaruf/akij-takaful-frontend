import axios from "@/utils/axios";
import * as Types from "./../types/stamp-types";
import { Dispatch } from "@reduxjs/toolkit";
import { Toaster } from "@/components/toaster";
import { IStampForm } from "../interfaces";

export const changeStampInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    dispatch({
        type: Types.CHANGE_STAMP_FORM, payload: {
            name: name,
            value: value,
        }
    });
};

export const getStampListAction = (currentPage: number = 1, dataLimit: number = 10, searchText = '') => (dispatch: Dispatch) => {
    let url = `stamps?perPage=${dataLimit}&page=${currentPage}`

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
    dispatch({ type: Types.GET_STAMP_LIST, payload: response });

    axios.get(url)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_STAMP_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_STAMP_LIST, payload: response })
        })
}

export const getStampsByProposalAction = (proposalNo: string) => (dispatch: Dispatch) => {
    if (proposalNo === undefined || proposalNo === '') {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.SET_STAMP_FORM, payload: response });

    axios.get(`stamps/proposals/${proposalNo}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SET_STAMP_FORM, payload: response });
            Toaster('success', response.message);
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SET_STAMP_FORM, payload: response })
        });
}

export const submitStampAction = (stampForm: IStampForm, router: any) => (dispatch: Dispatch) => {
    if (stampForm.proposal_id === undefined || stampForm.proposal_id === 0) {
        Toaster('error', 'Please search a proposal first.');
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.SAVE_STAMP_FORM, payload: response });

    axios.post(`stamps`, stampForm)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SAVE_STAMP_FORM, payload: response });
            Toaster('success', response.message);
            router.push('/stamps');
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SAVE_STAMP_FORM, payload: response })
        });
}
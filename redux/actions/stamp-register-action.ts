import axios from "@/utils/axios";
import * as Types from "@/redux/types/stamp-types";
import { Dispatch } from "@reduxjs/toolkit";
import { Toaster } from "@/components/toaster";
import { IStampBalace, IStampForm } from "@/redux/interfaces";
import { getStampBalanceDetail } from "./stamp-allotment-action";

export const changeStampInputValue = (name: string, value: any, stampBalance: IStampBalace) => (dispatch: Dispatch) => {
    dispatch({
        type: Types.CHANGE_STAMP_REGISTER_FORM,
        payload: {
            name: name,
            value: value,
            stampBalance
        }
    });
};

export const getStampListAction = (currentPage: number = 1, dataLimit: number = 10, searchText = '') => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_STAMP_LIST, payload: response });

    axios.get(`stamp-register?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
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

    axios.get(`stamp-register/proposals/${proposalNo}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SET_STAMP_FORM, payload: response });
            dispatch({ 
                type: Types.CHANGE_STAMP_REGISTER_FORM, 
                payload: {
                    name: 'proposal_id',
                    value: res.data.proposal_id
                }
            });
            Toaster('success', response.message);
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SET_STAMP_FORM, payload: response })
        });
}

export const submitProposalStampRegisterAction = (
    stampForm: IStampForm,
    router: any
) => (dispatch: Dispatch) => {
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

    axios.post(`stamp-register`, stampForm)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SAVE_STAMP_FORM, payload: response });
            dispatch(getStampBalanceDetail());
            Toaster('success', response.message);
            router.push('/stamp-register');
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SAVE_STAMP_FORM, payload: response })
        });
}
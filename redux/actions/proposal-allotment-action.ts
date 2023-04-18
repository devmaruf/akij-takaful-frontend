
import axios from "@/utils/axios";
import { Dispatch } from "@reduxjs/toolkit";
import * as Types from "@/redux/types/proposal-type";
import { Toaster } from "@/components/toaster";

export const getAllotedProposalAction = (projectId: number, branchId: number, page: number = 1) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: {},
    };
    dispatch({ type: Types.PRINT_PROPOSAL, payload: response });

    axios.get(`/proposal-allotments?project_id=${projectId}&branch_id=${branchId}&page=${page}`)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            Toaster('success', response.message);
            dispatch({ type: Types.PRINT_PROPOSAL, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.PRINT_PROPOSAL, payload: response });
        });
}

export const allotProposalAction = (proposalPrintData: object) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: {},
    };
    dispatch({ type: Types.PRINT_PROPOSAL, payload: response });

    axios.post(`/proposal-allotments`, proposalPrintData)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            Toaster('success', response.message);
            dispatch({ type: Types.PRINT_PROPOSAL, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.PRINT_PROPOSAL, payload: response });
        });
}

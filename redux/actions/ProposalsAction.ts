import * as Types from "./../types/ProposalsType";
import Axios from "axios";
import { Toaster } from "@/components/toaster";

const BASE_URL = process.env.BASE_URL;

console.log('BASE_URL :>> ', BASE_URL);
export const handleChangeProposalInput = (name: string, value: string) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_PROPOSALS_INPUT, payload: data });
};

/**
 * Get plan list for dropdown menu list
 * @returns data
 */
export const getPlanList = () => (dispatch: any) => {
    Axios.get(`${BASE_URL}/plans/dropdown/list`)
        .then((res) => {
            if (res.status === 200) {
                dispatch({ type: Types.GET_PLAN_LIST, payload: res.data.data });
            }
        });
};


/**
 * 
 * @param proposalInput object
 */
export const submitProposal = (proposalInput: object) => (dispatch: any) => {
    if (proposalInput.proposal_no === "") {
        Toaster("error", "Proposal No can't be blank!");
        return false;
    }
    if (proposalInput.proposer_name === "") {
        Toaster("error", "Proposal name can't be blank!");
        return false;
    }
    if (proposalInput.plan_id === "") {
        Toaster("error", "Plan can't be blank!");
        return false;
    }
    if (proposalInput.fa_code === "") {
        Toaster("error", "Fa code can't be blank!");
        return false;
    }
    if (proposalInput.initial_sum_assured === "") {
        Toaster("error", "Initial sum assured can't be blank!");
        return false;
    }
    if (proposalInput.premium === "") {
        Toaster("error", "Initial premium can't be blank!");
        return false;
    }

    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_PROPOSAL, payload: responseData });

    Axios.post(`${BASE_URL}/proposals`, proposalInput)
        .then(res => {
            if (res.status === 200) {
                responseData.status = true;
                responseData.isLoading = false;
                responseData.message = res.data.message;
                Toaster('success', responseData.message);
                dispatch({ type: Types.SUBMIT_PROPOSAL, payload: responseData });
            }
        }).catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.SUBMIT_PROPOSAL, payload: responseData })
            }
        })
}
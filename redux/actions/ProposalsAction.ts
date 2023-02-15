import * as Types from "./../types/ProposalsType";
import Axios from "axios";
import { Toaster } from "@/components/toaster";

const BASE_URL = process.env.BASE_URL;


interface proposalInputType {
    proposal_no        : string;
    proposer_name      : string;
    plan_id            : number;
    fa_code            : string;
    initial_sum_assured: string;
    premium            : string;
}

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
export const submitProposal = (proposalInput: proposalInputType) => (dispatch: any) => {
    if (proposalInput.proposal_no === "") {
        Toaster("error", "Proposal No can't be blank!");
        return false;
    }
    if (proposalInput.proposer_name === "") {
        Toaster("error", "Proposal name can't be blank!");
        return false;
    }
    if (proposalInput.plan_id === 0) {
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
        status   : false,
        message  : "",
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

/**
 * Get Proposals List.
 * @param currentPage Number -- Default 1
 * @param dataLimit Number -- Default 10
 * @returns void Dispatch `GET_PROPOSAL_LIST` action
 */
export const getProposalList = (currentPage: number = 1, dataLimit: number = 10) => async (dispatch) => {
    let response = {
        status        : false,
        message       : "",
        isLoading     : true,
        data          : [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });
    try {
        const res = await Axios.get(`${BASE_URL}/proposals?perPage=${dataLimit}&currentPage=${currentPage}`);
        if (res.status === 200) {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data.data.data;
            response.paginationData = res.data.data;
            dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });
        }
    } catch (error) {
        response.isLoading = false;
        dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });
    }
}


/**
 * Get Proposals Details.
 * @param id Number -- Proposal id
 * @returns void Dispatch `GET_PROPOSAL_DETAILS` action
 */
export const getProposalDetails = (id: number | string) => async (dispatch) => {
    let response = {
        status   : false,
        message  : "",
        isLoading: true,
        data     : null,
        inputData: {},
    };
    dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });
    try {
        const res = await Axios.get(`${BASE_URL}/proposals/${id}`);
        if (res.status === 200) {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data.data;
            // Optional Data,
            response.inputData.project_id = 1;
            response.inputData.service_cell_id = 1;
            response.inputData.branch_id = 1;
            response.inputData.proposal_no = res.data.data.proposal_no;
            response.inputData.proposer_name = res.data.data.proposer_name;
            response.inputData.plan_id = res.data.data.plan_id;
            response.inputData.fa_code = res.data.data.fa_code;
            response.inputData.initial_sum_assured = res.data.data.initial_sum_assured;
            response.inputData.initial_premium = res.data.data.initial_premium;
            dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });
        }
    } catch (error) {
        response.isLoading = false;
        dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });
    }
}



/**
 * Update Proposals Data
 * @param proposalInput object
 */
export const updateProposal = (proposalInput: proposalInputType, id: number) => (dispatch: any) => {
    console.log("proposalInput", proposalInput);
    if (proposalInput.proposal_no === "") {
        Toaster("error", "Proposal No can't be blank!");
        return false;
    }
    if (proposalInput.proposer_name === "") {
        Toaster("error", "Proposal name can't be blank!");
        return false;
    }
    if (proposalInput.plan_id === 0) {
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
    dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData });

    Axios.put(`${BASE_URL}/proposals/${id}`, proposalInput)
        .then(res => {
            if (res.status === 200) {
                responseData.status = true;
                responseData.isLoading = false;
                responseData.message = res.data.message;
                Toaster('success', responseData.message);
                dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData });
            }
        }).catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData })
            }
        })
}

/**
 * Delete Proposals Details.
 * @param id Number -- Proposal id
 * @returns void Dispatch `GET_PROPOSAL_DETAILS` action
 */
export const deleteProposal = (id, setShowDeleteModal) => async (dispatch) => {
    let responseData = {
        status   : false,
        message  : "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData });
    try {
        const res = await Axios.delete(`${BASE_URL}/proposals/${id}`);
        if (res.status === 200) {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.data.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getProposalList());
            dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData });
        }
    } catch (error) {
        let responseLog = error.response;
        responseData.isLoading = false;
        if (typeof responseLog !== 'undefined') {
            const { request, ...errorObject } = responseLog;
            Toaster('error', responseLog.data.message);
            dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData })
        }
    }
}
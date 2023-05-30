import { Dispatch } from "@reduxjs/toolkit";

import axios from "@/utils/axios";
import * as Types from "@/redux/types/medical-type";
import { Toaster } from "@/components/toaster";
import { IProposal } from "@/redux/interfaces";
import { getDefaultSelectValue } from '@/utils/defaultSelectValue';
import { areaList, districtList, divisionList, getIdentityValidationMessageList } from "@/utils/proposal-dropdowns";

export const changeInputValue = (name: string, value: any, key: string) => (dispatch: any) => {
    dispatch({
        type: Types.CHANGE_INPUT_VALUE, payload: {
            data: {
                name: name,
                value: value,
            },
            key
        }
    });
};



export const submitProposal = (proposalInput: IProposal, router: any) => (dispatch: any) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_PROPOSAL, payload: response });

    axios({
        method: 'POST',
        url: `/proposals`,
        data: proposalInput
    })
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            // dispatch(getBranchList(1, 5));

            router.push('/proposals');
            dispatch({ type: Types.SUBMIT_PROPOSAL, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_PROPOSAL, payload: response });
        });
}

export const getMedicalList = (
    currentPage: number = 1,
    dataLimit: number = 10,
    search: string = '',
    isWorksheet: boolean = false
) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };

    dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });

    axios.get(`/proposals?perPage=${dataLimit}&page=${currentPage}&search=${search}&type=${isWorksheet ? 'worksheet' : 'proposal'}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });
        });
}

export const getMedicalDetails = (id: number | string) => (dispatch: Dispatch) => {
    if (isNaN(parseInt(id + ''))) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: null,
        inputData: {},
    };
    dispatch({ type: Types.GET_MEDICAL_DETAILS, payload: response });

    axios.get(`/medical/${parseInt(id + '')}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data;

            response.inputData = res.data;
            dispatch({ type: Types.GET_MEDICAL_DETAILS, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_MEDICAL_DETAILS, payload: response });
        });
}

export const updateMedical = (proposalInput: proposalInputType, id: number, router) => (dispatch: any) => {
    if (proposalInput.proposal_no === "") {
        Toaster("error", "Proposal No can't be blank!");
        return false;
    }
    if (proposalInput.project_id === "") {
        Toaster("error", "Please select a bank.");
        return false;
    }
    if (proposalInput.branch_id === "") {
        Toaster("error", "Please select a branch.");
        return false;
    }
    if (proposalInput.initial_sum_assured === "") {
        Toaster("error", "Please give initial sum assured.");
        return false;
    }
    if (proposalInput.premium === "") {
        Toaster("error", "Please give initial premium.");
        return false;
    }
    if (proposalInput.agent_id === "") {
        Toaster("error", "Please select an agent.");
        return false;
    }

    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData });

    axios.put(`/proposals/${id}`, {
        ...proposalInput,
        id
    })
        .then(res => {
            console.log('res', res)
            if(res.data.data.med_id){
                router.push(`/medical/edit?id=${res.data.data.med_id}`);
            }
            responseData.status = true;
            responseData.isLoading = false;
            responseData.message = res.data.message;
            Toaster('success', responseData.message);
            dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData });
            router.push('/proposals');
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData })
        })
}

export const deleteMedical = (id, setShowDeleteModal) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData });

    axios.delete(`/proposals/${id}`)
        .then(res => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.data.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getProposalList());
            dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData });
        })
        .catch(error => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData })
        });
}

export const getPlanDropdownList = () => (dispatch: Dispatch) => {
    axios.get(`/plans/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_PLAN_DROPDOWN, payload: res.data });
        });
};



export const handleCheckIdentity = (value: any) => (dispatch: Dispatch) => {
    const data = {
        isDisabledField: true,
        label: "",
        message: "",
        value: "",
        minLength: 1,
        maxLength: 100
    }
    if (value == 'nid') {
        data.isDisabledField = false;
        data.label = "NID Number"
        data.message = getIdentityValidationMessageList.nid;
        data.value = value;
        data.minLength = 10;
        data.maxLength = 17;
    } else if (value == 'passport') {
        data.isDisabledField = false;
        data.label = "Passport No"
        data.message = getIdentityValidationMessageList.passport;
        data.value = value;
        data.minLength = 17;
        data.maxLength = 20;
    } else if (value == 'brc') {
        data.isDisabledField = false;
        data.label = "Birth Certificate No"
        data.message = getIdentityValidationMessageList.brc;
        data.value = value;
        data.minLength = 17;
        data.maxLength = 20;
    } else {
        data.isDisabledField = true;
        data.label = "ID No"
        data.message = "Please select identity type first";
        data.value = value;
        data.minLength = 10;
        data.maxLength = 17;
    }
    dispatch({ type: Types.CHECKED_IDENTITY, payload: data });
}

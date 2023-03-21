import * as Types from "./../types/proposal-type";
import axios from "@/utils/axios";
import { Toaster } from "@/components/toaster";
import { IProposal } from "../interfaces";
import { getDefaultSelectValue } from '@/utils/defaultSelectValue';
import { areaList, districtList, divisionList } from "@/utils/proposal-dropdowns";
import { Dispatch } from "@reduxjs/toolkit";

export const changeInputValue = (name: string, value: any, key: string) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: { data, key } });
};

export const changeNomineeInputValue = (name: string, value: any, key: string, index: number, proposalInput: any) => (dispatch: void | any) => {
    // let proposalInputUpdated = {
    //     ...proposalInput,
    //     proposer_nominees: [],
    // };

    // proposalInput.proposer_nominees.forEach((nominee, previousIndex) => {
    //     if (index === previousIndex) {
    //         const nomineeUpdated = {
    //             ...nominee,
    //         };
    //         nomineeUpdated[key][name] = value;
    //         proposalInputUpdated.proposer_nominees.push(nomineeUpdated);
    //     } else {
    //         proposalInputUpdated.proposer_nominees.push(nominee);
    //     }
    // });

    // dispatch({ type: Types.CHANGE_NOMINEE_INPUT, payload: proposalInputUpdated });
    const nominees = proposalInput.proposer_nominees;
    const nomineeToUpdate = nominees[index];

    const updatedNominee = {
        ...nomineeToUpdate,
        [key]: {
            ...nomineeToUpdate[key],
            [name]: value,
        },
    };

    const updatedNominees = [
        ...nominees.slice(0, index),
        updatedNominee,
        ...nominees.slice(index + 1),
    ];

    const proposalInputUpdated = {
        ...proposalInput,
        proposer_nominees: updatedNominees,
    };

    dispatch({ type: Types.CHANGE_NOMINEE_INPUT, payload: proposalInputUpdated });
};


export const submitProposal = (proposalInput: IProposal, router: any) => (dispatch: any) => {
    // if (proposalInput.proposal_no === "") {
    //     Toaster("error", "Proposal No can't be blank!");
    //     return false;
    // }

    // if (proposalInput.plan_id === 0) {
    //     Toaster("error", "Plan can't be blank!");
    //     return false;
    // }
    // if (proposalInput.fa_code === "") {
    //     Toaster("error", "Fa code can't be blank!");
    //     return false;
    // }
    // if (proposalInput.initial_sum_assured === "") {
    //     Toaster("error", "Initial sum assured can't be blank!");
    //     return false;
    // }
    // if (proposalInput.premium === "") {
    //     Toaster("error", "Initial premium can't be blank!");
    //     return false;
    // }

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

export const getProposalList = (currentPage: number = 1, dataLimit: number = 10, search: string = '') => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };

    dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });

    axios.get(`/proposals?perPage=${dataLimit}&currentPage=${currentPage}&search=${search}`)
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

export const getProposalDetails = (id: number | string) => (dispatch) => {
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
    dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });

    axios.get(`/proposals/${parseInt(id + '')}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data;
            // Optional Data,
            response.inputData = res.data;
            response.inputData.proposal_no = res.data.proposal_no;

            // response.inputData.project_id = 1;
            // response.inputData.branch_id = 1;
            // response.inputData.proposer_name = res.data.data.proposer_name;
            // response.inputData.plan_id = res.data.data.plan_id;
            // response.inputData.agent_id = res.data.data.agent_id;
            // response.inputData.initial_sum_assured = res.data.data.initial_sum_assured;
            // response.inputData.initial_premium = res.data.data.initial_premium;
            dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });
        });
}

export const updateProposal = (proposalInput: proposalInputType, id: number, router) => (dispatch: any) => {
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
    if (proposalInput.proposer_name === "") {
        Toaster("error", "Please give proposer name.");
        return false;
    }
    if (proposalInput.phone_no === "") {
        Toaster("error", "Please give proposer phone no.");
        return false;
    }
    if (proposalInput.plan_id === 0) {
        Toaster("error", "Please select a plan.");
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

    axios.put(`/proposals/${id}`, proposalInput)
        .then(res => {
            responseData.status = true;
            responseData.isLoading = false;
            responseData.message = res.data.message;
            Toaster('success', responseData.message);
            dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData });
            router.push('/proposals');
            console.log('update res', res);
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData })
        })
}

export const deleteProposal = (id, setShowDeleteModal) => (dispatch: Dispatch) => {
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

export const isSameAddressCheck = (status: boolean, permanentAddress: any) => (dispatch) => {
    let defaultDivision;
    let defaultDistrict;
    let defaultArea;

    if (status === true) {
        if (!permanentAddress.division_id || !permanentAddress.district_id || !permanentAddress.area_id || !permanentAddress.post_office_name || !permanentAddress.street_address) {
            status = false;
            Toaster('error', "Please at first fill up your permanent address before checked it.");
        } else {
            status = true;
            defaultDivision = getDefaultSelectValue(divisionList, permanentAddress.division_id);
            defaultDistrict = getDefaultSelectValue(districtList, permanentAddress.district_id)
            defaultArea = getDefaultSelectValue(areaList, permanentAddress.area_id);
        }
    }

    const data = {
        status: status,
        permanentAddress: {
            ...permanentAddress,
            defaultDivision: defaultDivision,
            defaultDistrict: defaultDistrict,
            defaultArea: defaultArea,
        }
    }

    dispatch({ type: Types.IS_SAME_ADDRESS_STATUS, payload: data });
}

export const printProposalAction = (proposalPrintData: object) => (dispatch: any) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
    };
    dispatch({ type: Types.PRINT_PROPOSAL, payload: response });

    axios.post(`/proposals/print`, proposalPrintData)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            response.data = res.data;
            Toaster('success', response.message);
            dispatch({ type: Types.PRINT_PROPOSAL, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.PRINT_PROPOSAL, payload: response });
        });
}


export const handleCheckIdentity = (value: any) => (dispatch) => {
    const data = {
        isDisabledField: true,
        label: "",
        message: "",
        value: "",
        minLength: 1,
        maxLength: 100
    }
    console.log('value :>> ', value);
    if (value == 'nid') {
        data.isDisabledField = false;
        data.label = "NID Number"
        data.message = "NID minimum length must be 17/13 digits or 10 digit for smart card";
        data.value = value;
        data.minLength = 10;
        data.maxLength = 17;
    } else if (value == 'passport') {
        data.isDisabledField = false;
        data.label = "Passport No"
        data.message = "Passport minimum length must be 17 digits";
        data.value = value;
        data.minLength = 17;
        data.maxLength = 20;
    } else if (value == 'brc') {
        data.isDisabledField = false;
        data.label = "Birth Certificate No"
        data.message = "Birth certificate minimum length must be 17 digits";
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

export const createPreviewProposalAndRedirectAction = (router) => (dispatch) => {
    const source = axios.CancelToken.source();

    axios.post('/proposals/create-preview-proposal', {
        cancelToken: source.token
    })
        .then(res => {
            router.push(`/proposals/create-basic?id=${res.data.id}`);
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.log(error);
            }
        });

    return () => {
        source.cancel('Request canceled by component unmount');
    };
}

export const addMultipleNomineeForm = () => (dispatch) => {
    dispatch({ type: Types.ADD_NOMINEE_FORM, payload: {} });
}

export const removeMultipleNomineeForm = (nomineeList: any[], index: number) => (dispatch) => {
    const newNomineeList = nomineeList.slice(0, index).concat(nomineeList.slice(index + 1));
    dispatch({ type: Types.REMOVE_NOMINEE_FORM, payload: newNomineeList });
}
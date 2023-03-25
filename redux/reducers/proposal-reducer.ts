import { IProposal, IProposalBasicInput } from "../interfaces";
import * as Types from "../types/proposal-type";
import { generateDropdownList } from "@/utils/dropdown";

const defaultProposerNominee = {
    id: 0,
    proposal_id: 0,
    priority: 1,
    proposal_personal_information: {
        proposal_nominee_id: null,
        full_name: '',
        father_name: '',
        mother_name: '',
        spouse_name: '',
        email: '',
        mobile_no: '',
        marital_status: '',
        identity_type: '',
        gender: '',
        id_no: '',
        dob: '',
        occupation: '',
        relation: '',
        height: 0,
        height_inch: 0,
        height_unit: 'ft',
        weight: 0,
        weight_unit: 'kg',
        allocation: '',
    },
    proposer_permanent_address: {
        proposal_nominee_id: 1,
        street_address: '',
        post_office_name: '',
        address_type: 'permanent',
        area_id: 0,
        area_name: '',
        district_id: 0,
        district_name: '',
        division_id: 0,
        division_name: '',
        defaultDivision: {},
        defaultDistrict: {},
        defaultArea: {},
        is_same_address: false,
    },
    proposer_present_address: {
        proposal_nominee_id: null,
        street_address: '',
        post_office_name: '',
        address_type: 'present',
        area_id: 0,
        area_name: '',
        district_id: 0,
        district_name: '',
        division_id: 0,
        division_name: '',
        defaultDivision: {},
        defaultDistrict: {},
        defaultArea: {},
        is_same_address: false,
    },
    proposer_bank_information: {
        proposal_nominee_id: null,
        bank_name: '',
        bank_branch_name: '',
        bank_account_no: '',
        bank_account_holder_name: '',
    },
    proposer_guardian: {
        proposal_nominee_id: null,
        name: '',
        phone_no: '',
        dob: '',
        id_no: '',
        relation: '',
    },
}

const initialState: IProposal = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    proposalsList: [],
    paginationData: [],
    loadingDetails: false,
    planDropdownList: [],
    proposalDetails: {},
    isSameAddress: false,
    isNomineeSameAddress: false,
    proposalInput: {
        project_id: 0,
        branch_id: 0,
        proposal_no: '',
        plan_id: 0,
        agent_id: 0,
        initial_sum_assured: 0,
        initial_premium: 0,
        proposer_name: '',
        phone_no: '',
        proposal_personal_information: {},
        proposer_present_address: {},
        proposer_permanent_address: {},
        proposer_bank_information: {},
        proposer_guardian: {},
        proposer_nominees: [defaultProposerNominee],
        underwriting_questionnaires: [],
        status: 'creating',
    },
    printProposalList: [],
    identity_type: {
        isDisabledField: true,
        label: "ID No",
        message: "Please select identity type first",
        value: "",
        minLength: 10,
        maxLength: 17,
    },
};


function ProposalsReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const updatedProposalInput: IProposalBasicInput = {
                ...state.proposalInput
            }

            if (action.payload.key === '') {
                updatedProposalInput[action.payload.data.name] = action.payload.data.value;
            } else {
                updatedProposalInput[action.payload.key] = {
                    ...updatedProposalInput[action.payload.key],
                    [action.payload.data.name]: action.payload.data.value
                };
            }

            return {
                ...state,
                proposalInput: updatedProposalInput,
            };

        case Types.CHANGE_NOMINEE_INPUT:
            return {
                ...state,
                proposalInput: action.payload,
            };

        case Types.IS_NOMINEE_SAME_ADDRESS:
            return {
                ...state,
                proposalInput: action.payload.proposalInputUpdated,
                isNomineeSameAddress: action.payload.status,
            };

        case Types.IS_SAME_ADDRESS_STATUS:
            const prevProposalInput = { ...state.proposalInput };
            if (action.payload.status === true) {
                prevProposalInput.proposer_present_address = action.payload.permanentAddress;
            } else {
                prevProposalInput.proposer_present_address = initialState.proposalInput.proposer_present_address
            }
            return {
                ...state,
                proposalInput: prevProposalInput,
                isSameAddress: action.payload.status
            };

        case Types.GET_PLAN_DROPDOWN:
            return {
                ...state,
                planDropdownList: generateDropdownList(action.payload),
            };

        case Types.GET_PLAN_LIST:
            return {
                ...state,
                planList: getPlanList(action.payload),
            };

        case Types.SUBMIT_PROPOSAL:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    proposalInput: initialState.proposalInput
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_PROPOSAL_LIST:
            return {
                ...state,
                proposalsList: action.payload.data,
                paginationData: action.payload.paginationData,
                isLoading: action.payload.isLoading,
            };

        case Types.GET_PROPOSAL_DETAILS:

            const inputData = action.payload.inputData;
            const proposalPrevInput = { ...state.proposalInput, inputData }

            let intersectionObject = Object.keys(proposalPrevInput).reduce((obj, key) => {
                if (key in inputData) {
                    obj[key] = inputData[key];
                }
                if (obj[key] == null) {
                    obj[key] = proposalPrevInput[key]
                }
                return obj;
            }, {});

            return {
                ...state,
                loadingDetails: action.payload.isLoading,
                proposalInput: {
                    ...intersectionObject,
                    proposer_nominees: intersectionObject?.proposer_nominees?.length === 0 ? [defaultProposerNominee] : intersectionObject.proposer_nominees
                },
                proposalDetails: action.payload.data,
            };

        case Types.UPDATE_PROPOSAL:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    proposalInput: initialState.proposalInput
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.DELETE_PROPOSAL:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };

        case Types.PRINT_PROPOSAL:
            console.log(action.payload);

            return {
                ...state,
                printProposalList: action.payload.data,
                isLoading: action.payload.isLoading,
            };

        case Types.CHECKED_IDENTITY:
            return {
                ...state,
                identity_type: action.payload,
            }

        case Types.ADD_NOMINEE_FORM:
            let proposalInputValues = { ...state.proposalInput }
            let newNomineeList = [...proposalInputValues.proposer_nominees, proposalInputValues.proposer_nominees[0]]
            proposalInputValues.proposer_nominees = newNomineeList;
            return {
                ...state,
                proposalInput: proposalInputValues,
            }

        case Types.REMOVE_NOMINEE_FORM:
            let getPreviousValue = { ...state.proposalInput }
            getPreviousValue.proposer_nominees = action.payload;
            return {
                ...state,
                proposalInput: getPreviousValue
            }

        default:
            break;
    }
    return state;
}

const getPlanList = (data: any[]) => {
    let options: any[] = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.id,
                label: item.name,
            };
            options.push(itemData);
        });
    }
    return options;
};

export default ProposalsReducer;
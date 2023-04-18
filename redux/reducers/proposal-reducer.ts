// import { Toaster } from "@/components/toaster";
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

    concurrentProposalsList: [],
    isConcurrentListLoading: false,
    concurrentPaginationData: [],

    previousPoliciesList: [],
    isPreviousPolicListLoading: false,
    previousPaginationData: [],

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
        product_id: 0,
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
        basic_premium: 0,
        total_premium: 0,
        sum_at_risk: 0,
        total_sum_at_risk: 0,
        term: 0,
        policy_issue_date: '',
        commencement_date: '',
        risk_date: '',
        mode: '',
        rider_selection: '',
        rider_class: '',
        rider_adnd: 0,
        rider_adb: 0,
        rider_hi: 0,
        rider_ci: 0,
        product_rate: 0,
        sum_assured: 0,
        rider_premium: 0,
        rider_sum_assured: 0,
        occupation_extra: 0,
        extra_mortality: 0,
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
    productDetails: {},
};

function ProposalsReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            let updatedProposalInput: IProposalBasicInput = {
                ...state.proposalInput
            }

            if (action.payload.key === '') {
                updatedProposalInput[action.payload.data.name] = action.payload.data.value;
                // Handle premium information changes
                updatedProposalInput = handleProposalPremiumInformationChanges(
                    action.payload.data.name,
                    action.payload.data.value,
                    updatedProposalInput,
                    state.productDetails
                )
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
                planList: generateDropdownList(action.payload),
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

        case Types.GET_CONCURRENT_PROPOSAL_LIST:
            return {
                ...state,
                concurrentProposalsList: action.payload.data,
                concurrentPaginationData: action.payload.paginationData,
                isConcurrentListLoading: action.payload.isLoading,
            };

        case Types.GET_PREVIOUS_POLICY_LIST:
            return {
                ...state,
                previousPoliciesList: action.payload.data,
                previousPaginationData: action.payload.paginationData,
                isPreviousPolicListLoading: action.payload.isLoading,
            };

        case Types.GET_PROPOSAL_DETAILS:

            const inputData = action.payload.inputData;
            return {
                ...state,
                loadingDetails: action.payload.isLoading,
                proposalInput: {
                    ...state.proposalInput,
                    ...inputData,
                    proposer_nominees: inputData?.proposer_nominees?.length === 0 ? [defaultProposerNominee] : inputData.proposer_nominees
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
            return {
                ...state,
                printProposalList: action.payload.data,
                paginationData: action.payload.paginationData,
                isLoading: action.payload.isLoading,
            };

        case Types.CHECKED_IDENTITY:
            return {
                ...state,
                identity_type: action.payload,
            }

        case Types.ADD_NOMINEE_FORM:
            return {
                ...state,
                proposalInput: {
                    ...state.proposalInput,
                    proposer_nominees: [
                        ...state.proposalInput.proposer_nominees,
                        {
                            ...defaultProposerNominee
                        }
                    ]
                },
            }

        case Types.REMOVE_NOMINEE_FORM:
            let getPreviousValue = { ...state.proposalInput }
            getPreviousValue.proposer_nominees = action.payload;
            return {
                ...state,
                proposalInput: getPreviousValue
            }

        case 'GET_PRODUCT_DETAILS':
            return {
                ...state,
                proposalInput: {
                    ...state.proposalInput,
                    productDetails: action.payload.data,
                }
            };

        default:
            break;
    }
    return state;
}

const handleProposalPremiumInformationChanges = (name: string, value: any, proposalInput: IProposalBasicInput, productDetails) => {
    let updatedProposalInput = {
        ...proposalInput
    };

    // Update occupation extra percentage.
    updatedProposalInput.occupation_extra = parseFloat(updatedProposalInput?.sum_assured) * (parseFloat(updatedProposalInput?.occupation_extra_percentage ?? 0) / 100)

    if (name === 'rider_selection_hi' || name === 'rider_selection_ci' || name === 'rider_selection_adnd' || name === 'rider_selection_adb') {
        updatedProposalInput.rider_selection = getRiderSelection(name, value);
    }

    if (name === 'rider_class' && (value === 'class1' || value === 'class2' || value === 'class3')) {
        const values = getRiderSelectionValues(value);

        updatedProposalInput.rider_adb = values?.rider_adb;
        updatedProposalInput.rider_adnd = values?.rider_adnd;
        updatedProposalInput.rider_hi = values?.rider_hi;
        updatedProposalInput.rider_ci = values?.rider_ci;
    }

    if (productDetails.is_dps) {
        updatedProposalInput.mode = 'monthly';
    }

    if (productDetails.is_dps) {
        // Update sum assured
        updatedProposalInput.sum_assured = getSumAssured(
            updatedProposalInput,
            productDetails
        );
    } else {
        // Update basic premium
        updatedProposalInput.basic_premium = getBasicPremium(
            updatedProposalInput,
            productDetails
        );
    }

    // Calculdate rider premium
    updatedProposalInput.rider_premium = getRiderPremium(
        updatedProposalInput.rider_selection,
        updatedProposalInput.mode,
        updatedProposalInput.rider_class,
        updatedProposalInput.rider_sum_assured,
        updatedProposalInput
    );

    // Update total premium
    updatedProposalInput.total_premium = parseFloat(updatedProposalInput?.basic_premium ?? 0)
        + parseFloat(updatedProposalInput?.rider_premium ?? 0)
        + parseFloat(updatedProposalInput?.occupation_extra ?? 0)
        + parseFloat(updatedProposalInput?.extra_mortality ?? 0)

    // Update total sum at risk ->
    // It would be handled from ConcurrentProposal component.
    // updatedProposalInput.total_sum_at_risk = parseFloat(updatedProposalInput?.sum_at_risk ?? 0)
    //     + 0;

    return updatedProposalInput;
}

const getRiderSelection = (name: string, value: string) => {
    if (name === 'rider_selection_hi') {
        value = 'rider_hi';
    } else if (name === 'rider_selection_ci') {
        value = 'rider_ci';
    } else if (name === 'rider_selection_adnd') {
        value = 'rider_adnd';
    } else if (name === 'rider_selection_adb') {
        value = 'rider_adb';
    }

    return value;
}

const getRiderSelectionValues = (value: string) => {
    if (value === 'class1') {
        return {
            rider_adnd: '3.5',
            rider_adb: '1.5',
            rider_hi: '0',
            rider_ci: '0',
        }
    } else if (value === 'class2') {
        return {
            rider_adnd: '4.5',
            rider_adb: '2.5',
            rider_hi: '0',
            rider_ci: '0',
        }
    } else if (value === 'class3') {
        return {
            rider_adnd: '5.5',
            rider_adb: '3.5',
            rider_hi: '0',
            rider_ci: '0',
        }
    }
}

/**
   * getRiderPremium
   *
   * Yearly & Single>>(sum assured * rider Rate)/1000 [Rate comes based on Rider Class]
   * halfYearly >>(sum assured * rider  Rate)/1000*.525 [Rate comes based on Rider Class]
   * quarterly=(sum assured * rider  rate)/1000*.275 [Rate comes based on Rider Class]
   * monthly=(sum assured * rider  rate)/1000*.0925 [Rate comes based on Rider Class]
   */
const getRiderPremium = (riderSelection, mode, riderClass, riderSumAssured, proposalInput) => {
    let riderPremimum = 0;
    const riderRate = proposalInput?.[riderSelection];

    if (riderSumAssured === undefined
        || !(riderSumAssured > 0)
        || riderRate === undefined
        || !(riderRate > 0)
        || mode === undefined
        || mode?.length <= 0
    ) {
        riderPremimum = 0;
    } else {
        if (mode === 'yearly' || mode === 'single') {
            riderPremimum = (riderSumAssured * riderRate) / 1000;
        } else if (mode === 'half_yearly') {
            riderPremimum = (riderSumAssured * riderRate) / 1000 * 0.525;
        } else if (mode === 'quarterly') {
            riderPremimum = (riderSumAssured * riderRate) / 1000 * 0.275;
        } else if (mode === 'monthly') {
            riderPremimum = (riderSumAssured * riderRate) / 1000 * 0.0925;
        }
    }

    return riderPremimum.toFixed(3);
}

/**
 * Calculate Basic Premium amount.
 *
 * Yearly&Single=(sum assured * rate)/1000 [Rate comes based on Product]
 * halfYearly=(sum assured * rate)/1000*.525 [Rate comes based on Product]
 * Quarterly=(sum assured * rate)/1000*.275 [Rate comes based on Product]
 * monthly=(sum assured * rate)/1000*.0925 [Rate comes based on Product]
 */
const getBasicPremium = (proposalInput: IProposalBasicInput, productDetails) => {
    let basicPremium = 0;
    const mode = proposalInput?.mode;
    const productRate = parseFloat(`${getProductRate(proposalInput, productDetails) ?? 0}`);
    const sumAssured = proposalInput.sum_assured;

    if (productRate === null) {
        basicPremium = 0;
    } else if (mode === 'yearly' || mode === 'single') {
        basicPremium = (sumAssured * productRate) / 1000;
    } else if (mode === 'half_yearly') {
        basicPremium = (sumAssured * productRate) / 1000 * 0.525;
    } else if (mode === 'quarterly') {
        basicPremium = (sumAssured * productRate) / 1000 * 0.275;
    } else if (mode === 'monthly') {
        basicPremium = (sumAssured * productRate) / 1000 * 0.0925;
    }

    return basicPremium.toFixed(3);
}

const getProductRate = (proposalInput, productDetails) => {
    const age = proposalInput?.proposal_personal_information?.age;

    if (proposalInput?.product_id === 0
        || proposalInput?.product_id === ''
        || proposalInput?.term === ''
        || proposalInput?.term === 0
        || isNaN(age)
        || age === 0
        || age === ''
    ) {
        return null;
    }

    if (productDetails?.rates?.length > 0) {
        const rateDetail = productDetails.rates.find(obj =>
            parseInt(obj.age) === parseInt(age)
            && parseInt(obj.term) === parseInt(proposalInput?.term)
        );

        if (rateDetail === undefined || rateDetail === null) {
            // Toaster('error', 'Product rate not found for this age and term.');
            return proposalInput?.product_rate ?? 0;
        }

        // Toaster('success', 'Product rate found for this age and term.');
        return parseFloat(rateDetail?.rate ?? 0).toFixed(3);
    }

    // Toaster('error', 'Product rate not found for this age and term.');
    return proposalInput?.product_rate ?? 0;
}

const getSumAssured = (proposalInput, productDetails) => {
    let sumAssured = 0;

    const productRate = parseFloat(`${getProductRate(proposalInput, productDetails) ?? 0}`);
    const basicPremium = proposalInput.basic_premium;

    if (productRate === null) {
        sumAssured = 0;
    } else {
        sumAssured = (productRate * 100 / basicPremium)
    }

    return sumAssured.toFixed(3);
}

export default ProposalsReducer;

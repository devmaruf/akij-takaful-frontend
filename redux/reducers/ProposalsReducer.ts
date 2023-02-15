import * as Types from "./../types/ProposalsType";

interface ProposalInputType {
    project_id         : number;
    service_cell_id    : number;
    branch_id          : number;
    proposal_no        : string;
    proposer_name      : string;
    plan_id            : number;
    fa_code            : string;
    initial_sum_assured: number;
    initial_premium    : number;
}

interface InitialState {
    isLoading      : boolean;
    loadingDetails : boolean;
    isSubmitting   : boolean;
    isDeleting     : boolean;
    proposalInput  : ProposalInputType | any;
    proposalList   : any[];
    planList       : any[];
    proposalDetails: any;
    proposalsList  : any[];
    paginationData : any[];
}

const initialState: InitialState = {
    isLoading      : false,
    loadingDetails : false,
    isSubmitting   : false,
    isDeleting     : false,
    proposalList   : [],
    planList       : [],
    proposalDetails: null,
    proposalsList  : [],
    paginationData : [],
    proposalInput: {
        project_id         : 1,
        service_cell_id    : 1,
        branch_id          : 1,
        proposal_no        : "",
        proposer_name      : "",
        plan_id            : 0,
        fa_code            : "",
        initial_sum_assured: 0,
        initial_premium    : 0,
     // mobile_no          : 0
    },

};


function ProposalsReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_PROPOSALS_INPUT:
            const proposalInput = { ...state.proposalInput };
            proposalInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                proposalInput,
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
                    isSubmitting : action.payload.isLoading,
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
                proposalsList : action.payload.data,
                paginationData: action.payload.paginationData,
                isLoading     : action.payload.isLoading,
            };
        case Types.GET_PROPOSAL_DETAILS:
            return {
                ...state,
                loadingDetails : action.payload.isLoading,
                proposalInput  : action.payload.inputData,
                proposalDetails: action.payload.data,
            };
            case Types.UPDATE_PROPOSAL:
                if (action.payload.status === true) {
                    return {
                        ...state,
                        isSubmitting : action.payload.isLoading,
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
        default:
            break;
    }
    return state;
}
export default ProposalsReducer;

/**
 * Plan list 
 * @param data array
 * @returns options
 */
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
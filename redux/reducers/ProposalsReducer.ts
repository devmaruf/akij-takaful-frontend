import * as Types from "./../types/ProposalsType";

interface ProposalInputType {
    project_id: number;
    service_cell_id: number;
    branch_id: number;
    proposal_no: string;
    proposer_name: string;
    plan_id: number;
    fa_code: string;
    initial_sum_assured: number;
    initial_premium: number;
}

interface InitialState {
    isLoading: boolean;
    isSubmitting: boolean;
    proposalInput: ProposalInputType | any;
    proposalList: any[];
    planList: any[];
    data: any;
    proposalsList: any[];
    paginationData: any[];
}

const initialState: InitialState = {
    isLoading: false,
    isSubmitting: false,
    proposalList: [],
    planList: [],
    data: null,
    proposalsList: [],
    paginationData: [],
    proposalInput: {
        project_id: 1,
        service_cell_id: 1,
        branch_id: 1,
        proposal_no: "",
        proposer_name: "",
        plan_id: 0,
        fa_code: "",
        initial_sum_assured: 0,
        initial_premium: 0,
        //  mobile_no          : 0
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
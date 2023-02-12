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
    teamMemberList: any[];
    data: any;
}

const initialState: InitialState = {
    isLoading: false,
    isSubmitting: false,
    proposalInput: {
        project_id: 1,
        service_cell_id: 1,
        branch_id: 1,
        proposal_no: "",
        proposer_name: "",
        plan_id: 0,
        fa_code: "",
        initial_sum_assured: 0,
        initial_premium: 0
    },
    teamMemberList: [],
    data: null
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
        // case Types.ADD_SOCIAL_LINK:
        //     const prev_social_links = { ...state.teamMemberInput };
        //     prev_social_links.title = "";
        //     prev_social_links.link = "";
        //     prev_social_links.icon = "";
        //     prev_social_links.social_links = [action.payload, ...prev_social_links.social_links];
        //     return {
        //         ...state,
        //         teamMemberInput: prev_social_links,
        //     };
        // case Types.REMOVE_SOCIAL_LINK:
        //     const getPrevInputData = { ...state.teamMemberInput };
        //     getPrevInputData.social_links.splice(action.payload, 1);
        //     return {
        //         ...state,
        //         teamMemberInput: getPrevInputData,
        //     };
        // case Types.STORE_TEAM_MEMBER:
        //     if (action.payload.status === true) {
        //         return {
        //             ...state,
        //             isSubmitting: action.payload.isLoading,
        //             teamMemberInput: initialState.teamMemberInput
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             isSubmitting: action.payload.isLoading,
        //         };
        //     }
        // case Types.GET_TEAM_PROFILE_LIST:
        //     return {
        //         ...state,
        //         isLoading: action.payload.isLoading,
        //         teamMemberList: action.payload.data,
        //     }
        //     break;
        // case Types.GET_TEAM_MEMBER_DETAILS:
        //     return {
        //         ...state,
        //         isLoading: action.payload.isLoading,
        //         data: action.payload.data,
        //         teamMemberInput: action.payload.data
        //     }
        //     break;

        // case Types.UPDATE_TEAM_MEMBER:
        //     if (action.payload.status === true) {
        //         return {
        //             ...state,
        //             isSubmitting: action.payload.isLoading,
        //             teamMemberInput: initialState.teamMemberInput
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             isSubmitting: action.payload.isLoading,
        //         };
        //     }
        default:
            break;
    }
    return state;
}
export default ProposalsReducer;
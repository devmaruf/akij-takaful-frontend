import { generateDropdownList } from "@/utils/dropdown";
import { IBranch } from "../interfaces";
import * as Types from "./../types/BranchType";

const initialState: IBranch = {
    isLoading: false,
    isDeleting: false,
    isLoadingDetails: false,
    isSubmitting: false,
    branchList: [],
    branchPaginationData: [],
    branchDetails: null,
    branchDropdownList: [],
    branchInput: {
        project_id: 1,
        name: "",
        code: "",
    }
};


function BranchReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const branchInput = { ...state.branchInput };
            branchInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                branchInput,
            };
        case Types.SUBMIT_BRANCH:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    branchInput: initialState.branchInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_BRANCH_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                branchList: action.payload.data,
                branchPaginationData: action.payload.paginationData,
            };

        case Types.GET_BRANCH_DETAILS:
            console.log(action.payload)
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
                branchDetails: action.payload.data,
                branchInput: action.payload.data,
            };
        case Types.DELETE_BRANCH:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };
        case Types.GET_BRANCH_DROPDOWN:
            return {
                ...state,
                branchDropdownList: generateDropdownList(action.payload),
            };

            case Types.UPDATE_BRANCH:
                if (action.payload.status === true) {
                    return {
                        ...state,
                        isSubmitting: action.payload.isLoading,
                        branchInput: initialState.branchInput,
                    };
                } else {
                    return {
                        ...state,
                        isSubmitting: action.payload.isLoading,
                    };
                }

        default:
            break;
    }
    return state;
}
export default BranchReducer;


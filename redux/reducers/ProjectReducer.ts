import { getDropdownList } from "@/components/_utlities/dropdown";
import { IProject } from "../interfaces";
import * as Types from "./../types/ProjectType";

const initialState: IProject = {
    isLoading            : false,
    isDeleting           : false,
    isLoadingDetails     : false,
    isSubmitting         : false,
    projectOptionList    : [],
    projectList          : [],
    projectPaginationData: [],
    projectDetails       : null,
    projectInput         : {
        name             : "",
        code             : ""
    }
};


function ProjectReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const projectInput = { ...state.projectInput };
            projectInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                projectInput,
            };
        case Types.SUBMIT_PROJECT:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    projectInput: initialState.projectInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_PROJECT_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                projectList: action.payload.data,
                projectPaginationData: action.payload.paginationData,
                projectOptionList: getDropdownList(action.payload.data),
            };

        case Types.GET_PROJECT_DETAILS:
            console.log(action.payload)
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
                projectDetails: action.payload.data,
                projectInput: action.payload.data,
            };
            case Types.DELETE_PROJECT:
                return {
                    ...state,
                    isDeleting: action.payload.isLoading,
                };
        default:
            break;
    }
    return state;
}
export default ProjectReducer;


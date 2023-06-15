import { generateDropdownList } from "@/utils/dropdown";
import { IOccupationReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/occupation-types";

const initialState: IOccupationReducer = {
    isLoading: false,
    isDeleting: false,
    isLoadingDetails: false,
    isSubmitting: false,
    occupationList: [],
    occupationPaginationData: {},
    occupationDetails: null,
    occupationInput: {
       name: "",
       group: "",
       class: "",
    },
    occupations: [],
    occupationDropdownList: []
};

export default function OccupationReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const occupationInput = { ...state.occupationInput };
            occupationInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                occupationInput,
            };

        case Types.EMPTY_OCCUPATION_INPUT:
            return {
                ...state,
                occupationInput: initialState.occupationInput,
            };

        case Types.SUBMIT_OCCUPATION:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    occupationInput: initialState.occupationInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_OCCUPATION_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                occupationList: action.payload.data,
                occupationPaginationData: action.payload.paginationData,
            };

        case Types.GET_OCCUPATION_DETAILS:
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
                occupationDetails: action.payload.data,
                occupationInput: action.payload.data,
            };
        case Types.DELETE_OCCUPATION:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };
        case Types.UPDATE_OCCUPATION:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    occupationInput: initialState.occupationInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_OCCUPATION_LIST_BY_SEARCH:
            return {
                ...state,
                occupations: action.payload,
            };

        case Types.GET_OCCUPATION_DROPDOWN_LIST:
            return {
                ...state,
                productDropdownList: generateDropdownList(action.payload),
            };

        default:
            break;
    }
    return state;
}


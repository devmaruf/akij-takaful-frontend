import { generateDropdownList } from "@/utils/dropdown";
import { IRole } from "../interfaces";
import * as Types from "../types/role-type";

const initialState: IRole = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    roleList: [],
    rolesListPaginated: [],
    isRoleCreated: false,
    inputData: {
        id: '',
        role: '',
        isLoading: false,
        groupList: []
    },
};

function roleReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_ROLE_INPUT:
            return {
                ...state,
                inputData: {
                    ...state.inputData,
                    [action.payload.name]: action.payload.value
                }
            };

        case Types.GET_ROLE_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                rolesListPaginated: action.payload.rolesListPaginated,
                roleList: action.payload.rolesList,
            };

        case Types.GET_ROLE_PERMISSION_GROUPS:
            const updatedInputData = {
                ...state.inputData,
                isLoading: action.payload.isLoading,
                groupList: action.payload.data
            }
            return {
                ...state,
                inputData: updatedInputData
            };

        case Types.EMPTY_ROLE_STATUS:
            return {
                ...state,
                isRoleCreated: false,
                isLoading: false,
                inputData: initialState.inputData
            };
        case Types.GET_ROLE_LIST_DROPDOWN:
            return {
                ...state,
                roleList: generateDropdownList(action.payload)
            };

        case Types.ROLE_CHECKED:
            return {
                ...state,
                inputData: action.payload
            };

        case Types.ROLE_CHECKED_GROUP:
            return {
                ...state,
                inputData: action.payload
            };

        case Types.ROLE_ALL_CHECKED:
            return {
                ...state,
                inputData: action.payload
            };


        case Types.CREATE_ROLE:
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };

        case Types.GET_ROLE_DETAILS_DATA:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                inputData: {
                    id: action.payload.data?.role?.id ?? 0,
                    role: action.payload.data?.role?.name ?? '',
                    groupList: action.payload.data?.groups ?? [],
                },
            };

        default:
            break;
    }
    return state;
}

export default roleReducer;

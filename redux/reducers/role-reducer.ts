import { generateDropdownList } from "@/utils/dropdown";
import { checkAllPermissionIsChecked } from "@/utils/permissionChecked";
import { IRole } from "../interfaces";
import * as Types from "../types/role-type";

const initialState: IRole = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    roleList: [],
    roleListAll: [],
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
                roleListAll: action.payload.rolesList,
                // roleListOption: getUserRoleDropdown(action.payload.rolesList)
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
            const { indexParentRole, indexChild, checkboxStatus } = action.payload;
            let roleList = state.inputData.groupList.slice();
            roleList[indexParentRole].permissions[indexChild].isChecked = checkboxStatus;
            roleList[indexParentRole].isChecked = checkAllPermissionIsChecked(roleList, indexParentRole);
            return {
                ...state,
                inputData: {
                    ...state.inputData,
                    roleList
                }
            };


        case Types.ROLE_CHECKED_GROUP:
            const groupIndex = action.payload.index
            const isGroupChecked = action.payload.isGroupChecked
            const roles = state.inputData.groupList.slice();

            // get all the permissions in this group 
            // and make it checked or unchecked
            for (let i = 0; i < roles.length; i++) {
                if (i == groupIndex) {
                    roles[i].isChecked = isGroupChecked;
                    for (let j = 0; j < roles[i].permissions.length; j++) {
                        const permissionItem = roles[i].permissions[j];
                        permissionItem.isChecked = isGroupChecked;
                        roles[i].permissions[j] = permissionItem;
                    }
                }
            }
            return {
                ...state,
                inputData: {
                    ...state.inputData,
                    roleList
                }
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

        default:
            break;
    }
    return state;
}

export default roleReducer;


const checkedByGroup = (index: number, isCheckedStatus: boolean, roleInput: any) => {
    const roleList = roleInput.groupList;
    for (let i = 0; i < roleList.length; i++) {
        if (i == index) {
            roleList[i].isChecked = isCheckedStatus;
            for (let j = 0; j < roleList[i].permissions.length; j++) {
                const permissionItem = roleList[i].permissions[j];
                permissionItem.isChecked = isCheckedStatus;
                roleList[i].permissions[j] = permissionItem;
            }
        }
    }
    return roleInput;
}
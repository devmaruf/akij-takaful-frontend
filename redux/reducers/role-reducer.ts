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
    roleCreateMessage: '',
    inputData: {
        id: '',
        role: '',
        groupList: []
    },
};

function roleReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_ROLE_INPUT:
            const roleInputData = { ...state.inputData };
            roleInputData[action.payload.name] = action.payload.value;
            return {
                ...state,
                inputData: roleInputData
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
                    //roleList
                }
            };

            case Types.ROLE_ALL_CHECKED:
                let CheckroleList = state.inputData.groupList.slice();
                for (let i = 0; i < CheckroleList.length; i++) {
                    if (action.payload == true) {
                        CheckroleList[i].isChecked = true;
                    } else {
                        CheckroleList[i].isChecked = false;
                    }
                    for (let c = 0; c < CheckroleList[i].permissions.length; c++) {
                        const element = CheckroleList[i].permissions[c];
                        if (action.payload == true) {
                            CheckroleList[i].permissions[c].isChecked = true;
                        } else {
                            CheckroleList[i].permissions[c].isChecked = false;
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
        default:
            break;
    }
    return state;
}

export default roleReducer;
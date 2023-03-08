import axios from "@/utils/axios";
import { Toaster } from "@/components/toaster";
import * as Types from "./../types/role-type";

export const changeRoleInputAction = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value
  }
  dispatch({ type: Types.CHANGE_ROLE_INPUT, payload: formData })
}

export const getRoleList = (currentPage: number = 1, dataLimit: number = 10, searchText: string = '') => (dispatch) => {

  let roleURL = 'roles'

  if (dataLimit) {
    roleURL += `?perPage=${dataLimit}`;
  }
  if (searchText !== '') {
    roleURL += `&search=${searchText}`;
  }


  const response = {
    isLoading: true,
    status: false,
    message: '',
    rolesList: [],
    rolesListPaginated: null,
  };
  dispatch({ type: Types.GET_ROLE_LIST, payload: response });
  axios(roleURL)
    .then((res: any) => {
      response.isLoading = false;
      response.status = true;
      response.message = res.message;
      response.rolesList = res.data.data;
      response.rolesListPaginated = res.data;
      dispatch({ type: Types.GET_ROLE_LIST, payload: response });
    })
    .catch((error) => {
      response.isLoading = false;
      dispatch({ type: Types.GET_ROLE_LIST, payload: response });
    });
};

export const getRoleListDropdownAction = () => (dispatch) => {
  axios.get(`roles/dropdown/list`)
    .then((res: any) => {
      dispatch({ type: Types.GET_ROLE_LIST_DROPDOWN, payload: res.data });
    });
};


// export const getRoleDetailsData = (id) => (dispatch) => {
//   const responseList = {
//     isLoading: true,
//     data: []
//   };

//   dispatch({ type: Types.GET_ROLE_DETAILS_DATA, payload: responseList });

//   Axios
//     .get(`${baseUrl}roles/${id}`)
//     .then((res) => {
//       dispatch({ type: Types.GET_ROLE_DETAILS_DATA, payload: res.data.data });
//     });
// };

export const emptyRoleStatusMessage = () => (dispatch) => {
  dispatch({ type: Types.EMPTY_ROLE_STATUS, payload: null });
}

export const storeRoleAction = (inputData: any, router: any) => (dispatch) => {
  const response = {
    isLoading: true,
    status: false,
    message: '',
    data: null
  };
  dispatch({ type: Types.CREATE_ROLE, payload: response });

  axios.post(`/roles`, inputData)
    .then((res) => {
      response.status = true;
      response.message = res.message;
      response.isLoading = false;
      Toaster('success', response.message);
      dispatch({ type: Types.CREATE_ROLE, payload: response });
      router.push('/settings/roles');
    }).catch(err => {
      response.isLoading = false;
      dispatch({ type: Types.CREATE_ROLE, payload: response });
    });
};

export const getPermissionGroups = () => (dispatch) => {
  const response = {
    isLoading: true,
    status: false,
    message: '',
    data: [],
  }
  dispatch({ type: Types.GET_ROLE_PERMISSION_GROUPS, payload: response });

  axios(`/roles/permissions`)
    .then((res: any) => {
      response.isLoading = false;
      response.status = true;
      response.message = res.message;
      response.data = res.data;
      dispatch({ type: Types.GET_ROLE_PERMISSION_GROUPS, payload: response });
    });
};

export const allpermissionCheckboxSelectAction = (status, inputData) => (dispatch, getState) => {
  const { groupList } = inputData;
  const updatedGroupList = groupList.map(group => {
    const updatedPermissions = group.permissions.map(permission => ({
      ...permission,
      isChecked: status
    }));
    return {
      ...group,
      isChecked: status,
      permissions: updatedPermissions
    };
  });
  const updatedInputData = {
    ...inputData,
    groupList: updatedGroupList
  };
  dispatch({ type: Types.ROLE_ALL_CHECKED, payload: updatedInputData });
};

export const permissionGroupCheckboxSelectAction = (index, isGroupChecked, inputData) => (dispatch) => {
  const { groupList } = inputData;
  const selectedGroup = groupList[index];
  const updatedPermissions = selectedGroup.permissions.map(permission => ({
    ...permission,
    isChecked: isGroupChecked
  }));
  const updatedGroup = {
    ...selectedGroup,
    isChecked: isGroupChecked,
    permissions: updatedPermissions
  };

  const updatedGroupList = [...groupList];
  updatedGroupList[index] = updatedGroup;

  dispatch({
    type: Types.ROLE_CHECKED_GROUP,
    payload: {
      ...inputData,
      groupList: updatedGroupList
    }
  });
}

export const permissionCheckboxSelectAction = (checkboxStatus, indexChild, parentIndex, inputData) => (dispatch) => {
  let { groupList } = inputData;
  const updatedGroupList = groupList.map((group, groupIndex) => {
    const updatedPermissions = group.permissions.map((permission, permissionIndex) => ({
      ...permission,
      isChecked: (permissionIndex === indexChild && parentIndex === groupIndex) ? checkboxStatus : permission.isChecked
    }));
    return {
      ...group,
      permissions: updatedPermissions
    };
  });

  const updatedInputData = {
    ...inputData,
    groupList: updatedGroupList
  };

  dispatch({
    type: Types.ROLE_CHECKED,
    payload: updatedInputData
  });
};

export const checkGroupPermissionIsChecked = (permissionGroup, permissionGroupIndex) => {
  const getTotalPermissions = permissionGroup.permissions;
  const getTotalCheckedPermissions = getTotalPermissions.filter(permission => permission.isChecked);
  return getTotalPermissions.length === getTotalCheckedPermissions.length ? true : false;
}

export const checkAllPermissionIsChecked = (groupList) => {
  return groupList.every(permissionGroup => {
    const getTotalPermissions = permissionGroup.permissions;
    const getTotalCheckedPermissions = getTotalPermissions.filter(permission => permission.isChecked);
    return getTotalPermissions.length === getTotalCheckedPermissions.length;
  });
};
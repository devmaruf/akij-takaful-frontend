import axios from "@/utils/axios";
import * as Types from "../types/employee-type";
import { Toaster } from "@/components/toaster";
import { Dispatch } from "@reduxjs/toolkit";

export const changeInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

export const validateEmployeeForm = (employeeInput) => {
    if (employeeInput.first_name === "") {
        Toaster("error", "Please give first name.");
        return false;
    }
    if (employeeInput.last_name === "") {
        Toaster("error", "Please give last name.");
        return false;
    }
    if (employeeInput.email === "") {
        Toaster("error", "Please give employee email.");
        return false;
    }
    if (employeeInput.phone === "") {
        Toaster("error", "Please give employee phone no.");
        return false;
    }
    if (employeeInput.designation_id === "") {
        Toaster("error", "Please select a designation.");
        return false;
    }
    if (employeeInput.project_id === "") {
        Toaster("error", "Please select a bank");
        return false;
    }
    if (employeeInput.role_id === 0) {
        Toaster("error", "Please select a role.");
        return false;
    }

    return true;
}

export const createEmployee = (employeeInput, router, isAgent: boolean = false) => (dispatch: Dispatch) => {
    if (!validateEmployeeForm(employeeInput)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.CREATE_EMPLOYEE, payload: response });

    axios.post(`/${isAgent ? 'agents' : 'employees'}`, employeeInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            router.push(isAgent ? '/banca/agent' : '/employee');
            dispatch({ type: Types.CREATE_EMPLOYEE, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.CREATE_EMPLOYEE, payload: response });
        });
}

export const getEmployeeListAction = (currentPage: number = 1, dataLimit: number = 10, searchText: string = '', isAgent: boolean = false) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_EMPLOYEE_LIST, payload: response });

    const resourceUrl = isAgent ? 'agents' : 'employees';

    axios.get(`/${resourceUrl}?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_EMPLOYEE_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_EMPLOYEE_LIST, payload: response })
        })

}

export const getEmployeeDetails = (id: number | string, isAgent: boolean = false) => (dispatch: Dispatch) => {
    if (isNaN(id)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.GET_EMPLOYEE_DETAILS, payload: response });

    axios(`/${isAgent ? 'agents' : 'employees'}/${id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            const branches = res.data.branches;
            const branchIds = [];
            branches.forEach(branch => {
                branchIds.push({
                    label: branch.branch_name,
                    value: branch.branch_id,
                })
            });
            response.data.branch_ids = branchIds;
            dispatch({ type: Types.GET_EMPLOYEE_DETAILS, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_EMPLOYEE_DETAILS, payload: response });
        });
}

// export const handleUpdateProject = (projectInput, setShowUpdateModal) => (dispatch: Dispatch) => {
//     if (projectInput.name === "") {
//         Toaster("error", "Project name can't be blank!");
//         return false;
//     }
//     if (projectInput.code === "") {
//         Toaster("error", "Project code can't be blank!");
//         return false;
//     }

//     let responseData = {
//         status: false,
//         message: "",
//         isLoading: true,
//     };
//     dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData });

//     axios.put(`/projects/${projectInput.id}`, {
//         id: projectInput.id,
//         name: projectInput.name,
//         code: projectInput.code
//     })
//         .then(res => {
//             responseData.status = true;
//             responseData.isLoading = false;
//             responseData.message = res.data.message;
//             Toaster('success', responseData.message);
//             setShowUpdateModal(false);
//             dispatch(getProjectList(1, 5));
//             dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData });
//         }).catch((error) => {
//             responseData.isLoading = false;
//             dispatch({ type: Types.SUBMIT_PROJECT, payload: responseData })
//         })
// }

// export const deleteProject = (id: number, setShowDeleteModal) => (dispatch: Dispatch) => {
//     let responseData = {
//         status: false,
//         message: "",
//         isLoading: true,
//     };
//     dispatch({ type: Types.DELETE_PROJECT, payload: responseData });
//     axios.delete(`/projects/${id}`)
//         .then((res) => {
//             responseData.isLoading = false;
//             responseData.status = true;
//             responseData.message = res.data.message;
//             Toaster('success', responseData.message);
//             setShowDeleteModal(false);
//             dispatch(getProjectList(1, 5));
//             dispatch({ type: Types.DELETE_PROJECT, payload: responseData });
//         }).catch((error) => {
//             responseData.isLoading = false;
//             dispatch({ type: Types.DELETE_PROJECT, payload: responseData })
//         })
// }


export const updateEmployee = (employeeInput, router: any, pageType: string = 'edit', isAgent: boolean = false) => (dispatch: Dispatch) => {
    if (!validateEmployeeForm(employeeInput)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        pageType,
    };
    dispatch({ type: Types.UPDATE_EMPLOYEE, payload: response });

    axios.put(`/${isAgent ? 'agents' : 'employees'}/${employeeInput.id}`, employeeInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            if (pageType !== 'profile') {
                router.push(isAgent ? '/banca/agent' : '/employee');
            }
            dispatch({ type: Types.UPDATE_EMPLOYEE, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_EMPLOYEE, payload: response });
        });
}

export const getEmployeeRolesDropdownList = (isAgent: boolean = false) => (dispatch: Dispatch) => {
    axios.get(`/roles/dropdown/list?is_head_office=${isAgent ? 0 : 1}`)
        .then((res) => {
            dispatch({ type: Types.GET_EMPLOYEE_ROLES, payload: res.data });
        })
}

export const getAgentsDropdownList = () => (dispatch: Dispatch) => {
    axios.get(`/agents/bank-executive/list`)
        .then((res) => {
            dispatch({ type: Types.GET_AGENT_DROPDOWN_LIST, payload: res.data });
        })
}
import axios from "@/utils/axios";
import * as Types from "../types/employee-type";
import { Toaster } from "@/components/toaster";

export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};


export const createEmployee = (employeeInput, router) => (dispatch: any) => {
    if (employeeInput.first_name === "") {
        Toaster("error", "First name can't be blank!");
        return false;
    }
    if (employeeInput.last_name === "") {
        Toaster("error", "Last name can't be blank!");
        return false;
    }
    if (employeeInput.email === "") {
        Toaster("error", "Employee email can't be blank!");
        return false;
    }
    if (employeeInput.phone === "") {
        Toaster("error", "Employee phone number can't be blank!");
        return false;
    }
    if (employeeInput.designation_id === "") {
        Toaster("error", "Employee designation can't be blank!");
        return false;
    }
    if (employeeInput.project_id === "") {
        Toaster("error", "Project can't be blank!");
        return false;
    }
    if (employeeInput.branch_ids && employeeInput.branch_ids.length < 1) {
        Toaster("error", "Minimum select one branch!");
        return false;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.CREATE_EMPLOYEE, payload: response });

    axios({
        method: 'POST',
        url: `/employees`,
        data: employeeInput
    })
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            router.push('/employee')
            dispatch({ type: Types.CREATE_EMPLOYEE, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.CREATE_EMPLOYEE, payload: response });
        });
}


export const getEmployeeList = (currentPage: number = 1, dataLimit: number = 10) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_EMPLOYEE_LIST, payload: response });

    axios.get(`/employees?perPage=${dataLimit}&currentPage=${currentPage}`)
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

export const getEmployeeDetails = (id: number | string) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.GET_EMPLOYEE_DETAILS, payload: response });

    axios(`/employees/${id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_EMPLOYEE_DETAILS, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_EMPLOYEE_DETAILS, payload: response });
        });
}

// export const handleUpdateProject = (projectInput, setShowUpdateModal) => (dispatch: any) => {
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

// export const deleteProject = (id: number, setShowDeleteModal) => (dispatch) => {
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

// export const getProjectListDropdown = () => (dispatch) => {
//     axios.get(`/projects/dropdown/list`)
//         .then((res) => {
//             dispatch({ type: Types.GET_PROJECT_DROPDOWN, payload: res.data });
//         })
// }
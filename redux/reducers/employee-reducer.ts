import { IEmployee } from "../interfaces";
import * as Types from "./../types/employee-type";

const initialState: IEmployee = {
    isLoading             : false,
    isDeleting            : false,
    isLoadingDetails      : false,
    isSubmitting          : false,
    employeeList          : [],
    employeePaginationData: [],
    employeeDetails       : {},
    employeeInput         : {
        first_name        : '',
        last_name         : '',
        email             : '',
        designation_id    : 0,
        role_id           : 1,
        project_id        : 0,
        branch_ids        : [],
        phone             : '',
        avatar            : '',
        password          : '',
        confirm_password  : '',
    }
};


function employeeReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const employeeInput = { ...state.employeeInput };
            employeeInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                employeeInput,
            };
        case Types.CREATE_EMPLOYEE:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    employeeInput: initialState.employeeInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_EMPLOYEE_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                employeeList: action.payload.data,
                employeePaginationData: action.payload.paginationData,
            };

        case Types.GET_EMPLOYEE_DETAILS:
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
                employeeDetails: action.payload.data,
                employeeInput: action.payload.data,
            };
        // case Types.DELETE_BRANCH:
        //     return {
        //         ...state,
        //         isDeleting: action.payload.isLoading,
        //     };
        default:
            break;
    }
    return state;
}
export default employeeReducer;


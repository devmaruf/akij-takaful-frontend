import { IExpense } from "../interfaces";
import * as Types from "../types/expense-type";
import { generateDropdownList } from "@/utils/dropdown";

const defaultExpenseItem = {
    item_name: "",
    item_quantity: 0,
    item_unit_amount: 0,
    grand_total: 0,
}

export const defaultExpenseForm = {
    expense_type_id: 0,
    name: "",
    items: [defaultExpenseItem]
}

const initialState: IExpense = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    loadingDetails: false,
    expensesList: [],
    paginationData: [],
    expenseDetails: {},
    expenseInput: defaultExpenseForm,
    expenseTypeDropdownList: [],
};

function ExpenseReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_EXPENSE_FORM:
            const expenseInput = { ...state.expenseInput };
            expenseInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                expenseInput,
            };

        case Types.SET_EXPENSE_FORM:
            return {
                ...state,
                isSearching: action.payload.isLoading,
                expenseInput: {
                    ...action.payload.data,
                    expenseInput: action.payload.data?.items?.length > 0 ?
                        action.payload.data?.items :
                        [defaultExpenseForm]
                },
            };
        case Types.GET_EXPENSES_LIST:
            return {
                ...state,
                expensesList: action.payload.data,
                paginationData: action.payload.paginationData,
                isLoading: action.payload.isLoading,
            };
        case Types.GET_EXPENSE_DETAILS:
            return {
                ...state,
                loadingDetails: action.payload.isLoading,
                expenseDetails: action.payload.data,
                expenseInput: {
                    ...action.payload.data,
                    items: action.payload.data?.items?.length > 0 ?
                        action.payload.data?.items :
                        [defaultExpenseForm]
                },
            };

            case Types.SUBMIT_EXPENSE:
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                  expenseInput: action.payload.status ? { ...defaultExpenseForm } : state.expenseInput
                };
            case Types.UPDATE_EXPENSE:
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                  expenseInput: action.payload.status ? { ...defaultExpenseForm } : state.expenseInput
                };

        case Types.DELETE_EXPENSE:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };

        case Types.EXPENSE_TYPE_DROPDOWN_LIST:
            return {
                ...state,
                expenseTypeDropdownList: generateDropdownList(action.payload),
            };
        default:
            break;
    }
    return state;
}


export default ExpenseReducer;
import { IExpense } from "../interfaces";
import * as Types from "../types/expense-type";
import { generateDropdownList } from "@/utils/dropdown";

const expenseItem = [
    {
        item_name: "",
        item_quantity: 0,
        item_unit_amount: 0
    }
]

const initialState: IExpense = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    expensesList: [],
    paginationData: [],
    loadingDetails: false,
    expenseDetails: {},
    expenseInput: {
        expense_type_id: 0,
        name: "",
        items: [expenseItem],
    },
};


function ExpenseReducer(state = initialState, action: any) {
    switch (action.type) {
        // case Types.CHANGE_NOMINEE_INPUT:
        //     return {
        //         ...state,
        //         expenseInput: action.payload,
        //     };


        case Types.GET_EXPENSES_LIST:
            return {
                ...state,
                expensesList: action.payload.data,
                paginationData: action.payload.paginationData,
                isLoading: action.payload.isLoading,
            };
        case Types.GET_EXPENSE_DETAILS:

            // const inputData = action.payload.inputData;
            // const proposalPrevInput = { ...state.expenseInput, inputData }

            // let intersectionObject = Object.keys(proposalPrevInput).reduce((obj, key) => {
            //     if (key in inputData) {
            //         obj[key] = inputData[key];
            //     }
            //     if (obj[key] == null) {
            //         obj[key] = proposalPrevInput[key]
            //     }
            //     return obj;
            // }, {});

            return {
                ...state,
                loadingDetails: action.payload.isLoading,
                // expenseInput: {
                //     ...intersectionObject,
                //     proposer_nominees: intersectionObject?.proposer_nominees?.length === 0 ? [defaultProposerNominee] : intersectionObject.proposer_nominees
                // },
                expenseDetails: action.payload.data,
            };
        // case Types.UPDATE_PROPOSAL:
        //     if (action.payload.status === true) {
        //         return {
        //             ...state,
        //             isSubmitting: action.payload.isLoading,
        //             expenseInput: initialState.expenseInput
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             isSubmitting: action.payload.isLoading,
        //         };
        //     }
        case Types.DELETE_EXPENSE:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };

        default:
            break;
    }
    return state;
}


export default ExpenseReducer;
import { generateDropdownList } from "@/utils/dropdown";
import { IDesignation } from "../interfaces";
import * as Types from "./../types/designation-type";

const initialState: IDesignation = {
    isLoading            : false,
    isDeleting           : false,
    isLoadingDetails     : false,
    isSubmitting         : false,
    designationDropdownList: [],
};


function designationReducer(state = initialState, action: any) {
    switch (action.type) {
        // case Types.CHANGE_INPUT_VALUE:
        //     const projectInput = { ...state.projectInput };
        //     projectInput[action.payload.name] = action.payload.value;
        //     return {
        //         ...state,
        //         projectInput,
        //     };
        case Types.GET_DESIGNATION_DROPDOWN:
            return {
                ...state,
                designationDropdownList: generateDropdownList(action.payload),
            };
        default:
            break;
    }
    return state;
}

export default designationReducer;

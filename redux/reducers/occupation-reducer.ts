import { generateDropdownList } from "@/utils/dropdown";
import { IOccupationReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/occupation-types";

const initialState: IOccupationReducer = {
    occupations: [],
    occupationDropdownList: []
};

export default function OccupationReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.GET_OCCUPATION_LIST:
            return {
                ...state,
                occupations: action.payload,
            };

        case Types.GET_OCCUPATION_DROPDOWN_LIST:
            return {
                ...state,
                productDropdownList: generateDropdownList(action.payload),
            };

        default:
            break;
    }
    return state;
}


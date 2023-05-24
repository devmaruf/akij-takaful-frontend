import { IUnderwritingQues } from "@/redux/interfaces";
import * as Types from "@/redux/types/underwriting-questionnaire-type";

const initialState: IUnderwritingQues = {
    isLoading: false,
    isDeleting: false,
    isLoadingDetails: false,
    isSubmitting: false,
    underwritingQuesList: [],
    underwritingQuesPaginationData: [],
    underwritingQuesDetails: null,
    underwritingQuesInput: {
        requirement_name_en: "",
        requirement_name_bn: "",
        code: "",
        type_id: 0,
        input_type: "",
        gender: "",
    },
};


export default function UnderwritingQuestionnaireReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_UNDERWRITING_QUESTIONNAIRE_INPUT_VALUE:
            const underwritingQuesInput = { ...state.underwritingQuesInput };
            underwritingQuesInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                underwritingQuesInput,
            };

        case Types.EMPTY_UNDERWRITING_QUESTIONNAIRE_INPUT:
            return {
                ...state,
                underwritingQuesInput: initialState.underwritingQuesInput,
                defaultBanks: [],
            };

        case Types.SUBMIT_UNDERWRITING_QUESTIONNAIRE:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    underwritingQuesInput: initialState.underwritingQuesInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_UNDERWRITING_QUESTIONNAIRE_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                underwritingQuesList: action.payload.data,
                // underwritingQuesPaginationData: action.payload.paginationData,
                // projectOptionList: getDropdownList(action.payload.data),
            };

        // case Types.GET_PROJECT_DROPDOWN:
        //     return {
        //         ...state,
        //         projectDropdownList: getDropdownList(action.payload),
        //     };

        // case Types.GET_DEFAULT_BANKS:
        //     return {
        //         ...state,
        //         defaultBanks: action.payload,
        //     };

        case Types.GET_UNDERWRITING_QUESTIONNAIRE_DETAILS:
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
                underwritingQuesDetails: action.payload.data,
                underwritingQuesInput: action.payload.data,
            };

        case Types.DELETE_UNDERWRITING_QUESTIONNAIRE:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };

        default:
            break;
    }

    return state;
}

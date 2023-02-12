import * as Types from "./../types/ProposalsType";
import { inputType } from "./ActionTypeModel";

export const handleChangeProposalInput = (name: string, value: string) => (dispatch : any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_PROPOSALS_INPUT, payload: data });
};

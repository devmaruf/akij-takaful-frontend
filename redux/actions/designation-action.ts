import axios from "@/utils/axios";
import * as Types from "../types/designation-type";
import { Toaster } from "@/components/toaster";

export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

export const getDesignationDropdownList = () => (dispatch) => {
    axios.get(`/designations/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_DESIGNATION_DROPDOWN, payload: res.data });
        })
}
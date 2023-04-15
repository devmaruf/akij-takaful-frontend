import axios from "@/utils/axios";
import { Dispatch } from "@reduxjs/toolkit";
import * as Types from "@/redux/types/occupation-types";

export const getOccupationsBySearchAction = (search: string = '') => (dispatch: Dispatch) => {
    axios.get(`/occupations?perPage=10&search=${search}&orderBy=id&order=asc`)
        .then((res) => {
            dispatch({ type: Types.GET_OCCUPATION_LIST, payload: res?.data?.data ?? [] });
        });
}

export const getOccupationsBySearch = (search: string = '') => {
    return axios.get(`/occupations?perPage=10&search=${search}&orderBy=id&order=asc`)
        .then((res) => {
            return res?.data?.data ?? [];
        });
}

export const getOccupationDropdownListAction = () => (dispatch: Dispatch) => {
    axios.get(`/occupations/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_OCCUPATION_DROPDOWN_LIST, payload: res.data });
        });
}

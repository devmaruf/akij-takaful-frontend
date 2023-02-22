import axios from "@/utils/axios";
import * as Types from "../types/underwriting-type";

export const getUnderwritingConfigurationsAction = () => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
    };
    dispatch({ type: Types.GET_UNDERWRITING_CONFIGURATIONS, payload: response });

    axios.get(`/underwritings`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_UNDERWRITING_CONFIGURATIONS, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_UNDERWRITING_CONFIGURATIONS, payload: response })
        })

}

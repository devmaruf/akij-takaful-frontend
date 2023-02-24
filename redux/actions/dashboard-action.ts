import axios from "@/utils/axios";
import * as Types from "../types/dashboard-type";

export const getDashboardApiFetchAction = () => (dispatch) => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
    data: [],
  };
  dispatch({ type: Types.GET_DASHBOARD_API, payload: response });

  axios
    .get(`/dashboard/proposal-counting`)
    .then((res) => {
      response.isLoading = false;
      response.status = true;
      response.message = res.message;
      response.data = res.data;
      dispatch({
        type: Types.GET_DASHBOARD_API,
        payload: response,
      });
    })
    .catch((error) => {
      response.isLoading = false;
      dispatch({
        type: Types.GET_DASHBOARD_API,
        payload: response,
      });
    });
};

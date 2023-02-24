import * as Types from "../types/dashboard-type";

const initialState = {
  isLoading: false,
  dashboardFetchApi: [],
};

export default function dashboardApiReducer(state = initialState, action: any) {
  switch (action.type) {
    case Types.GET_DASHBOARD_API:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        dashboardFetchApi: action.payload.data,
      };

    default:
      break;
  }
  return state;
}

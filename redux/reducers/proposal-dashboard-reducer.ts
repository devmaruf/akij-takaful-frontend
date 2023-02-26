import * as Types from "../types/proposal-dashboard-type";

const initialState = {
  isLoading: false,
  proposalDashboardCountingApi: [],
};

export default function proposalDashboardCountingReducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case Types.GET_PROPOSAL_DASHBOARD_COUNTING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        proposalDashboardCountingApi: action.payload.data,
      };

    default:
      break;
  }
  return state;
}

import * as Types from "../types/proposal-dashboard-type";

const initialState = {
  isLoading: false,
  proposalDashboardCount: {
    total_no_of_pending_proposal: 0,
    total_amount_of_pending_proposal: 0,
    total_no_of_submitted_proposal: 0,
    total_amount_of_submitted_proposal: 0,
    total_no_of_approved_proposal: 0,
    total_amount_of_approved_proposal: 0,
    total_no_of_pending_payment_proposal: 0,
    total_amount_of_pending_payment_proposal: 0,
    total_no_of_pending_proposal_approval_from_und: 0,
    total_amount_of_pending_proposal_approval_from_und: 0,
    total_no_of_expired_proposal: 0,
    total_amount_of_expired_proposal: 0,
    total_no_of_completed_proposal: 0,
    total_amount_of_completed_proposal: 0,
    total_no_of_soft_copy_proposal: 0,
    total_amount_of_soft_copy_proposal: 0,
    total_no_of_hard_copy_proposal: 0,
    total_amount_of_hard_copy_proposal: 0,
  },
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
        proposalDashboardCount: action.payload.data,
      };

    default:
      break;
  }
  return state;
}

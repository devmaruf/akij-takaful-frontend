import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getProposalDashboardCountingAction } from "@/redux/actions/proposal-dashboard-action";
import { RootState } from "@/redux/store";
import Card from "@/components/card";
import { useDebounced } from "@/hooks/use-debounce";
import { formatCurrency } from "@/utils/currency";
import { hasPermission } from "@/utils/permission";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { proposalDashboardCount } = useSelector(
    (state: RootState) => state.dashboard
  );

  useDebounced(() => {
    dispatch(getProposalDashboardCountingAction());
  });

  return (
    <>
      <div className="pt-6 px-4">
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center cursor-pointer" onClick={() => router.push('/proposals')}>
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {proposalDashboardCount.total_no_of_submitted_proposal}
                </span>
                <h3 className="text-sm font-normal text-gray-500">
                  PROPOSAL SUBMITTED
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                {
                  formatCurrency(proposalDashboardCount.total_amount_of_submitted_proposal)
                }
              </div>
            </div>
          </Card>

          {/* <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-blue-900">
                  {proposalDashboardCount.total_no_of_pending_proposal}
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  WAITING FOR WORKSHEET
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                {formatCurrency(proposalDashboardCount.total_amount_of_pending_proposal)}
              </div>
            </div>
          </Card> */}

          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {proposalDashboardCount.total_no_of_approved_proposal}
                </span>
                <h3 className="text-sm font-normal text-gray-500">
                  WORKSHEET COMPLETED
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                {formatCurrency(proposalDashboardCount.total_amount_of_approved_proposal)}
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-blue-900">
                  {
                    proposalDashboardCount.total_no_of_pending_payment_proposal
                  }
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  PAYMENT PENDING
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                {
                  formatCurrency(proposalDashboardCount.total_amount_of_pending_payment_proposal)
                }
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {proposalDashboardCount.total_no_of_issued_proposal}
                </span>
                <h3 className="text-sm font-normal text-gray-500">
                  POLICY ISSUED (FPR)
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                {
                  formatCurrency(proposalDashboardCount.total_amount_of_issued_proposal)
                }
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-red-900">
                  {proposalDashboardCount.total_no_of_expired_proposal}
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  EXPIRED PROPOSAL
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                {formatCurrency(proposalDashboardCount.total_amount_of_expired_proposal)}
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-blue-900">
                  {
                    proposalDashboardCount.total_no_of_pending_und_requirements
                  }
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  PENDING UND REQUIREMENTS
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                {
                  formatCurrency(proposalDashboardCount.total_amount_of_pending_und_requirements)
                }
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-blue-900">
                  {
                    proposalDashboardCount.total_no_of_pending_medical_decision
                  }
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  PENDING MEDICAL DECISSION
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                {
                  formatCurrency(proposalDashboardCount.total_amount_of_pending_medical_decision)
                }
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-blue-900">
                  {
                    proposalDashboardCount.total_no_of_pending_und_decision
                  }
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  PENDING UND DECISSION
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                {
                  formatCurrency(proposalDashboardCount.total_amount_of_pending_und_decision)
                }
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {proposalDashboardCount.total_no_of_soft_copy_proposal}
                </span>
                <h3 className="text-sm font-normal text-gray-500">
                  SOFT COPY PROPOSAL
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                {
                  formatCurrency(proposalDashboardCount.total_amount_of_soft_copy_proposal)
                }
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {proposalDashboardCount.total_no_of_hard_copy_proposal}
                </span>
                <h3 className="text-sm font-normal text-gray-500">
                  HARD COPY PROPOSAL
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                {
                  formatCurrency(proposalDashboardCount.total_amount_of_hard_copy_proposal)
                }
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

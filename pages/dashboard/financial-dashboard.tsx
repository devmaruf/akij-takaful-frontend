import { useDispatch, useSelector } from "react-redux";
import { getProposalDashboardCountingAction } from "@/redux/actions/proposal-dashboard-action";
import { RootState } from "@/redux/store";
import Card from "@/components/card";
import { useDebounced } from "@/hooks/use-debounce";

export default function FinancialDashboardPage() {
  const dispatch = useDispatch();
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
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {proposalDashboardCount.total_no_of_completed_proposal}
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  POLICY ISSUED (FPR)
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                {
                  proposalDashboardCount.total_amount_of_completed_proposal
                }৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  0
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  TOTAL COMMISSION EARNED
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                0৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  0
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  TOTAL COMMISSION PAID
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                0৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-red-900">
                  0
                </span>
                <h3 className="text-base font-normal text-red-500">
                  TOTAL COMMISSION DUE
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                0৳
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

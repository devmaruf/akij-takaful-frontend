import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect, useState } from "react";

import { RootState } from "@/redux/store";
import { getConcurrentProposalsAction, changeInputValue } from "@/redux/actions/proposal-action";
import ProposalListTable from "./ProposalListTable";
import Loading from "@/components/loading";

interface IConcurrentProposal {
    phoneNo: string;
    idType: string;
    idNo: string;
    proposalId: number;
}

function ConcurrentProposal({
    phoneNo = '',
    idType = '',
    idNo = '',
    proposalId = 0
}: IConcurrentProposal) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { proposalInput, concurrentProposalsList, isConcurrentListLoading, concurrentPaginationData, previousPoliciesList } = useSelector((state: RootState) => state.proposal);

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (phoneNo?.length || (idType?.length && idNo?.length)) {
                dispatch(getConcurrentProposalsAction(phoneNo, idType, idNo, proposalId, currentPage))
            }
        }, 500),
        [phoneNo, idType, idNo, currentPage, proposalId]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    useEffect(() => {
        // let totalSumAtRisk = parseFloat(proposalInput?.sum_at_risk ?? 0);
        let totalSumAtRisk = parseFloat(proposalInput?.sum_assured ?? 0);
        if (concurrentProposalsList.length > 0) {
            totalSumAtRisk += parseFloat(concurrentProposalsList[0]?.total_sum_at_risk ?? '0');
        }

        if (previousPoliciesList.length > 0) {
            totalSumAtRisk += parseFloat(previousPoliciesList[0]?.total_sum_at_risk ?? '0');
        }

        dispatch(changeInputValue('total_sum_at_risk', totalSumAtRisk, ''));
    }, [
        concurrentProposalsList,
        previousPoliciesList,
        proposalInput?.sum_assured
    ]);

    return (
        <>
            <h3 className="border-b border-slate-100 p-2 my-3">
                Concurrent Proposals
            </h3>
            {
                isConcurrentListLoading ?
                    <div className="text-center">
                        <Loading loadingTitle={'Concurrent Proposals...'} />
                    </div> :
                    <ProposalListTable
                        proposals={concurrentProposalsList}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={concurrentPaginationData.total}
                    />
            }
        </>
    )
}

export default memo(ConcurrentProposal);
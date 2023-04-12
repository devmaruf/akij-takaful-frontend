import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect, useState } from "react";

import { RootState } from "@/redux/store";
import { getConcurrentProposalsAction } from "@/redux/actions/proposal-action";
import ProposalListTable from "./ProposalListTable";
import Loading from "@/components/loading";

interface IConcurrentProposal {
    phoneNo: string;
    idType: string;
    idNo: string;
}

function ConcurrentProposal({
    phoneNo = '',
    idType = '',
    idNo = '',
}: IConcurrentProposal) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { concurrentProposalsList, isConcurrentListLoading, concurrentPaginationData } = useSelector((state: RootState) => state.proposal);

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (phoneNo?.length || (idType?.length && idNo?.length)) {
                dispatch(getConcurrentProposalsAction(phoneNo, idType, idNo, currentPage))
            }
        }, 500),
        [phoneNo, idType, idNo, currentPage]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

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
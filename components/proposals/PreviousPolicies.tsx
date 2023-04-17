import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect, useState } from "react";

import { RootState } from "@/redux/store";
import { getPreviousPoliciesAction } from "@/redux/actions/proposal-action";
import ProposalListTable from "./ProposalListTable";
import Loading from "@/components/loading";

interface IPreviousPolicies {
    phoneNo: string;
    idType: string;
    idNo: string;
    proposalId: number;
}

function PreviousPolicies({
    phoneNo = '',
    idType = '',
    idNo = '',
    proposalId = 0
}: IPreviousPolicies) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { previousPoliciesList, isPreviousPolicListLoading, previousPaginationData } = useSelector((state: RootState) => state.proposal);

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (phoneNo?.length || (idType?.length && idNo?.length)) {
                dispatch(getPreviousPoliciesAction(phoneNo, idType, idNo, proposalId, currentPage))
            }
        }, 500),
        [phoneNo, idType, idNo, currentPage, proposalId]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    return (
        <>
            <h3 className="border-b border-slate-100 p-2 my-3">
                Previous Policies
            </h3>
            {
                isPreviousPolicListLoading ?
                    <div className="text-center">
                        <Loading loadingTitle={'Previous Policies...'} />
                    </div> :
                    <ProposalListTable
                        proposals={previousPoliciesList}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={previousPaginationData.total}
                    />
            }
        </>
    )
}

export default memo(PreviousPolicies);
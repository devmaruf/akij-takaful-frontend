import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { getProposalList } from '@/redux/actions/proposal-action';
import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContentList } from '@/components/layouts/PageContentList';
import NewButton from '@/components/button/button-new';
import ProposalListTable from '@/components/proposals/ProposalListTable';

interface IProposalList {
    isWorksheet?: boolean
}

export default function ProposalList({ isWorksheet = false }: IProposalList) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');
    const { proposalsList, paginationData, isLoading } = useSelector((state: RootState) => state.proposal);

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getProposalList(currentPage, dataLimit, searchText, isWorksheet))
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    return (
        <div>
            <PageHeader
                title={isWorksheet ? 'Manage Worksheets' : 'Manage Proposals'}
                searchPlaceholder={`Please search ${isWorksheet ? 'worksheet' : 'proposal'} by proposal no, plan, status...`}
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    isWorksheet ?
                        <NewButton
                            href="/proposals/create-preview"
                            element={isWorksheet ? 'New Worksheet' : 'New Proposal'}
                        />
                        :
                        <></>
                }
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle={isWorksheet ? 'Worksheets...' : 'Proposals...'} />
                        </div> :
                        <ProposalListTable
                            proposals={proposalsList}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalItems={paginationData.total}
                        />
                }
            </PageContentList>
        </div >
    )
}

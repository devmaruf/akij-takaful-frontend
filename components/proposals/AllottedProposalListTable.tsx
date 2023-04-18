import { useSelector } from 'react-redux';
import { useState } from 'react';

import Table from '@/components/table';
import NoTableDataFound from '@/components/table/NoDataFound';
import { RootState } from '@/redux/store';

export default function AllottedProposalListTable() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { printProposalList, isLoading, paginationData } = useSelector((state: RootState) => state.proposal);

    return (
        <Table
            column={[
                { title: 'Sl No', id: 1 },
                { title: 'Bank Name', id: 2 },
                { title: 'Branch Name', id: 3 },
                { title: 'Start Proposal No', id: 4 },
                { title: 'End  Proposal No', id: 5 },
                { title: 'No of Proposal Enlisted', id: 6 },
                { title: 'Policy Issued', id: 7 },
            ]}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            dataLimit={100}
            totalData={paginationData?.total ?? 0}
        >
            {
                printProposalList && printProposalList.length > 0
                && printProposalList.map((proposalAllotment, index: number) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                            {index + 1}
                        </th>

                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                            {proposalAllotment.project_name}
                        </th>

                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                            {proposalAllotment.branch_name}
                        </th>

                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                            {proposalAllotment.start_proposal_no}
                        </th>

                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                            {proposalAllotment.end_proposal_no}
                        </th>

                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                            {proposalAllotment.total_proposal_enlisted}
                        </th>

                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                            {proposalAllotment.total_policy_issued}
                        </th>
                    </tr>
                ))
            }

            {
                printProposalList && printProposalList.length === 0 &&
                <NoTableDataFound colSpan={8}>No allotted proposal history found !</NoTableDataFound>
            }
        </Table>
    )
}
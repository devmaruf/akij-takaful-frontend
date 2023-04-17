import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Table from '@/components/table';
import Modal from '@/components/modal';
import StatusBadge from '@/components/badge/StatusBadge';
import ActionButtons from '@/components/button/button-actions';
import NoTableDataFound from '@/components/table/NoDataFound';
import Loading from '@/components/loading';
import Button from '@/components/button';
import { hasPermission } from '@/utils/permission';
import { formatCurrency } from '@/utils/currency';
import { proposalColumns } from '@/utils/table-columns';
import { RootState } from '@/redux/store';
import { getProposalDetails } from '@/redux/actions/proposal-action';

export interface IProposalListTable {
    proposals: Array<object>;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    totalItems: number;
}

export default function ProposalListTable({
    proposals,
    currentPage,
    setCurrentPage,
    totalItems
}: IProposalListTable) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [proposalID, setProposal] = useState<number | null>(null);
    const { proposalDetails, isLoading, loadingDetails, isDeleting } = useSelector((state: RootState) => state.proposal);

    const getActionItems = (data: any) => {
        const actions = [];

        if (hasPermission('proposal.view')) {
            actions.push({
                element: 'View',
                onClick: () => showProposalDetails(data.id),
                iconClass: 'eye'
            });
        }

        if (hasPermission('proposal.edit')) {
            actions.push({
                element: 'Edit Proposal',
                onClick: () => router.push(`/proposals/edit?id=${data.id}`),
                iconClass: 'pencil'
            });
        }

        if (data.status !== 'creating') {
            if (hasPermission('proposal.edit')) {
                actions.push({
                    element: 'Edit Worksheet',
                    onClick: () => router.push(`/worksheets/edit?id=${data.id}`),
                    iconClass: 'list-task'
                });
            }

            if (hasPermission('underwriting.edit')) {
                actions.push({
                    element: 'Underwriting',
                    onClick: () => router.push(`/under-writing?id=${data.id}`),
                    iconClass: 'send'
                });
            }

            if (hasPermission('stamp_registry.edit')) {
                actions.push({
                    element: 'Stamps',
                    onClick: () => router.push(`/stamps/edit?proposal_no=${data.proposal_no}`),
                    iconClass: 'person-fill-add'
                });
            }
        }

        if (hasPermission('proposal.delete')) {
            actions.push({
                element: 'Delete',
                onClick: () => handleDeleteProposal(data.id),
                iconClass: 'trash'
            });
        }

        return actions;
    }

    const showProposalDetails = (id: number) => {
        setShowModal(true);
        dispatch(getProposalDetails(id));
    }

    const handleDeleteProposal = (id: number) => {
        setShowDeleteModal(true);
        setProposal(id);
    }

    return (
        <>
            <Table
                column={proposalColumns}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                dataLimit={20}
                totalData={totalItems}
            >
                {
                    proposals && proposals.length > 0
                    && proposals.map((proposal, index: number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                            <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                {proposal.proposal_no}
                            </th>

                            <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                <b>{proposal.proposer_name ?? '-'}</b> <br />
                                {
                                    proposal.phone_no !== null &&
                                    <a href={`tel:${proposal.phone_no}`} rel="noreferrer" target='_blank' className='text-blue-400'>
                                        <i className="bi bi-telephone"></i> {proposal.phone_no}
                                    </a>
                                }
                            </td>

                            <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                {proposal.agent_name}
                            </td>

                            <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                Initial - {formatCurrency(proposal.initial_sum_assured)}
                                <br />
                                Given - {formatCurrency(proposal.sum_assured)}
                            </td>

                            <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                Initial - {formatCurrency(proposal.initial_premium)}
                                <br />
                                Basic - {formatCurrency(proposal.basic_premium)}
                                <br />
                                Total - {formatCurrency(proposal.total_premium)}
                            </td>

                            <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                Given - {formatCurrency(proposal.sum_at_risk)}
                                <br />
                                Total - {formatCurrency(proposal.total_sum_at_risk)}
                            </td>

                            <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                <StatusBadge status={proposal.status} />
                            </td>

                            <td className="px-2 py-3 flex gap-1">
                                <ActionButtons items={getActionItems(proposal)} />
                            </td>
                        </tr>
                    ))
                }

                {
                    proposals && proposals.length === 0 &&
                    <NoTableDataFound colSpan={8}>No proposal found !</NoTableDataFound>
                }
            </Table>

            <Modal title="Proposal Details" size="lg" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
                {
                    loadingDetails ?
                        <div className="text-center">
                            <Loading loadingTitle="Proposal Details" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof proposalDetails !== "undefined" && proposalDetails !== null) ? (
                                    <div className="grid gap-2 grid-cols-2">
                                        <div className='flex justify-between'>
                                            <h6>Proposal No</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.proposal_no}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Proposer Name</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.proposer_name}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Proposer phone</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.phone_no}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Plan</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.plan_name}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Agent</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.agent_name}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Initial Sum Assured</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{formatCurrency(proposalDetails.initial_sum_assured)}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Initial Premium</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{formatCurrency(proposalDetails.premium)}</h6>
                                    </div>
                                ) : (
                                    <div>Something Went wrong!</div>
                                )
                            }

                        </div>
                }
            </Modal>

            <Modal title="Proposal Delete" size="md" show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} isDismissible={false} isShowHeader={false}>
                <div className="text-gray-900 text-center flex flex-col justify-center items-center">
                    <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5.5C12.5523 5.5 13 5.94772 13 6.5L13 13.5C13 14.0523 12.5523 14.5 12 14.5C11.4477 14.5 11 14.0523 11 13.5L11 6.5C11 5.94772 11.4477 5.5 12 5.5Z" fill="red" />
                        <path d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z" fill="red" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="red" />
                    </svg>
                    <h2 className='text-2xl font-bold mt-2'> Are You Sure To Delete? </h2>

                </div>
                <div className='text-right flex justify-end gap-2'>
                    <Button title="Yes" customClass="inline py-2 px-3 rounded-md" loading={isDeleting} loadingTitle="Delete Proposal..." onClick={() => dispatch(deleteProposal(proposalID, setShowDeleteModal))} />
                    <Button title="No" customClass="bg-gray-900 inline py-2 px-3 rounded-md" onClick={() => setShowDeleteModal(false)} />
                </div>
            </Modal>
        </>
    )
}
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
import { getProposalDetails, deleteProposal } from '@/redux/actions/proposal-action';
import PermissionModal from '../permissionModal';

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

            if (hasPermission('proposal.view')) {
                actions.push({
                    element: 'Worksheet Summary',
                    onClick: () => router.push(`/worksheets/worksheet-summary?id=${data.id}`),
                    iconClass: 'list-task'
                });
            }

            if (hasPermission('proposal.view')) {
                actions.push({
                    element: 'Policy Specification Schedule',
                    onClick: () => router.push(`/worksheets/policy-specification-schedule?id=${data.id}`),
                    iconClass: 'shield-lock'
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

            <PermissionModal
                show={showDeleteModal}
                status={"warning"}
                isLoading={isDeleting}
                loadingText={"Deleting Proposal..."}
                handleClose={() => setShowDeleteModal(false)}
                handleAction={() => dispatch(deleteProposal(proposalID, setShowDeleteModal))}
            />
        </>
    )
}
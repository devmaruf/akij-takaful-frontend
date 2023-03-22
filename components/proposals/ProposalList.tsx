import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/modal';
import Table from '@/components/table';
import { getProposalList, getProposalDetails, deleteProposal } from '@/redux/actions/proposal-action';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import ProposalStatus from '@/components/proposals/ProposalStatus';
import { formatCurrency } from '@/utils/currency';
import { Dropdown } from 'flowbite-react';
import { useRouter } from 'next/router';

export default function ProposalList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [proposalID, setProposal] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');

    const { proposalsList, paginationData, proposalDetails, isLoading, loadingDetails, isDeleting } = useSelector((state: RootState) => state.proposal);

    useEffect(() => {
        dispatch(getProposalList(currentPage, dataLimit, searchText))
    }, [currentPage, dataLimit, searchText])

    const showProposalDetails = (id: number) => {
        setShowModal(true);
        dispatch(getProposalDetails(id))
    }

    const handleDeleteProposal = (id: number) => {
        setShowDeleteModal(true);
        setProposal(id)
    }

    const columnData: any[] = [
        { title: "Proposal No", id: 1 },
        { title: "Plan", id: 2 },
        { title: "Proposer Info", id: 3 },
        { title: "Agent", id: 4 },
        { title: "Initial Sum Assured", id: 5 },
        { title: "Initial Premium", id: 6 },
        { title: "Status", id: 7 },
        { title: "Action", id: 8 },
    ]

    return (
        <div>
            <PageHeader
                title='Enlist Proposals'
                searchPlaceholder='Please search proposal by proposal no, plan, status...'
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={<>
                    <Link href="/proposals/create-preview" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                        <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        New Proposal
                    </Link>
                </>}
            />

            <PageContent hasShadow={false}>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Proposals" />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={paginationData.total}
                        >
                            {
                                proposalsList && proposalsList.length > 0
                                && proposalsList.map((data, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.proposal_no}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {data.plan_name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            <b>{data.proposer_name}</b> <br />
                                            {
                                                data.phone_no !== null &&
                                                <a href={`tel:${data.phone_no}`} rel="noreferrer" target='_blank' className='text-blue-400'>
                                                    <i className="bi bi-telephone"></i> {data.phone_no}
                                                </a>
                                            }
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {data.agent_name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {formatCurrency(data.initial_sum_assured)}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {formatCurrency(data.initial_premium)}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            <ProposalStatus status={data.status} />
                                        </td>

                                        <td className="px-2 py-3 flex gap-1">
                                            <Dropdown
                                                label={
                                                    <div className='mt-2'>
                                                        <i className="bi bi-three-dots-vertical hover:text-blue-500"></i>
                                                    </div>
                                                }
                                                inline={true}
                                                arrowIcon={false}
                                            >
                                                <Dropdown.Item onClick={() => showProposalDetails(data.id)}>
                                                    <i className='bi bi-eye mr-4'></i> View
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => router.push(`/proposals/enlistment?id=${data.id}`)}>
                                                    <i className='bi bi-pencil mr-4'></i> Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => router.push(`/under-writing?id=${data.id}`)}>
                                                    <i className='bi bi-send mr-4'></i> Underwriting
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => router.push(`/stamps/edit?proposal_no=${data.proposal_no}`)}>
                                                    <i className='bi bi-person-fill-add mr-4'></i> Stamps
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDeleteProposal(data.id)}>
                                                    <i className='bi bi-trash mr-4'></i> Delete
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            }
                        </Table>
                }
            </PageContent>

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
        </div >
    )
}

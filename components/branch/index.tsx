import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { RootState } from '@/redux/store';
import Modal from '@/components/modal';
import Table from '@/components/table';
import Button from '@/components/button';
import Loading from '@/components/loading';
import { getProjectListDropdown } from '@/redux/actions/project-action';
import { submitBranch, getBranchList, getBranchDetails, deleteBranch, updateBranch, emptyBranchInputAction } from '@/redux/actions/branch-action';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import { PageContentList } from '@/components/layouts/PageContentList';
import { useDebounced } from '@/hooks/use-debounce';
import ActionButtons from '@/components/button/button-actions';
import NoTableDataFound from '@/components/table/NoDataFound';
import StatusBadge from '@/components/badge/StatusBadge';
import BranchForm from './BranchForm';

export default function Branches() {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [branchID, setBranchID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');
    const { branchInput, branchList, branchPaginationData, isLoading, isSubmitting, branchDetails, isLoadingDetails, isDeleting } = useSelector((state: RootState) => state.Branch);

    const columnData: any[] = [
        { title: "Branch name", id: 1 },
        { title: "Branch code", id: 2 },
        { title: "Branch address", id: 3 },
        { title: "Bank name", id: 4 },
        { title: "Branch status", id: 5 },
        { title: "Action", id: 6 },
    ]

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getBranchList(currentPage, dataLimit, searchText));
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch(); // call debounced dispatch function
        return debouncedDispatch.cancel; // cleanup the debounced function
    }, [debouncedDispatch]);

    useDebounced(() => {
        dispatch(getProjectListDropdown());
    });

    const handleOpenModal = (id: number, type: string) => {
        if (type === "view") {
            setShowDetailsModal(true);
            dispatch(getBranchDetails(id));
        } else if (type === "edit") {
            setShowUpdateModal(true);
            dispatch(getBranchDetails(id));
        } else {
            setShowDeleteModal(true);
            setBranchID(id);
        }
    }

    const onSubmit = (e: any, type: string) => {
        e.preventDefault();

        if (type === "edit") {
            dispatch(updateBranch(branchInput, setShowUpdateModal));
        } else {
            dispatch(submitBranch(branchInput, setShowModal));
        }
    }

    return (
        <div>
            <PageHeader
                title='Branches'
                searchText={searchText}
                onSearchText={setSearchText}
                searchPlaceholder='Search branches...'
                headerRightSide={
                    <NewButton
                        onClick={() => {
                            dispatch(emptyBranchInputAction());
                            setShowModal(true);
                        }}
                        element='Open branch'
                    />}
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Branches" />
                        </div> :

                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={branchPaginationData.length > 0 && branchPaginationData.total}
                        >
                            {branchList && branchList.length > 0 && branchList.map((data, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.name}
                                    </th>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.code}
                                    </th>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.address ?? '-'}
                                    </th>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.project_name}
                                    </td>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        <StatusBadge status={data?.status ?? ''} />
                                    </th>
                                    <td className="px-2 py-3 flex gap-1">
                                        <ActionButtons
                                            items={[
                                                {
                                                    element: 'View',
                                                    onClick: () => handleOpenModal(data.id, 'view'),
                                                    iconClass: 'eye'
                                                },
                                                {
                                                    element: 'Edit',
                                                    onClick: () => handleOpenModal(data.id, 'edit'),
                                                    iconClass: 'pencil'
                                                },
                                                {
                                                    element: 'Delete',
                                                    onClick: () => handleOpenModal(data.id, 'delete'),
                                                    iconClass: 'trash'
                                                }
                                            ]}
                                        />
                                    </td>
                                </tr>
                            ))
                            }

                            {
                                branchList && branchList.length === 0 &&
                                <NoTableDataFound colSpan={6}>No branches found ! Please open a branch.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>

            <Modal title={`Open a branch`} size="lg" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
                <BranchForm
                    setShowModal={setShowModal}
                    pageType='add'
                    onSubmit={onSubmit}
                />
            </Modal>

            <Modal title={`Branch Details`} size="lg" show={showDetailsModal} handleClose={() => setShowDetailsModal(false)} isDismissible={false}>
                {
                    isLoadingDetails === true ?
                        <div className="text-center">
                            <Loading loadingTitle="Branch Details" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof branchDetails !== "undefined" && branchDetails !== null) ? (
                                    <div className="grid gap-2 grid-cols-2">
                                        <div className='flex justify-between'>
                                            <h6>Branch name</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{branchDetails.name}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Branch code</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{branchDetails.code}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Branch status</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>
                                            <StatusBadge status={branchDetails?.status ?? ''} />
                                        </h6>
                                        <div className='flex justify-between'>
                                            <h6>Bank name</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{branchDetails.project_name}</h6>
                                    </div>
                                ) : (
                                    <div>Something Went wrong!</div>
                                )
                            }
                        </div>
                }
            </Modal>

            <Modal
                title={<>Update Branch <br /><span className='text-xs text-blue-500'>{branchInput.code ?? ''}</span></>}
                size="lg"
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                isDismissible={false}
            >
                {
                    isLoadingDetails === true ?
                        <div className="text-center">
                            <Loading loadingTitle="Branch Details" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof branchInput !== "undefined" && branchInput !== null) ? (
                                    <BranchForm
                                        setShowModal={setShowUpdateModal}
                                        pageType='edit'
                                        onSubmit={onSubmit}
                                    />
                                ) : (
                                    <div>Something Went wrong!</div>
                                )
                            }
                        </div>
                }
            </Modal>

            <Modal title="Delete branch" size="md" show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} isDismissible={false} isShowHeader={false}>
                <div className="text-gray-900 text-center flex flex-col justify-center items-center">
                    <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5.5C12.5523 5.5 13 5.94772 13 6.5L13 13.5C13 14.0523 12.5523 14.5 12 14.5C11.4477 14.5 11 14.0523 11 13.5L11 6.5C11 5.94772 11.4477 5.5 12 5.5Z" fill="red" />
                        <path d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z" fill="red" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="red" />
                    </svg>
                    <h2 className='text-2xl font-bold mt-2'> Are You Sure To Delete? </h2>

                </div>
                <div className='text-right flex justify-end gap-2'>
                    <Button
                        title="Yes"
                        customClass="inline py-2 px-3 rounded-md"
                        loading={isDeleting}
                        loadingTitle="Deleting Branch..."
                        onClick={() => dispatch(deleteBranch(branchID, setShowDeleteModal))} />
                    <Button title="No" customClass="bg-gray-900 inline py-2 px-3 rounded-md" onClick={() => setShowDeleteModal(false)} />
                </div>
            </Modal>
        </div >
    )
}
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { RootState } from '@/redux/store';
import Modal from '@/components/modal';
import Table from '@/components/table';
import Loading from '@/components/loading';
import OccupationForm from './OccupationForm';
import PermissionModal from '../permissionModal';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import ActionButtons from '@/components/button/button-actions';
import NoTableDataFound from '@/components/table/NoDataFound';
import { getProjectListDropdown } from '@/redux/actions/project-action';
import { PageContentList } from '@/components/layouts/PageContentList';
import { useDebounced } from '@/hooks/use-debounce';
import { emptyOccupationInputAction, submitOccupation, updateOccupation, getOccupationList, getOccupationDetails, deleteOccupation } from '@/redux/actions/occupation-action';

export default function Occupations() {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [occupationID, setOccupationID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(20);
    const [searchText, setSearchText] = useState<string>('');
    const { occupationInput, occupationList, occupationPaginationData, isLoading, isSubmitting, occupationDetails, isLoadingDetails, isDeleting } = useSelector((state: RootState) => state.occupation);

    const columnData: any[] = [
        { title: "Name", id: 1 },
        { title: "Group", id: 2 },
        { title: "Class", id: 3 },
        { title: "Action", id: 4 },
    ]

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getOccupationList(currentPage, dataLimit, searchText));
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    useDebounced(() => {
        dispatch(getProjectListDropdown());
    });

    const handleOpenModal = (id: number, type: string) => {
        if (type === "edit") {
            setShowUpdateModal(true);
            dispatch(getOccupationDetails(id));
        } else {
            setShowDeleteModal(true);
            setOccupationID(id);
        }
    }

    const onSubmit = (e: any, type: string) => {
        e.preventDefault();
        if (type === "edit") {
            dispatch(updateOccupation(occupationInput, setShowUpdateModal));
        } else {
            dispatch(submitOccupation(occupationInput, setShowModal));
        }
    }

    return (
        <div>
            <PageHeader
                title='Occupations'
                searchText={searchText}
                onSearchText={setSearchText}
                searchPlaceholder='Search occupation...'
                headerRightSide={
                    <NewButton
                        onClick={() => {
                            dispatch(emptyOccupationInputAction());
                            setShowModal(true);
                        }}
                        element='New Occupation'
                    />}
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Occupations" />
                        </div> :

                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={occupationPaginationData?.total}
                        >
                            {occupationList && occupationList.length > 0 && occupationList.map((data: any, index: number) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data?.name ?? "N/A"}
                                    </th>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data?.group ?? "N/A"}
                                    </th>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data?.class ?? "N/A"}
                                    </td>
                                    <td className="px-2 py-3 flex gap-1">
                                        <ActionButtons
                                            items={[
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
                                occupationList && occupationList.length === 0 &&
                                <NoTableDataFound colSpan={6}>No occupation found ! Please open new occupation.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>

            <Modal title={`New Occupation`} size="lg" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
                <OccupationForm
                    pageType='add'
                    onSubmit={onSubmit}
                />
            </Modal>

            <Modal
                title="Update Occupation"
                size="lg"
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                isDismissible={false}
            >
                {
                    isLoadingDetails === true ?
                        <div className="text-center">
                            <Loading loadingTitle="Occupation Details" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof occupationInput !== "undefined" && occupationInput !== null) ? (
                                    <OccupationForm
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

            <PermissionModal
                show={showDeleteModal}
                status={"warning"}
                isLoading={isDeleting}
                loadingText={"Deleting Occupation..."}
                handleClose={() => setShowDeleteModal(false)}
                handleAction={() => dispatch(deleteOccupation(occupationID, setShowDeleteModal))}
            />

        </div >
    )
}
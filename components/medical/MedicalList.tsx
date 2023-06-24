import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import Table from '@/components/table';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import ActionButtons from '@/components/button/button-actions';
import StatusBadge from '@/components/badge/StatusBadge';
import NoTableDataFound from '@/components/table/NoDataFound';
import { RootState } from '@/redux/store';
import { PageContentList } from '@/components/layouts/PageContentList';
import {IMedicalView } from '@/redux/interfaces';
import { hasPermission } from '@/utils/permission';
import { getMedicalListAction } from '@/redux/actions/medical-action';


export default function MedicalList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [medicalID, setMedicalID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { medicalList,medicalPaginationData, isLoading, } = useSelector((state: RootState) => state.medical);
    const [searchText, setSearchText] = useState<string>('');


    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Proposal No', id: 2 },
        { title: 'Medical Status', id: 3 },
        { title: "Extra Info Requirement", id: 5 },
        { title: "Further Reuqirement", id: 6 },
        { title: "Action", id: 7 }
    ];

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getMedicalListAction(currentPage, dataLimit, searchText,))
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const handleDeleteEmployeeModal = (id: number) => {
        setShowDeleteModal(true);
        setMedicalID(id);
    }

    const getActionButtons = (medical: IMedicalView) => {
        const actions = [];

        if (hasPermission('medical.edit')) {
            actions.push({
                element: 'Edit',
                onClick: () => router.push(
                    `/medical/edit?id=${medical.proposal_id}`
                ),
                iconClass: 'pencil'
            });
        }


        if (hasPermission('medical.delete')) {
            actions.push({
                element: 'Delete',
                onClick: () => handleDeleteEmployeeModal(medical.id),
                iconClass: 'trash'
            });
        }

        return actions;
    }


    return (
        <div>
            <PageHeader
                title={'Medical'}
                searchPlaceholder={`Search medical...`}
                searchText={searchText}
                onSearchText={setSearchText}
                // headerRightSide={
                //     <NewButton
                //         href={'/medical/create'}
                //         element={'New Medical'}
                //     />
                // }
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle={'Medical List...'} />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={medicalPaginationData.total}
                        >
                            {
                                medicalList && medicalList.length > 0 && medicalList.map((medical: any, index: any) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={medical.id}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {index + 1}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {medical.proposal_no}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {medical.status}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        <StatusBadge status={medical.status} />
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {medical.extra_info_requirement}
                                        </td>

                                        <td className="px-2 py-3 flex gap-1">
                                            <ActionButtons
                                                items={getActionButtons(medical)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }

                            {
                                medicalList && medicalList.length === 0 &&
                                <NoTableDataFound colSpan={9}>No proposal found in medical medical category ! Please create one.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>
        </div >
    )
}
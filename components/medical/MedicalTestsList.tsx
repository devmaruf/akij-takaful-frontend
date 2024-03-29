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
import { IMedicalTestView } from '@/redux/interfaces';
import { hasPermission } from '@/utils/permission';
import { getMedicalTestListAction } from '@/redux/actions/medicaltest-action';
import { formatCurrency } from '@/utils/currency';



export default function MedicalTestsList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [medicalTestID, setMedicalTestID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { medicalTestList,medicalTestPaginationData, isLoading, } = useSelector((state: RootState) => state.medicalTest);
    const [searchText, setSearchText] = useState<string>('');


    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Test Name', id: 2 },
        { title: 'Minimum Age', id: 3 },
        { title: "Maximum Age", id: 4 },
        { title: "Minimum Amount", id: 5 },
        { title: "Maximum Amount", id: 6 },
        { title: "Action", id: 7 }
    ];

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getMedicalTestListAction(currentPage, dataLimit, searchText,))
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const handleDeleteEmployeeModal = (id: number) => {
        setShowDeleteModal(true);
        setMedicalTestID(id);
    }

    const getActionButtons = (medicalTest: IMedicalTestView) => {
        const actions = [];

        if (hasPermission('medical.edit')) {
            actions.push({
                element: 'Edit',
                onClick: () => router.push(
                    `/medical-tests/edit?id=${medicalTest.id}`
                ),
                iconClass: 'pencil'
            });
        }


        if (hasPermission('medical.delete')) {
            actions.push({
                element: 'Delete',
                onClick: () => handleDeleteEmployeeModal(medicalTest.id),
                iconClass: 'trash'
            });
        }

        return actions;
    }


    return (
        <div>
            <PageHeader
                title={'Medical Tests'}
                searchPlaceholder={`Search medical tests...`}
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    <NewButton
                        href={'/medical-tests/create'}
                        element={'New Medical Test'}
                    />
                }
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle={'Medical Test...'} />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={medicalTestPaginationData.total}
                        >
                            {
                                medicalTestList && medicalTestList.length > 0 && medicalTestList.map((medicalTest: any, index: any) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={medicalTest.id}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {index + 1}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {medicalTest.name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {medicalTest.min_age}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {medicalTest.max_age}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        <StatusBadge status={formatCurrency(medicalTest.min_amount)} />
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {formatCurrency(medicalTest.max_amount)}
                                        </td>
                                        <td className="px-2 py-3 flex gap-1">
                                            <ActionButtons
                                                items={getActionButtons(medicalTest)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }

                            {
                                medicalTestList && medicalTestList.length === 0 &&
                                <NoTableDataFound colSpan={9}>No {'medical test list'} found ! Please create one.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>
        </div >
    )
}
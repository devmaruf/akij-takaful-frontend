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
import { IEmployeeView } from '@/redux/interfaces';
import { hasPermission } from '@/utils/permission';
import { getPaymentListAction } from '@/redux/actions/payment-action';
import { getMedicalTestListAction } from '@/redux/actions/medicaltest-action';

interface IPaymentList {
    isAgent?: boolean;
}

export default function MedicalTestsList({ isAgent = false }: IPaymentList) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [employeeID, setEmployeeID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { medicalTestList,medicalTestPaginationData, isLoading, } = useSelector((state: RootState) => state.medical);
    const [searchText, setSearchText] = useState<string>('');


    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Test Name', id: 2 },
        { title: 'Minimum Age', id: 3 },
        { title: "Maximum Age", id: 4 },
        { title: "Minimum Amount", id: 5 },
        { title: "Maximum Amount", id: 6 }
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


    return (
        <div>
            <PageHeader
                title={'Medical Tests'}
                searchPlaceholder={`Search 'medical-tests'}...`}
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    <NewButton
                        href={isAgent ? '/banca/agent/create' : '/medical-tests/create'}
                        element={'New Medical Test'}
                    />
                }
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle={isAgent ? 'Agents...' : 'Payments...'} />
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
                                        <StatusBadge status={medicalTest.min_amount} />
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {medicalTest.max_amount}
                                        </td>
                                    </tr>
                                ))
                            }

                            {
                                medicalTestList && medicalTestList.length === 0 &&
                                <NoTableDataFound colSpan={9}>No {isAgent ? 'officer/manager' : 'employee'} found ! Please create one.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>
        </div >
    )
}
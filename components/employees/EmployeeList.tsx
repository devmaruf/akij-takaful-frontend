import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import { RootState } from '@/redux/store';
import Table from '@/components/table';
import Loading from '@/components/loading';
import { getEmployeeListAction } from '@/redux/actions/employee-action';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import { PageContentList } from '@/components/layouts/PageContentList';
import ActionButtons from '@/components/button/button-actions';
import StatusBadge from '@/components/badge/StatusBadge';
import NoTableDataFound from '@/components/table/NoDataFound';

interface IEmployeeList {
    isAgent?: boolean;
}

export default function EmployeeList({ isAgent = false }: IEmployeeList) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [employeeID, setEmployeeID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { employeeList, employeePaginationData, isLoading, } = useSelector((state: RootState) => state.employee);
    const [searchText, setSearchText] = useState<string>('');

    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Name', id: 2 },
        { title: 'Code', id: 3 },
        { title: "Email", id: 4 },
        { title: "Phone", id: 5 },
        { title: "Designation", id: 6 },
        { title: "Avatar", id: 7 },
        { title: "Status", id: 8 },
        { title: "Action", id: 9 },
    ];

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getEmployeeListAction(currentPage, dataLimit, searchText, isAgent))
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);


    const handleDeleteEmployeeModal = (id: number) => {
        setShowDeleteModal(true);
        setEmployeeID(id);
    }

    return (
        <div>
            <PageHeader
                title={isAgent ? 'Manage Banca Officer/Manager' : 'Employees'}
                searchPlaceholder={`Search ${isAgent ? 'agents' : 'employees'}...`}
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    <NewButton
                        href={isAgent ? '/banca/agent/create' : '/employee/create'}
                        element={isAgent ? 'New Officer/Manager' : 'New Employee'}
                    />
                }
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle={isAgent ? 'Agents...' : 'Employees...'} />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={employeePaginationData.total}
                        >
                            {
                                employeeList && employeeList.length > 0 && employeeList.map((data, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {index + 1}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.first_name + ' ' + data.last_name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.code}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {data.email}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.phone}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.designation_name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {
                                                (typeof data.avatar !== 'undefined' && data.avatar !== null) ?
                                                    <img src={data.avatar} alt={data.first_name} className="h-8 w-8" /> : "N / A"
                                            }
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            <StatusBadge status={data.status} />
                                        </td>

                                        <td className="px-2 py-3 flex gap-1">
                                            <ActionButtons
                                                items={[
                                                    {
                                                        element: 'Edit',
                                                        onClick: () => router.push(
                                                            `/${isAgent ? 'banca/agent' : 'employee'}/edit?id=${data.id}`
                                                        ),
                                                        iconClass: 'pencil'
                                                    },
                                                    {
                                                        element: 'Delete',
                                                        onClick: () => handleDeleteEmployeeModal(data.id),
                                                        iconClass: 'trash'
                                                    }
                                                ]}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }

                            {
                                employeeList && employeeList.length === 0 &&
                                <NoTableDataFound colSpan={9}>No {isAgent ? 'officer/manager' : 'employee'} found ! Please create one.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>
        </div >
    )
}
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '@/redux/store';
import Table from '@/components/table';
import Loading from '@/components/loading';
import { getEmployeeListAction } from '@/redux/actions/employee-action';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import { PageContentList } from '@/components/layouts/PageContentList';
import ActionButtons from '@/components/button/button-actions';
import { debounce } from 'lodash';
import StatusBadge from '@/components/badge/StatusBadge';

export default function EmployeeListPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [employeeID, setEmployeeID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { employeeList, employeePaginationData, isLoading, } = useSelector((state: RootState) => state.employee);
    const [searchText, setSearchText] = useState<string>('');

    const columnData: any[] = [
        { title: "SL", id: "01" },
        { title: "Employee Name", id: "02" },
        { title: "Email", id: "03" },
        { title: "Phone", id: "04" },
        { title: "Designation", id: "05" },
        { title: "Avatar", id: "06" },
        { title: "Status", id: "07" },
        { title: "Action", id: "08" },
    ];

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getEmployeeListAction(currentPage, dataLimit, searchText))
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch(); // call debounced dispatch function
        return debouncedDispatch.cancel; // cleanup the debounced function
    }, [debouncedDispatch]);


    const handleDeleteEmployeeModal = (id: number) => {
        setShowDeleteModal(true);
        setEmployeeID(id);
    }

    return (
        <div>
            <PageHeader
                title='Employees'
                searchPlaceholder='Search employees...'
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={<NewButton element='New Employee' href='/employee/create' />}
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Employee List" />
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
                                                        onClick: () => router.push(`/employee/edit?id=${data.id}`),
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
                        </Table>
                }
            </PageContentList>
        </div >
    )
}
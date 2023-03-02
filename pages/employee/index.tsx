import React from 'react';
import { RootState } from '@/redux/store';
import Breadcrumb from '@/components/breadcrumb';
import Modal from '@/components/modal';
import PageTitle from '@/components/pageTitle';
import Table from '@/components/table';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/button';
import Tooltip from '@/components/tooltip';
import Loading from '@/components/loading';
import { getEmployeeList } from '@/redux/actions/employee-action';

export default function Proposals() {
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
    const [employeeID, setEmployeeID]           = React.useState<number | null>(null);
    const [currentPage, setCurrentPage]         = React.useState<number>(1);
    const [dataLimit, setDataLimit]             = React.useState<number>(10);
    const { employeeList, employeePaginationData, isLoading, } = useSelector((state: RootState) => state.employee);

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

    React.useEffect(() => {
        dispatch(getEmployeeList(currentPage, dataLimit))
    }, [currentPage, dataLimit]);
    

    const handleDeleteProposal = (id: number) => {
        setShowDeleteModal(true);
        setEmployeeID(id);
    }

    return (
        <div>
            <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb />
                        <PageTitle title='Manage employees' />
                    </div>
                    <div className="sm:flex">
                        <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                            <form className="lg:pr-3" action="#" method="GET">
                                <label htmlFor="users-search" className="sr-only">Search</label>
                                <div className="mt-1 relative lg:w-64 xl:w-96">
                                    <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search employees..." />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            <Link href="/employee/create" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                New Employee
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white block border-b border-gray-200">
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
                                            {data.status}
                                        </td>

                                        <td className="px-2 py-3 flex gap-1">
                                            <Tooltip content={`View - ${data.first_name + ' ' + data.last_name}'s info` }>
                                                <Button
                                                    onClick={() => showProposalDetails(data.id)}
                                                    customClass="p-1 rounded-md inline"
                                                >
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 6C8.76722 6 5.95965 8.31059 4.2048 11.7955C4.17609 11.8526 4.15483 11.8948 4.1369 11.9316C4.12109 11.964 4.11128 11.9853 4.10486 12C4.11128 12.0147 4.12109 12.036 4.1369 12.0684C4.15483 12.1052 4.17609 12.1474 4.2048 12.2045C5.95965 15.6894 8.76722 18 12 18C15.2328 18 18.0404 15.6894 19.7952 12.2045C19.8239 12.1474 19.8452 12.1052 19.8631 12.0684C19.8789 12.036 19.8888 12.0147 19.8952 12C19.8888 11.9853 19.8789 11.964 19.8631 11.9316C19.8452 11.8948 19.8239 11.8526 19.7952 11.7955C18.0404 8.31059 15.2328 6 12 6ZM2.41849 10.896C4.35818 7.04403 7.7198 4 12 4C16.2802 4 19.6419 7.04403 21.5815 10.896C21.5886 10.91 21.5958 10.9242 21.6032 10.9389C21.6945 11.119 21.8124 11.3515 21.8652 11.6381C21.9071 11.8661 21.9071 12.1339 21.8652 12.3619C21.8124 12.6485 21.6945 12.8811 21.6032 13.0611C21.5958 13.0758 21.5886 13.09 21.5815 13.104C19.6419 16.956 16.2802 20 12 20C7.7198 20 4.35818 16.956 2.41849 13.104C2.41148 13.09 2.40424 13.0758 2.39682 13.0611C2.3055 12.881 2.18759 12.6485 2.13485 12.3619C2.09291 12.1339 2.09291 11.8661 2.13485 11.6381C2.18759 11.3515 2.3055 11.119 2.39682 10.9389C2.40424 10.9242 2.41148 10.91 2.41849 10.896ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8.00002 12C8.00002 9.79086 9.79088 8 12 8C14.2092 8 16 9.79086 16 12C16 14.2091 14.2092 16 12 16C9.79088 16 8.00002 14.2091 8.00002 12Z" />
                                                    </svg>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content={`Update - ${data.first_name + ' ' + data.last_name}'s info` }>
                                                <Button
                                                    onClick={''}
                                                    customClass="p-1 rounded-md inline"
                                                >
                                                    <Link href={`/employee/edit?id=${data.id}`}>
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                                    </Link>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content={`Remove - ${data.first_name + ' ' + data.last_name}'s info` }>
                                                <Button
                                                    onClick={() => handleDeleteProposal(data.id)}
                                                    customClass="p-1 rounded-md bg-red-600 inline"
                                                >
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                </Button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))
                            }
                        </Table>
                }
            </div>
        </div >
    )
}
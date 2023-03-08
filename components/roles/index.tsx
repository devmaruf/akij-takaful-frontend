import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import Button from '@/components/button';
import Table from '@/components/table';
import { getRoleList } from '@/redux/actions/role-action';
import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import Tooltip from '@/components/tooltip';
import Link from 'next/link';
import { Accordion, Alert } from 'flowbite-react';

export default function Roles() {
    const dispatch = useDispatch();
    const columnData = [
        { title: "SL", id: "01" },
        { title: "Role", id: "02" },
        { title: "Permissions", id: "03" },
        { title: "Status", id: "04" },
        { title: "Action", id: "05" },
    ]

    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
    // const [branchID, setBranchID] = React.useState<number | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [dataLimit, setDataLimit] = React.useState<number>(5);
    const [searchText, setSearchText] = React.useState<string>('');

    const { isLoading, roleListAll } = useSelector((state: RootState) => state.role);


    React.useEffect(() => {
        dispatch(getRoleList(currentPage, dataLimit, searchText));
    }, [currentPage, dataLimit, searchText, dispatch]);

    // const changePage = (data) => {
    //   setCurrentPage(data.page);
    //   dispatch(getRoleListByPagination(data.page));
    // };

    return (
        <div>
            <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb />
                    </div>
                    <div className="sm:flex">
                        <PageTitle title='All Roll' />
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            <Link href="/settings/roles/create" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-2 py-1 text-center sm:w-auto">
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Add New
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white block border-b border-gray-200">
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Role List" />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={1}
                            totalData={5}
                        >
                            {
                                roleListAll && roleListAll.length > 0 && roleListAll.map((data, index) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={index + 1}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words w-6" >
                                            {index + 1}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words w-40">
                                            {data.name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            <div className='max-w-[500px]'>
                                                {
                                                    data.permissions && data.permissions.length > 0 &&
                                                    <Accordion collapseAll={true}>
                                                        <Accordion.Panel>
                                                            <Accordion.Title>
                                                                {data.permissions.length ?? 0} Permissions
                                                            </Accordion.Title>
                                                            <Accordion.Content>
                                                                {
                                                                    data.permissions.map((permission, permissionIndex) => (
                                                                        <span key={permissionIndex + 1} className="bg-blue-500 text-[10px] text-white py-0 px-[2px] rounded-md m-[2px] inline-flex">{permission.name}</span>
                                                                    ))
                                                                }
                                                            </Accordion.Content>
                                                        </Accordion.Panel>
                                                    </Accordion>
                                                }

                                                {
                                                    data.permissions && data.permissions.length === 0 &&
                                                    <Alert
                                                        color="failure"
                                                    >
                                                        No Permissions added.
                                                    </Alert>
                                                }
                                            </div>
                                        </td>

                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            <span className="bg-cyan-600 text-white px-1 py-2 rounded-md"> Active </span>
                                        </td>

                                        <td className="px-2 py-3 text-right">
                                            <Tooltip content={`Update - ${data.name}`}>
                                                <Button
                                                    onClick={''}
                                                    customClass="p-1 rounded-md inline"
                                                >
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                                    {/* <Link href={`/employee/edit?id=${data.id}`}>
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                                </Link> */}
                                                </Button>
                                            </Tooltip>

                                        </td>

                                    </tr>
                                ))
                            }
                        </Table>
                }
            </div>



            {/* <Modal title="Delete a bank" size="md" show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} isDismissible={false} isShowHeader={false}>
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
                        loadingTitle="Deleting Bank..."
                        onClick={() => dispatch(deleteProject(projectID, setShowDeleteModal))} />
                    <Button title="No" customClass="bg-gray-900 inline py-2 px-3 rounded-md" onClick={() => setShowDeleteModal(false)} />
                </div>
            </Modal> */}
        </div >
    )
}
